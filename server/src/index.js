const express = require("express");
const cors = require("cors");
const app = express();
const { SERVER_PORT } = require("./constants");

// import routes
const taskRoutes = require("./routes/task.route");

// import middlewares
const { errorHandler } = require("./middlewares/error.middleware");

app.use(cors());
// initialize express middleware
app.use(express.json());

// initialize routes
app.use("/api", taskRoutes);

// error middleware
app.use(errorHandler);

// app start
const appStart = () => {
  try {
    app.listen(SERVER_PORT, () => {
      console.log(`The app is running at http://localhost:${SERVER_PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();
