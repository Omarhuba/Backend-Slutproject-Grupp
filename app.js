const express = require("express");
const routes = require("./routes");
const { byggfirmaDB } = require("./database/connection");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

const morgan = require("morgan");
require("dotenv").config();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


// routers

app.use("/api", routes.auth);
app.use("/api/user", routes.users);
app.use("/api/task", routes.tasks);
app.use("/api/message", routes.messages);
app.use("/api/image", routes.images);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  byggfirmaDB();
  console.log(`SERVER STARTED ON PORT: ${PORT}`);
});
// All is done
