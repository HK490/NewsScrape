$(document).ready(function () {



    let str = "";
    let link = "";
    let result = "";




    $.get("/articles", function (data) {

        let url = [];
        // console.log(url)
        // console.log("*******************")


        for (let i = 0; i < data.length; i++) {
            $("#scrapedTitle").append(`<p class="link">${i + 1}. ${data[i].title}</p>` + `<br>`)

            scrapedUrl = "https://www.prevention.com" + data[i].link

            url.push(scrapedUrl)
            // console.log("url"+url)

        }



        $(".link").on("click", function () {

            str = $(this).text()
            link = str.link(url)
            result = $(this).attr("href")
            result = link

            $("#listPopup").show();
            $("#scrapedArticleContent").append(result)
            console.log("++++++++++++++++++++")
            console.log(result)
        })

        $("#saveArticle").on("click", function () {

            $("#savedArticleContent").append(`<p>${result}</p>`)
            $("#scrapedArticleContent").empty();
        })


        // Nav Bar Saved Articles Popup

        $("#navSavedArticles").on("click", function () {
            $("#savedPopup").show();
        })

        $("#clearAll").on("click", function () {
            $("#savedArticleContent").empty();
            $("#savedPopup").hide();
        })




    });





    $(".btn").on("click", function () {
        $(".modal").hide();
        $("#scrapedArticleContent").empty();
    })
    $(".close").on("click", function () {
        $(".modal").hide();
        $("#scrapedArticleContent").empty();
    })
    



});