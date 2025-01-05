const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    date:{
        type:String,
        require:true
    },
    questions: [
        {
          question: {
            type: String,
            required: true, // Correct keyword is 'required'
          },
          ans: {
            type: String,
            required: true,
          },
          options: {
            type: [String], // Array of strings for options
            required: true, // Optional if options must always be provided
          },
          totalcount:{
                type:Number,
                required:true
          },
          correctans:{
            type:Number,
            required:true
          }
        },
      ],
    totalimpression:{
        type:Number,
        required:true
    }
});

module.exports=mongoose.model('quiz',schema);