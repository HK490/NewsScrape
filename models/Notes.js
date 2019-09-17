const mongoose=require("mongoose");

const Schema= mongoose.Schema;

const NewNotes= new Schema({

    body: String


});

const Notes = mongoose.model("Notes", NewNotes);

module.exports=Notes;