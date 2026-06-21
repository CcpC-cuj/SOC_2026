const exprress = require("express");
const cors = require("cors");

const routes = require("./routes/index");
const errorMiddleware = require("./middleware/error.middleware");

const app = exprress();

app.use(cors());

app.use(exprress.json());

app.use("/api", routes);


app.use(errorMiddleware);

module.exports = app;