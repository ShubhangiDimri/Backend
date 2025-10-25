const mongoose= require('mongoose')

const taskSchema= new mongoose.Schema({
    name:{
        type:String,
        Required:true,


    },
    createdAt:{
        type:Date,
        default:Date.now
    },

    completedAt:{
        type:Date,
        default:null
    },
 
    isCompleted:{
        type:Boolean,
        default:false
    }

})
module.exports= mongoose.model("task",taskSchema)