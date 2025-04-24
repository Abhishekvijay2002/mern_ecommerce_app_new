const express = require('express');
const app = express();
const mongoose = require('mongoose');
const manageRouter = require('./routes/routerManger');
const port = 3000;
const cors = require("cors");
app.use(express.json());
const cookieparser = require('cookie-parser');
const dotenv = require('dotenv').config()

mongoose.connect(process.env.database_connect ).then((res) =>{
    console.log("DataBase Connection Successful");
}).catch((err) =>{
    console.log(err);
})
app.use(cors({
    origin : process.env.FRONTEND_URL ,
    credentials : true
}))
app.use(cookieparser())
app.use("/api",manageRouter)
app.get("/", (req ,res ) => {
    res.json("server started")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
