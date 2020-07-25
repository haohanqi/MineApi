const mongoose = require('mongoose')
const {Schema,model} = mongoose

const mineUserSchema = Schema({
     name:{type:String,required:true,select:true},
     location:{type:String,required:true,select:true},
     //product
     web: {type:String,required:false,select:true},
     phone:{type:String,required:true,select:true},
     email:{type:String,required:true,select:true},
     faxNumber:{type:String,required:false,select:false},
})

module.exports=model('Muser',mineUserSchema)