const mongoose=require("mongoose");

const Schema= mongoose.Schema;

const NewNotes= new Schema({

    comments: {
        type: String,
        trim: true
        
    },


});

const Notes = mongoose.model("Notes", NewNotes);

module.exports=Notes;