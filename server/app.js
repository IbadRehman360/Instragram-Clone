
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

const connectDB = require("./config/db.config");



require("dotenv").config();

connectDB();

const app = express();

app.use(compression())

app.use(helmet());

app.use(morgan("dev"));

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));


require("./routes/auth.route")(app);
require("./routes/post.route")(app);
require("./routes/user.route")(app);



const PORT = process.env.PORT || 3001;

app.disable("x-powered-by");

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode, under port ${PORT}.`);
});