const mongoose=require('mongoose');
const schema=mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    totalcount:{
        type:Number
    },
    quizes:{
        type:[String]
    },
    impressions:{
        type:Number 
    }
});
module.exports=mongoose.model('dashboard',schema);