const {Aluminum} = require('../models/Product')
const {aluminum}=require('../utils/standard')

const aluminumList = async (ctx) =>{
      const aluminums = await Aluminum.find()
      console.log('coppers',aluminums)
      return aluminums
}

const createAluminum = async (ctx) =>{
    ctx.verifyParams({
        title: {type:'string',required:true},
        identity:{type:'enum',values:['Seller','Buyer'],required:true},
        contractStatus:{type:'enum',values:['Open','Close'],required:true},
        standard:{type:'enum',values:['LME','CHI'],required:true},
        quantity:{type:'number',required:true},
        quality:{type:'enum',values:aluminum.aluminumStandard,required:true},
        shape:{type:'enum',values:aluminum.shape,required:true},
        lotSize:{type:'number',required:true},
        // warrant:{
        //     size:{type:'number',default:25,required:true},
        //     //tolerance: {type:'number',max:0.2,min:0.2,required:true}
        // }
    }) 
    const info = ctx.request.body
    const newAluminum = await new Aluminum(info).save()
    console.log(newAluminum)
    return newAluminum
    
}

const getAluminum = async (ctx) =>{
    const id = ctx.params.id
    const aluminum = await Aluminum.findById(id).select('+identity +shape +lotSize +warrant')
    //future add: auth 
    return aluminum
    
}

const updateAluminum  = async (ctx) =>{
    //future add: auth checkidentity checkProductExit
    
    ctx.verifyParams({
        title: {type:'string',required:false},
        identity:{type:'enum',values:['Seller','Buyer'],required:false},
        contractStatus:{type:'enum',values:['Open','Close'],required:false},
        standard:{type:'enum',values:['LME','CHI'],required:false},
        quantity:{type:'number',required:false},
        quality:{type:'enum',values:aluminum.aluminumStandard,required:false},
        shape:{type:'enum',values:aluminum.shape,required:false},
        lotSize:{type:'number',required:false},
    })

    const id = ctx.params.id

    const newAluminum = await Aluminum.findByIdAndUpdate(id,ctx.request.body)

    return newAluminum
    
}
module.exports={aluminumList,createAluminum,getAluminum,updateAluminum}