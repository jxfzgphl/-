const express=require('express')
const joi=require('joi')
const router=express.Router()
const tokenhandle=require('../router-handle/setUpload')
const expressjoi=require('@escook/express-joi')

router.post('/setfiles',tokenhandle.setToken)


module.exports =router