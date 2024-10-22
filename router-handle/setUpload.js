const qiniu = require('qiniu');  
  

  
exports.setToken=(req,res)=>{
	const accessKey = 'fka42zGMDGFEddU3YehoII73ILI2QXlMBgcxyY0i'
	const secretKey = 'AK7czWiGv9g9fRzW5kalBKAF0-rFoFR7QiwxGbf7'
	const bucket = 'xg-chucun'
	  
	const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);  
	const options = {  
	  scope: bucket,  
	  expires: 7200, // 设置token有效期（单位秒）  
	};  
	const putPolicy = new qiniu.rs.PutPolicy(options);
	const uploadToken = putPolicy.uploadToken(mac);
	res.send({
		statu:1,
		massage:"成功",
		token:uploadToken
	})
}