const mongoose = require('mongoose');
const  {ObjectId} = mongoose.Schema.Types ;
const commentSchema = new mongoose.Schema({
     useremail : {
          type : String
     },
     userId : {
          type : ObjectId,
          ref : "User",
     },
     comment :{
          type : String,

     },
     likeUser:{
          type : [ObjectId],
          ref : "User"
        },
     reply:{
          type : [ObjectId],
          ref : "Comment",
        }
     

},{
     timestamps : true
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment ;
