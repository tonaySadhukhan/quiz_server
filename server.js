const express=require('express');
require('dotenv').config();
const app=express();
const mongoose=require('mongoose');
const db=require('./db');
const admins=require('./models/admins');
const dashboard=require('./models/dashboard');
const quiz = require('./models/quizes');

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("welcome to quiz app");
});
app.post('/register',async(req,res)=>{
    try{
    const data=req.body;
    const newData=new admins(data);
    const response = await newData.save(); 
    const dasdata={
        Nmae:response.name,
        email:response.email,
        totalcount:0,
        quizes:[],
        impressions:0,
    }// Await the save method
    const newData2=new dashboard(dasdata);
    const response2=await newData2.save();
    res.status(200).json(response);
    console.log(response);
    console.log(response2);
    }catch(error){
        res.status(500).send(error);
    }
});

app.get('/login/:email', async (req, res) => {
    try {
        console.log(req.params.email);
        const data = await admins.findOne({ email:req.params.email }); // Use findOne to get a single document
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).send('Admin not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
app.get('/dashboard/:email',async (req,res)=>{
    try{
        console.log(req.params.email);
        const data=await dashboard.findOne({ email:req.params.email });
        if(data){
            res.status(200).json(data);
        }
        else{
            res.status(404).send("Data Not Found");
        }
    }catch(error){
        console.log(error);
    }
});

app.post('/quiz/:email', async (req,res)=>{
    try{
   const data =req.body;
    const newdata=new quiz(data);
    const response=await newdata.save();
    res.status(200).json(response);

    const update=await dashboard.updateOne({email:req.params.email},{$push:{quizes:response._id}});
    if(update){
        console.log("updated successfully");
    }
    console.log(response);
    }catch(error){
        console.log(error);
    }

});
app.get('/quiz/:_id',async (req,res)=>{
    try{
    const data=await quiz.findOne({_id:req.params._id});
    if(data){
        res.status(200).json(data);
    }else{
        res.status(404).send("Data Not found");
    }
}catch(err){
    console.log(err);
}
});

app.listen(3000,()=>{
    console.log("Server running at 3000");
});