const db=require('../db/index.js')
// 导入dcrypt中间件
const bcrypt=require('bcryptjs')
//导入node.js的crypto库生成uuid
const crypto=require('crypto')
//处理文件路径
const fs=require('fs')
const { send } = require('process')

//上传头像
exports.uploadAvatar=(req,res)=>{
	//生成唯一标识
	const onlyId=crypto.randomUUID()
	let oldName=req.files[0].filename
	let newName=Buffer.from(req.files[0].originalname,'latin1').toString('utf8')
	// fs.renameSync('./public/upload/'+oldName,'./public/upload/'+newName)
	fs.rename('./public/upload/'+oldName,'./public/upload/'+newName,(err)=>{})
	const sql='insert into image set ?'
	db.query(sql,{
		image_url:`http://127.0.0.1:3007/upload/${newName}`,
		onlyId,
	},(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			onlyId,
			status:0,
			url:'http://127.0.0.1:3007/upload/'+newName,
		})
	})
}
//绑定账号
exports.bindaccount=(req,res)=>{
	const {onlyId,account,url}=req.body
	const sql='update image set account = ? where onlyId = ?'
	db.query(sql,[account,onlyId],(err,result)=>{
		if(err) return res.cc(err)
		if(result.affectedRows===1){
			const sql1='update users set imageUrl = ? where account = ?'
			db.query(sql1,[url,account],(err,results)=>{
				if(err) return res.cc(err)
				res.send({
					status:0,
					message:'修改成功'
				})
			})
		}
	})
}
//获取用户信息
exports.getUserinfo=(req,res)=>{
	const sql='select * from users where id=?'
	db.query(sql,req.body.id,(err,result)=>{
		if(err) return res.cc(err)
		res.send(result)
	})
}
//修改用户名
exports.changeName=(req,res)=>{
	const {id,name}=req.body
	const sql='update users set name = ? where id = ?'
	db.query(sql,[name,id],(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'修改成功'
		})
	})
}
//修改用户性别
exports.changeSex=(req,res)=>{
	const {id,sex}=req.body
	const sql='update users set sex=? where id = ?'
	db.query(sql,[sex,id],(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'修改成功'
		})
	})
}
//修改邮箱
exports.changeEmail=(req,res)=>{
	const {id,email}=req.body
	const sql='update users set email=? where id = ?'
	db.query(sql,[email,id],(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'修改成功'
		})
	})
}
// 修改密码
exports.changePassword=(req,res)=>{
	const pwdfo=req.body
	const sql='select password from users where id = ?'
	db.query(sql,pwdfo.id,(err,result)=>{
		if(err) return res.cc(err)
		const compareResult1 =bcrypt.compareSync(pwdfo.oldpwd,result[0].password)
		const compareResult2 =bcrypt.compareSync(pwdfo.newpwd,result[0].password)
		if(compareResult1){
			if(compareResult2){
				pwdfo.newpwd=bcrypt.hashSync(pwdfo.newpwd,10)
				const sql1='update users set password=? where id = ?'
				db.query(sql1,[pwdfo.newpwd,pwdfo.id],(err,results)=>{
					if(err) return res.cc(err)
					res.send({
						status:0,
						message:'修改成功'
					})
				})
			}else{
				return res.send({
					status:1,
					message:'新密码不能和旧密码相同'
				})
			}
		}else{
			res.send({
				status:1,
				message:'原密码错误'
			})
		}
	})
}

/*    忘记密码    */
//1.验证账号和邮箱是否一致
exports.verify=(req,res)=>{
	const {account,email}=req.body
	const sql='select * from users where account = ?'
	db.query(sql,account,(err,result)=>{
		if(err) return res.cc(err)
		if(email&&email===result[0].email){
			return res.send({
				status:0,
				message:'验证成功',
				id:result[0].id
			})
		}else{
			res.send({
				status:1,
				message:'账号与邮箱不一致'
			})
		}
	})
}
//2.修改密码
exports.changepwd=(req,res)=>{
	const data=req.body
	const sql='select password from users where id = ?'
	db.query(sql,data.id,(err,result)=>{
		if(err) return res.cc(err)
		const compareResult=bcrypt.compareSync(data.newpwd,result[0].password)
		if(compareResult){
			return res.send({
				status:1,
				message:'新密码不能和旧密码相同'
			})
		}else{
			data.newpwd=bcrypt.hashSync(data.newpwd,10)
			const sql1='update users set password=? where id = ?'
			db.query(sql1,[data.newpwd,data.id],(err,results)=>{
				if(err) return res.cc(err)
				res.send({
					status:0,
					message:'修改成功',
				})
			})
		}
	})
}