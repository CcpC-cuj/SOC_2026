require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

const PORT = process.env.PORT || 500;

app.get("/", (req, res)=>{
    res.send("Welcome to SoC");
});

app.listen(PORT, ()=>{
    console.log(`Server started on ${PORT}`);
});