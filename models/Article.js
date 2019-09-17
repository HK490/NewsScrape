const mongoose=require("mongoose");

const Schema= mongoose.Schema;

const NewArticle= new Schema({

    title: {
        type: String,
        // required: true,
        trim: true
        
    },
    link: {
        type: String,
        // require: true,
        trim: true
    },
    note: {
        type:Schema.Types.ObjectId,
        ref: "Note"
    }

});

const Article = mongoose.model("Article", NewArticle);

module.exports=Article;