const mongoose = require('mongoose')
const {Schema,model} = mongoose
const  Float = require('mongoose-float').loadType(mongoose);
const {copper,aluminum} =require('../utils/standard')

const productSchema = Schema({
    title:{type:String,required:true,select:true},
    postBy:{type:Schema.Types.ObjectId, ref:'Muser',select:true,required:true},
    identity:{type:String,enum:['Seller','Buyer'],required:true,select:false},//enum
    contractStatus:{type:String,enum:['Open','Close'],required:true,select:true},//enum

    standard:{type:String,enum:['LME','CHI'],default:'LME',required:true,select:true},//enum
    quantity:{type:Number,required:true,select:true},
    quality:{
        type:String,
        required:true,
        select:true
    },//enum,depened on different 
    shape:{type:String,required:true,select:false},
    lotSize:{type:Number,required:true,select:false},
    warrant:{
        size:{type:Number,default:25,required:true,select:false},
        tolerance: {type:Float,max:0.2,min:0.2,required:true,select:false}
    }
})

const Product = model('Product',productSchema);

//copper inherit from product 
const Copper = Product.discriminator('Copper',new Schema({
    quality:{
        type:String,
        enum:copper.copperStandard,
        required:true,
        select:true
    },
    shape:{type:String,enum:copper.shape,required:true,select:true},
}))

//aluminum inherit from product 
const Aluminum = Product.discriminator('Aluminum', new Schema({
    quality:{
        type:String,
        enum:aluminum.aluminumStandard,
        required:true,
        select:true
    },
    shape:{type:String,enum:aluminum.shape,required:true,select:true},

}))

module.exports={Copper,Aluminum}