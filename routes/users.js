const router = require('koa-router')()
const {getUserList,createNewUser,getUserInfo,updateUserInfo,deleteUser} =require('../controller/users')

router.prefix('/api/users')

//get user list
router.get('/list', getUserList)

//get specific user by id 
router.get('/:id',getUserInfo)

// post a new user 
router.post('/createUser',createNewUser)

// update a user info
// future add: auth,checkIndentity,checkUserExist
router.patch('/:id',updateUserInfo)

//delete a user (should hide)
router.delete('/:id',deleteUser)


module.exports = router
