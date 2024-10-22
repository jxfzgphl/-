const db=require('../db/index.js')
// 导入dcrypt中间件
const bcrypt=require('bcryptjs')

//上传头像
exports.uploadAvatar=(req,res)=>{
	let oldName=req.files[0].filename
	let newName=Buffer.from(req.files[0].originalname,'latin1').toString('utf8')
	// fs.renameSync('./public/upload/'+oldName,'./public/upload/'+newName)
	fs.rename('./public/upload/'+oldName,'./public/upload/'+newName,(err)=>{})
	const sql='insert into image set ?'
	db.query(sql,{
		image_url:`http://127.0.0.1:3007/upload/${newName}`,
	},(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			url:'http://127.0.0.1:3007/upload/'+newName,
		})
	})
}