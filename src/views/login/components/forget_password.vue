<template>
	<!-- 忘记密码 -->
	<el-dialog v-model="statu.forgetPasswordDialog" title="忘记密码" width="400">
	    <el-form class="login-form" :label-position="labelPosition" :rules="rules">
	    	<el-form-item label="请输入您的账号:" prop="account">
	    		<el-input v-model="forgetData.account" placeholder="请输入您的账号"></el-input>
	    	</el-form-item >
	    	<el-form-item label="请输入您的邮箱:" prop="email" :label-position="labelPosition">
	    		<el-input v-model="forgetData.email" placeholder="请输入您的邮箱"></el-input>
	    	</el-form-item>
	    </el-form>
		<!-- 底部内容 -->
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="statu.forgetPasswordDialog = false">取消</el-button>
				<el-button type="primary" @click="nextStep">下一步</el-button>
			</div>
		</template>
	</el-dialog>
	<!-- 修改密码 -->
	<el-dialog v-model="statu.changePasswordDialog" title="修改密码" width="400">
	    <el-form class="login-form" :label-position="labelPosition" :rules="rules">
	    	<el-form-item label="请输入您的新密码:" prop="password">
	    		<el-input v-model="forgetData.password" placeholder="请输入您的新密码"></el-input>
	    	</el-form-item >
	    	<el-form-item label="请输入再次您的新密码:" prop="repassword" :label-position="labelPosition">
	    		<el-input v-model="forgetData.repassword" placeholder="请输入再次您的新密码"></el-input>
	    	</el-form-item>
	    </el-form>
		<!-- 底部内容 -->
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="statu.changePasswordDialog = false">取消</el-button>
				<el-button type="primary" @click="statu.changePasswordDialog = false">确认</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
	import {ref,reactive} from 'vue'
	import type { FormRules } from 'element-plus'
	
	//表单对象接口
	interface formData{
		account:number;
		email:string;
		password:string;
		repassword:string;
	}
	
	const labelPosition = ref('top')
	
	//表单对象
	const forgetData : formData=reactive({
		account:null,
		email:'',
		password:'',
		repassword:''
	})
	// 控制弹窗，默认关闭
	const statu=reactive({
		forgetPasswordDialog:false,
		changePasswordDialog:false
	})
	//打开弹窗
	const open=()=>{
		statu.forgetPasswordDialog=true
	}
	//打开修改密码弹窗
	const nextStep=()=>{
		statu.forgetPasswordDialog=false
		statu.changePasswordDialog=true
	}
	// 规则
	const rules = reactive<FormRules<formData>>({
		account: [
			{ required: true, message: '请输入你的账号', trigger: 'blur' },
		],
		email: [
			{ required: true, message: '请输入你的邮箱', trigger: 'blur' },
		],
		password : [
			{ required: true, message: '请输入您的新密码', trigger: 'blur' },
		],
		repassword : [
			{ required: true, message: '请输入再次您的新密码', trigger: 'blur' },
		]
	})
	defineExpose({
		open
	})
</script>

<style lang="scss" scoped>
	
</style>