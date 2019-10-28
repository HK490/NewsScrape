$(document).ready(function () {



    let str = "";
    let link = "";
    let result = "";

   


    $.get("/articles", function (data) {

        let url = [];
        // console.log(url)
        // console.log("*******************")

        $("#scrapedTitle").empty();

        for (let i = 0; i < data.length; i++) {
            $("#scrapedTitle").append(`<p class="link" data-article-id="${data[i]._id}">${i + 1}. ${data[i].title}</p>` + `<br>`)

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
            $("#listPopup").data("articleId", $(this).attr("data-article-id"));

            $("#scrapedArticleContent").append(
            `<form>
                <div class="form-group">
                  <label for="Title">${result}</label>
                  <textarea class="form-control" id="comment" rows="3" placeholder="Comment Box" ></textarea>
                </div>
              </form>`

            )
            console.log("++++++++++++++++++++")
            console.log(result)
        })


        $("#saveArticle").on("click", function () {
            $("#savedArticleContent").append(
                `<form>
                <div class="form-group">
                  <label for="Title"><i class="far fa-trash-alt"></i>${result}</label>
                  <textarea class="form-control" id="comment" rows="3" placeholder="Comment Box" ></textarea>
                </div>
              </form>`
                )
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

        $("#savedArticleContent").on("click", "label", function () {
            $(this).closest('form').remove();
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






    $.get("/notes", function(data){
        console.log(data)
    })

    $("#saveArticle").on("click", function(){

        const articleId = $("#listPopup").data("articleId");

        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/articles/" + articleId,
            data:{
                body: $("#comment").val(),
            }
        })
        .then(function(data){
            console.log(data)
        })
    })




});