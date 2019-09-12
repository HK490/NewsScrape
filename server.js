const express=require("express");
const mongoose=require("mongoose");
const axios=require("axios");
const cheerio=require("cheerio");
const db=require("./models");
const app=express();

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));