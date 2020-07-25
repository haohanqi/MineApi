const Muser = require ('../models/User')

const getUserList = async (ctx)=>{
    const userList = await Muser.find()
    ctx.body={userList}
}

const createNewUser = async (ctx) =>{
    //future add password 
    ctx.verifyParams({
      name:{type:'string',required:true,max:30},
      location:{type:'string',required:true,max:50},
      web: {type:'string',required:false,allowEmpty:true, max:50},
      phone:{type:'string',required:true,select:true,max:12,min:10},
      email:{type:'email',required:true,select:true},
      faxNumber:{type:'string',required:false,select:false,allowEmpty:true,max:12,min:10}
    
    })
    //future add : check user exist
        
        const userInfo = ctx.request.body
        const newUser = await new Muser(userInfo).save()
        ctx.body={newUser}
    
}

const getUserInfo = async (ctx) =>{
    //check user exist
    const id = ctx.params.id 
    const user = await Muser.findById(id)
    if(user){
        ctx.body={
            user
        }
       
    }else{
        ctx.throw(404, "User not found")
    }
    
}

const updateUserInfo = async (ctx) =>{
    ctx.verifyParams({
        name:{type:'string',required:false,max:50},
        location:{type:'string',required:false,max:50},
        web: {type:'string',required:false, max:50},
        phone:{type:'string',required:false,max:12,min:10},
        email:{type:'email',required:false},
        faxNumber:{type:'string',required:false,max:12,min:10}
      })

      const id = ctx.params.id
      //future const id = ctx.state.user.id
      const user = await Muser.findByIdAndUpdate(id,ctx.request.body)
      if(user){
          ctx.body={id:user.id}
      }else{
          ctx.throw(404, 'user not found')
      }
}

const deleteUser = async (ctx) =>{
    const id = ctx.params.id
    const  result = await Muser.findByIdAndDelete(id)
    if(result){
        ctx.body={
            result
        }
    }else{
        ctx.throw(404,'user not found')
}
}

module.exports={
    getUserList,createNewUser,getUserInfo,updateUserInfo,deleteUser
}