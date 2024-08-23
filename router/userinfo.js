// 导入express框架
const express=require('express')
//使用express框架的路由
const router=express.Router()
//导入exprjoi
const expressjoi=require('@escook/express-joi')
// 导入userinfo的路由处理模块
const userinfohandle=require('../router-handle/userinfo')


//导入验证规则
const {
	name_limit,email_limit,pwd_limit,verify_limit,change_limit
}=require('../limit/user.js')


//上传头像
router.post('/uploadAvatar',userinfohandle.uploadAvatar)
//绑定账号
router.post('/bindaccount',userinfohandle.bindaccount)
//获取用户信息
router.post('/getUserinfo',userinfohandle.getUserinfo)
//修改用户名
router.post('/changeName',expressjoi(name_limit),userinfohandle.changeName)
//修改用户性别
router.post('/changeSex',userinfohandle.changeSex)
//修改邮箱
router.post('/changeEmail',expressjoi(email_limit),userinfohandle.changeEmail)
//修改密码
router.post('/changePassword',expressjoi(pwd_limit),userinfohandle.changePassword)
/*    忘记密码    */
//1.验证账号和邮箱是否一致
router.post('/verify',expressjoi(verify_limit),userinfohandle.verify)
//2修改密码
router.post('/changepwd',expressjoi(change_limit),userinfohandle.changepwd)
//对外暴露路由
module.exports =router