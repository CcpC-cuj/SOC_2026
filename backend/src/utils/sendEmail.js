const nodemailer = require("nodemailer");
const OTPRateLimit = require("../modules/auth/otpRateLimit.model");
const ApiError = require("./ApiError");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const checkRateLimit = async(email)=>{
    const now = new Date();
    let rateLimit = await OTPRateLimit.findOne({email});

    if (!rateLimit) {
        await OTPRateLimit.create({
            email,
            count: 1,
            windowStart: now
        });
        return;
    }

    const oneHour = 60 * 60 * 1000;

    const elapsed = now.getTime() - rateLimit.windowStart.getTime();

    if (elapsed >= oneHour) {

        rateLimit.count = 1;
        rateLimit.windowStart = now;
        await rateLimit.save();
        return;
    }

    if (rateLimit.count >= 3) {

        const remaining = oneHour - elapsed;

        const minutes = Math.ceil(
            remaining / (60 * 1000)
        );

        throw new ApiError(
            429,
            `Email limit reached. Try again in ${minutes} minutes.`
        );
    }

    rateLimit.count += 1;

    await rateLimit.save();
}

const sendEmail = async ({to, subject, text,}) => {

    await checkRateLimit(to);
    
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        text,
    });
};

module.exports = sendEmail;