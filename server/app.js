
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const path = require("path");

const connectDB = require("./config/db.config");



require("dotenv").config();

connectDB();

const app = express();

app.use(compression())

app.use(helmet());

app.use(morgan("dev"));

app.use(
    cors({
        origin: "https://instragram-clone-one.vercel.app/",
        credentials: true,
    })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./client/dist")));

require("./routes/auth.route")(app);
require("./routes/post.route")(app);
require("./routes/user.route")(app);


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});
const PORT = process.env.PORT || 3001;

app.disable("x-powered-by");

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode, under port ${PORT}.`);
});
