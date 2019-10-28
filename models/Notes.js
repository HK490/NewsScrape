const mongoose=require("mongoose");

const Schema= mongoose.Schema;

const NewNotes= new Schema({

    body: String,
    created: {
        type: String,
        default: Date.now
    }


});

const Notes = mongoose.model("Notes", NewNotes);

module.exports=Notes;