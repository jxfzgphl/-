const express=require('express')
const joi=require('joi')
const router=express.Router()
const fileshandle=require('../router-handle/files')
const expressjoi=require('@escook/express-joi')

router.post('/setfiles',fileshandle.setfiles)


module.exports =router