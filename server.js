const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");
const app = express();

const path = require("path")


const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// app.get("/home", function (req, res) {
//     res.sendFile(path.join(__dirname + "./public/index.html"))
// })




app.get("/scraped", function (req, res) {

    let articles = [];

    axios.get("https://www.prevention.com/health/").then(function (result) {

        const $ = cheerio.load(result.data);
        console.log("-----------------")

        $(".full-item-title ").each(function () {

            data = {
                title: $(this).text(),
                link: $(this).attr("href")
            }

            articles.push(data)

        });

        console.log(articles)

        db.Article.create(articles)
            .then(function (dbarticle) {
                console.log(dbarticle)
            })
            .catch(function (err) {
                console.log(err)
            });

        res.send("Success")
    });
});

app.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (result) {
            res.json(result)
            console.log(result)
        });
});






app.get("/createNotes", function (req, res) {


    db.Notes.create(req.body.text)
        .then(function (dbnotes) {
            console.log(dbnotes)
        })
        .catch(function (err) {
            console.log(err)
        });

    res.send("Notes")

})

app.get("/notes", function (req, res) {
    db.Notes.find({})
        .then(function (result) {
            res.json(result)
            console.log(result)
        });
});


app.post("/post", function(req, res){
    console.log(req.body)
    db.collection("Notes").insert(req.body, function(err,saved){
        if(err){
            console.log(err);
        }
        else {
            res.send(saved);
        }
    })
})

// app.post("/postNotes", function(req,res){
//     db.Notes.update({})
//         .then(function(result){
//             db.Notes.insertOne(req.body)
//         })
//         res.send(JSON.stringify(result))
// })





app.listen(PORT, function () {
    console.log("Running on port" + PORT)
});