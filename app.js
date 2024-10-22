const express=require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
const loginrouter=require('./router/login')
const jwtconfig=require('./jwt-config/index.js')
const {expressjwt:jwt}=require('express-jwt')
const Joi=require('joi')
const userRouter=require('./router/userinfo')
const fileRouter=require('./router/files')
const tokenRouter=require('./router/setUpload')
//multer是node.js的一个中间件，用于处理multiport/form-data类型的表单数据，它主要用于上传文件
const multer = require('multer')
//在sever服务端下新建一个public文件，在public文件下新建一个upload文件用于存放图片
const upload=multer({dest:'./public/upload'})


const app=express()

app.use(cors())
app.use(upload.any())
// 静态托管
app.use(express.static("./public"))
//	当extended为false时，值为数组和字符串；为true时，值为任意类型
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use((req,res,next)=>{
	//status=1为失败，=0为成功，默认为1
	res.cc = (err,status = 1)=>{
		res.send({
			status:status,
			//判断error是错误对象还是字符串
			message: err instanceof Error ? err.message : err,
		})  
	}
	next()
})

// app.use(jwt({
// 	secret:jwtconfig.jwtSecretKey,
// 	algorithms:['HS256']
// }).unless({
// 	path:[/^\/api\//]
// }))

app.use('/api',loginrouter)

app.use('/user',userRouter)
app.use('/file',fileRouter)
app.use('/files',tokenRouter)
//对不符合joi规则的情况进行报错
app.use((err,req,res,next)=>{
	if(err instanceof Joi.ValidationError) return res.cc(err) 
})


app.listen(3007, () => {
	console.log('http://127.0.0.1:3007')
})