require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 500;

const startServer = async()=>{
    try{
        await connectDB();
    
        app.get("/", (req, res)=>{
            res.send("Welcome to SoC");
        });

        app.listen(PORT, ()=>{
            console.log(`Server started on ${PORT}`);
        });
    }
    catch(error){
        console.log("Server Failled!");
        process.exit(1);
    }
};

startServer();