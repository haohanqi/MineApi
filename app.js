const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose')
const {mongodb}=require('./config/db.js')
const cors = require('koa2-cors');
const error = require ('koa-json-error')
const index = require('./routes/index')
const users = require('./routes/users')
const products = require('./routes/products')
const parameter = require('koa-parameter')

mongoose.connect(mongodb,{ useUnifiedTopology: true,useNewUrlParser: true },()=>console.log('connect successfully'))
mongoose.connection.on('error',console.error)
// error handler
//onerror(app)

app.use(error(
  {
     postFormat:(e,{stack, ...rest})=>{
     return  process.env.NODE_ENV ==='production' ? rest : {stack, ...rest}
     }  
 }
))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(parameter(app))
app.use(cors())
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(products.routes(), products.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
