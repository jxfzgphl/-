const joi=require('joi')

//string值是只能为字符串
//alphanum值为a-z A-Z 0-9
//min最大长度	max最小长度
//required必填项
//pattern正则表达式

//id验证
const id=joi.string().required()
//姓名验证
const name=joi.string().pattern(/^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$/).max(12).required()
//邮箱验证
const email=joi.string().pattern(/^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})$/).required()
//密码验证
const oldpwd=joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(18).required()
const newpwd=joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(18).required()
//忘记密码
const account=joi.string().alphanum().min(6).max(12).required()
exports.name_limit={
	//表示对req.body里面的收据进行验证
	body:{
		id,
		name
	}
}
exports.email_limit={
	//表示对req.body里面的收据进行验证
	body:{
		id,		
		email
	}
}
exports.pwd_limit={
	//表示对req.body里面的收据进行验证
	body:{
		id,
		oldpwd,
		newpwd
	}
}
exports.verify_limit={
	//表示对req.body里面的收据进行验证
	body:{
		account,
		email
	}
}
exports.change_limit={
	//表示对req.body里面的收据进行验证
	body:{
		id,
		newpwd,
	}
}