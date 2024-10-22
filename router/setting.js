/*    系统设置路由    */
// 导入express框架
const express=require('express')
//使用express框架的路由
const router=express.Router()
// 导入setting的路由处理模块
const settinghandle=require('../router-handle/setting')

router.post('/verify',expressjoi(verify_limit),userinfohandle.verify)

router.post('/changepwd',expressjoi(change_limit),userinfohandle.changepwd)
//对外暴露路由
module.exports =router