const db=require('../db/index.js')
// 导入dcrypt中间件
const bcrypt=require('bcryptjs')
//导入jwt，用于生成token
const jwt=require('jsonwebtoken')

exports.setfiles=(req,res)=>{
	const fileinfo=req.body
	const sql='insert into files set ?'
	db.query(sql,{
		file:fileinfo.file,
		path:fileinfo.path,
		},(err,results)=>{
		if(err) return res.cc(err)
		res.send({
			status:1,
			message:'数据添加成功'
		})
	})
}
