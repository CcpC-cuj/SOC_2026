const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { required } = require("../../validations/profile.validation");

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },

        email:{
            type: String,
            required: true,
            unique: true,
        },

        password:{
            type: String,
            required: true,
            select:false
        },
        rollNumber: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
            index:true
        },

        collegeEmail: {
            type: String,
            default: "",
            trim: true,
            lowercase: true
        },

        role:{
            type: String,
            enum: ["student", "admin"],
            default: "student",
        },

        avatar:{
            type:String,
            default:""
        },

        semester:{
            type:Number,
            required: true
        },

        bio:{
            type:String,
            default:""
        },

        skills:[
            {
                type:String
            }
        ],

        achievements:[
            {
                type:String
            }
        ],

        github:{
            type:String,
            default:""
        },

        linkedin:{
            type:String,
            default:""
        },

        portfolio:{
            type:String,
            default:""
        },

        resumeUrl:{
            type:String,
            default:""
        },

        contributionScore:{
            type:Number,
            default:0
        }
    },{timestamps: true});

userSchema.pre("save", async function() {
    
    if(!this.isModified("password")){
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);