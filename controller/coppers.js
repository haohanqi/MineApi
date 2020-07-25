const {Copper} = require('../models/Product')
const {copper}=require('../utils/standard')

const copperList = async (ctx) =>{
      const coppers = await Copper.find()
      return coppers
}

const createCopper = async (ctx) =>{
    ctx.verifyParams({
        title: {type:'string',required:true},
        identity:{type:'enum',values:['Seller','Buyer'],required:true},
        contractStatus:{type:'enum',values:['Open','Close'],required:true},
        standard:{type:'enum',values:['LME','CHI'],required:true},
        quantity:{type:'number',required:true},
        quality:{type:'enum',values:copper.copperStandard,required:true},
        shape:{type:'enum',values:copper.shape,required:true},
        lotSize:{type:'number',required:true},
    }) 
    const info = ctx.request.body
    const newCopper = await new Copper(info).save()
    console.log(newCopper)
    return newCopper
    
}

const getCopper = async (ctx) =>{
    const id = ctx.params.id
    const copper = await Copper.findById(id).select('+identity +shape +lotSize +warrant')
    //future add: auth 
    return copper
    
}

const updateCopper = async (ctx) =>{
    //future add: auth checkidentity checkProductExit
    
    ctx.verifyParams({
        title: {type:'string',required:false},
        identity:{type:'enum',values:['Seller','Buyer'],required:false},
        contractStatus:{type:'enum',values:['Open','Close'],required:false},
        standard:{type:'enum',values:['LME','CHI'],required:false},
        quantity:{type:'number',required:false},
        quality:{type:'enum',values:copper.copperStandard,required:false},
        shape:{type:'enum',values:copper.shape,required:false},
        lotSize:{type:'number',required:false},
    })

    const id = ctx.params.id

    const newCopper = await Copper.findByIdAndUpdate(id,ctx.request.body)

    return newCopper
    
}
module.exports={copperList,createCopper,getCopper,updateCopper}