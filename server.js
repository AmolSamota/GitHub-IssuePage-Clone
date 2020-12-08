require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// const uri = "mongodb+srv://admin-karthikey:Test123@cluster0.iinei.mongodb.net/IssueDB?retryWrites=true&w=majority";

const uri = "mongodb+srv://amols:amol123@amolcluster.aeqyq.mongodb.net/AmolDB?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
});

const issueRouter = require("./routes/issues");

app.use("/issues", issueRouter);

if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", function(req,res) {
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));
    });
};

app.listen(port, function() {
    console.log("server is ready");
});