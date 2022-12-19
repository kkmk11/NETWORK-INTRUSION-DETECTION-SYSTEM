const express=require('express');
const router=express.Router();
var fetchuser=require('../middleware/fetchuser');
const Note=require('../modals/Note.js');
const User=require('../modals/User.js')
const {body,validationResult}=require('express-validator');
//route 1:to get all the notes
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try{
        const notes=await Note.find({user:req.user.id});
        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})
//route to get details
router.get('/fetchdetails',fetchuser,async(req,res)=>{
    try{
        const userinfo=await User.find({user:req.user.id});
        res.json(userinfo);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})
//route:2 add notes
router.post('/addnote',fetchuser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Password must be atleast 5 characters').isLength({ min: 5 }),
],async(req,res)=>{
    try{
        const {title,description,tag}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note=new Note({
        title,description,tag,user:req.user.id
        })
        const savedNote=await note.save()
        res.json(savedNote);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})
//route:3 updating the note
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    try{
        const {title,description,tag}=req.body;
        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};
        //fond the noteto be updated and update it
        let note=await Note.findById(req.params.id);
        if(!note){res.status(404).send("Not found")}
        if(note.user.toString()!=req.user.id){
            return res.status(401).send("not allowed");
        }
        note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json(note)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})
//route:3 deleting the note with delete
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try{
        const {title,description,tag}=req.body;
        //find the note to be deleted
        let note=await Note.findById(req.params.id);
        if(!note){res.status(404).send("Not found")}
        //allow deletion if user owns th note
        if(note.user.toString()!=req.user.id){
            return res.status(401).send("not allowed");
        }

        note=await Note.findByIdAndDelete(req.params.id)
        res.json({"success":"note has been deleted",note:note})
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

module.exports=router