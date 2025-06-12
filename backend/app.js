const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoute = require("./routes/productRoute.js");
const userRoute = require("./routes/userRoute.js");
const orderRoute = require("./routes/orderRoute.js");
const categoryRoute = require("./routes/categoryRoute.js");

dotenv.config();
const app = express();

// Load environment variables
const port = process.env.PORT ? process.env.PORT : 3000;
const apiPrefix = process.env.API_URL;
console.log("api url-----------", apiPrefix);


// Middleware
app.use(express.json());
app.use(morgan("tiny"));
// app.use(cors());
// app.options("*", cors());

// Routes
app.use(`${apiPrefix}/products`, productRoute);
app.use(`${apiPrefix}/users`, userRoute);
app.use(`${apiPrefix}/orders`, orderRoute);
app.use(`${apiPrefix}/categories`, categoryRoute);

// DB connection
mongoose.connect(process.env.CONNECTION_URL, {
    dbName: "eshop_database"
})
.then(() => {
    console.log("Database Connected Successfully");
})
.catch((err) => {
    console.log("Error Message: ", err);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost${port}${apiPrefix}`);
});