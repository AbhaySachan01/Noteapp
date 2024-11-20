const express = require('express');
const router = express.Router(); // Change this line
const env = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Notes = require('../models/notes');
const multer = require("multer");
const path = require('path');
const Comment = require('../models/comment');
const { log } = require('console');

env.config(); // Load environment variables

const port = 8080;
router.post('/signup', async (req, res) => {
    const { name,username, email, password } = req.body;

    try {
        console.log('Received request:', req.body);
        
        const existingUser = await User.findOne({ email });
        const existingUsername = await User.findOne({username});
        if (existingUser || existingUsername) {
            console.log("User already exists");
            return res.status(400).json({
                msg: "User already exists",
            });
        }

        console.log("Creating new user");
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);

        const newUser = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
        });
        console.log('New user created:', newUser);

        res.status(201).json(newUser);
    } catch (e) {
        console.error("Error creating user:", e);
        res.status(500).json({ error: "Error creating user: " + e.message });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const exist = await User.findOne({ email });
        if (!exist) {
            return res.status(400).send("User does not exist");
        }
74
        const match = await bcrypt.compare(password, exist.password);
        if (!match) {
            return res.status(400).send("Password does not match"); 
        }
      

        const token = jwt.sign({ email: exist.email , _id: exist._id}, process.env.SECRET_KEY,{
            expiresIn: "10h"
     });
        return res.send({
            msg: "Login Successfully",
            data: token
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            status: "error",
            msg: "An error occurred while login" 
        });
    }
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

router.post('/addnotes', async (req, res) => {
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const product = new Notes({
        title: capitalize(req.body.title),
        desc: capitalize(req.body.desc),
        category: capitalize(req.body.category),
        note: capitalize(req.body.note),
        author: capitalize(req.body.author),
        creator: (req.body.creator),
        image: req.body.image,
    });

    try {
        await product.save();
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to save the note.' });
    }
});

router.get('/allpublic' , async(req,res)=>{

    let notes = await Notes.find({category:"Public"});
    res.send(notes);
})

router.get('/allprivate' , async(req,res)=>{

    let notes = await Notes.find({category:"Private"});
    res.send(notes);
})


router.post('/removeNote',async(req,res)=>{
    await Notes.findOneAndDelete({_id:req.body});
   res.json({
        success : true,
        name : req.body.name
   })
});


router.put('/update/:id' , async(req,res)=>{
    const userId = req.params.id;
try {

    
    // Use async/await to make the code more readable
    const updatedUser = await Notes.findOneAndUpdate(
        { _id: userId }, // Use _id to identify the user
        { 
            $set: {  
                title: req.body.title,
                desc: req.body.desc,
                category: req.body.category,
                note: req.body.note,
                author: req.body.author,
                creator: req.body.creator,
                image:req.body.image,
            }
        },
        { new: true } // Return the updated document
    );

    // Check if the user was found and updated successfully
    if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Send a success response with the updated user
    return res.status(200).json({ updatedUser, message: "Profile Updated Successfully" });

} catch (error) {
    // Handle any errors that occur during the update process
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
}

})


router.post('/save', async (req, res) => {
   
    try {
        const { item, data } = req.body;

        // Find the user by email
        const saver = await User.findOne({ email: data.email });
        if (!saver) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userId = saver._id;

        // Find the note by its _id
        const note = await Notes.findById(item._id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        // console.log("id: "+id + " saver:" +saver._id);
        // console.log("saver " + saver);
        // console.log("notes " + note);

        // Check if the note is already saved by the user
        
        if (note.savedId.includes(saver._id)) {
            note.savedId = note.savedId.filter(id => id.toString() !== saver._id.toString());
            saver.saved = saver.saved.filter(id => id.toString() !== note._id.toString());
            await note.save();
            await saver.save();
            // console.log("Saved note removed from user's saved list");
            return res.json({ msg: "remove save" });
        }
        
        
        // Push the ObjectId of the note to the savedId array of the note
        note.savedId.push(saver._id);
        await note.save();

        // Push the ObjectId of the note to the saved array of the user
        saver.saved.push(note._id);
        await saver.save();

        // console.log("Card saved successfully");
        return res.json({
            msg : "success",
        });
    } catch (error) {
        res.status(500).json({ error: "Error saving card: " + error.message });
    }
});




const storage = multer.diskStorage({
    destination :function (req, file, cb) {
         cb(null, './upload/images')
       },
    filename : (req,file,cb) =>{
         return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage});



router.post("/upload", upload.single('product'),(req,res)=>{
    res.json({
         success : 1,
         image_url : `http://localhost:${port}/images/${req.file.filename}`

    })
    
})


// Assuming you have a route for the user profile page
router.post('/allsaved', async (req, res) => {

    console.log(req.body.detail.Id);
    try {


        // Retrieve the user ID from the request or session
        const userId = req.body.detail.Id; // Assuming you're using user authentication and have access to user ID

        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get the list of saved note IDs from the user's profile
        const savedNoteIds = user.saved;

        const savedNotes = await Notes.find({ _id: { $in: savedNoteIds } });
        return res.json(savedNotes);
    } catch (error) {
        console.error("Error retrieving saved notes:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});




router.put('/like/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        const userId = req.body.id;
        
        console.log(noteId + " " + userId);

        const note = await Notes.findById(noteId);
        console.log(note);

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Check if the user has already liked the note
        if (note.likeUser.includes(userId)) {
            // Decrease the likes count by 1
            note.likes -= 1;

            // Remove the user ID from the likeUser array
            note.likeUser = note.likeUser.filter(id => id !== userId);

            // Save the updated note
            await note.save();

            return res.json({ msg: "dislike" });
        }

        note.likeUser.push(userId);
        note.likes += 1;

        // Save the updated note
        await note.save();

        return res.status(200).json({ msg: "like" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/comment', async (req, res) => {
    const comment = new Comment({
        useremail : req.body.useremail,
        userId: req.body.userId,
        comment: req.body.comment,
        likeUser: [], 
        reply: [], 
    });

    try {
      const n_comm =   await comment.save();
      const note = await Notes.findOne({ _id: req.body.noteId });
      note.comment.push(n_comm._id);
      await note.save();
    //   console.log(note);
        res.json({
            success: true,
            comment: req.body.comment,
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/allcomments/:id', async (req, res) => {
    try {
      
      const note = await Notes.findById(req.params.id);

      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
  
      const comments = await Comment.find({ _id: { $in: note.comment } });
  
     console.log(comments)
      res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

  router.get('/user/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Return only the user's name (or other relevant details)
      res.status(200).json({ name: user.name });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: "Server error" });
    }
  });







module.exports = router;
