require("dotenv").config();
const connectDB = require("./config/database");
const app = require("./app");

connectDB().then(() => {
    app.start();
}).catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
});

process.once("SIGINT", () => app.stop("SIGINT"));
process.once("SIGTERM", () => app.stop("SIGTERM"));

// handle unhandled rejections
process.on("unhandledRejection", (reason) => console.log("unhandledRejection:", reason));
process.on("uncaughtException", (reason) => console.log("uncaughtException:", reason));