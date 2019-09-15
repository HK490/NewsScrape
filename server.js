const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");
const app = express();

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


app.get("/articles", function (req, res) {

    let articles=[];

    axios.get("https://www.prevention.com/health/").then(function (result) {

        const $ = cheerio.load(result.data);
        console.log("-----------------")
        
        $(".full-item-title ").each(function (i, element) {
            
            articles[i] = {
                title: $(this).text(),
                link: $(this).attr("href")
            }

            articles.push(i)
        });

        console.log(articles)
        res.send(articles)
    });
})

app.listen(PORT, function () {
    console.log("Running on port" + PORT)
});