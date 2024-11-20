const mongoose = require("mongoose");

const  {ObjectId} = mongoose.Schema.Types ;

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
   
  },
  note: {
    type: String,
  },
  author:{
     type:String,
  },
  category:{
    type: String,
    default:"public"
  },
  creator :{
    type : String,
  },
  likes: {
    type: Number,
    default: 0
},

  likeUser:{
    type : Array,
  },
  image:{
    type : String,
  },
  savedId:{
    type : Array,
  },
  comment : {
    type : [ObjectId],
    ref : "Comment"
    
  }

},{
     timestamps: true,
}
);

const Note = mongoose.model("Note", notesSchema); 

module.exports = Note;
