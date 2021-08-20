const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: __dirname + "/config.env" });
const swaggerJSDoc = require("swagger-jsdoc");
const SwaggerUi = require("swagger-ui-express");

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("/", (req, res, next) => {
  res.send("you are connected from skander pc");
});
app.use(authRouter);
app.use("/api/v1/users", userRouter);
console.log(process.env.DATABASE);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Db connection is successful");
  });

const port = process.env.PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer",
      },
      server: ["http://localhost:8080"],
    },
  },
  //place here your routes ...
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerDocs));
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
