const {createCopper,copperList,getCopper,updateCopper}=require('./coppers')
const {createAluminum,aluminumList,getAluminum,updateAluminum}=require('./aluminum')

const productList = async (ctx) =>{
    
    let {target} = ctx.params
    console.log(ctx.params,target)
   
    if(target === 'Copper'){
         const list=await copperList(ctx)
         ctx.body=list
    }

    if(target === 'Aluminum'){
        const list=await aluminumList(ctx)
        ctx.body=list
    }
}

const createNewProduct = async (ctx) =>{
    let {target} = ctx.params
    console.log(ctx.params,target)
    
    if(target === 'Copper'){
         const newProduct=await createCopper(ctx)
         ctx.body={newProduct}
    }

    if(target === 'Aluminum'){
        console.log('alu')
        const newProduct=await createAluminum(ctx)
        ctx.body={newProduct}
   }

}

const getProduct = async (ctx) =>{
    let {target} = ctx.params
    console.log(ctx.params,target)
   
    if(target === 'copper'){
         const copper=await getCopper(ctx)
         if(copper){
            ctx.body=copper
         }else{
             ctx.throw(404,`${target} not found`)
         }    
    }

    if(target === 'aluminum'){
        const aluminum=await getAluminum(ctx)
        if(aluminum){
           ctx.body=aluminum
        }else{
            ctx.throw(404,`${target} not found`)
        }    
   }

}

const upateProduct = async (ctx) =>{
    let {target,id} = ctx.params
    console.log(ctx.params,target)
   
    if(target === 'copper'){
         const newCopper=await updateCopper(ctx)
         if(newCopper){
            ctx.body=newCopper
         }else{
             ctx.throw(404,`${target}-${id} not found`)
         }
    }

    if(target === 'aluminum'){
        const newAluminum=await updateAluminum(ctx)
        if(newAluminum){
           ctx.body=newAluminum
        }else{
            ctx.throw(404,`${target}-${id} not found`)
        }
   }

    
}

module.exports={productList,createNewProduct,getProduct,upateProduct}