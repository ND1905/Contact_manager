const express = require("express");
const connectDb = require("./config/dbConnection")
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors= require("cors")
const path = require('path')
connectDb();
const app = express();

app.use(cors())
// app.use(express.static("public"))
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const port = process.env.PORT || 5000;
// here i am using body parse as this 
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler)

app.get("/", function(req, res){
    res.render("index");
})
app.post("/crud", function(req, res){
    // console.log(req.body.pass);
    // res.json(req.body.pass);
    res.render("operate", {token : req.body.pass });
})
app.listen(port, function(req, res){
    console.log(`Server is running on ${port}`);
})