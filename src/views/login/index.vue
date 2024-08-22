<template>
	<div class="common-layout">
	    <el-container>
	      <el-header class="header-wrapped">
			  <div class="header-content">
				  <h3>通用后台管理系统</h3>
				  <span class="welcome">欢迎您的登录</span>
			  </div>
		  </el-header>
	      <el-main>
			  <div class="login-wrapped">
				<el-card class="box-card">
					<el-tabs v-model="activeName" class="demo-tabs" :stretch="true">
					    <el-tab-pane label="登录" name="login">
							<el-form class="login-form">
								<el-form-item label="账号">
									<el-input v-model="loginData.account" placeholder="请输入账号..."></el-input>
								</el-form-item >
								<el-form-item label="密码">
									<el-input v-model="loginData.password" placeholder="请输入密码..."></el-input>
								</el-form-item>
								<!-- 登录卡片底部外壳 -->
								<div class="card-bottom-wrapped">
									<div class="forget-password">
										<span @click="openForget">忘记密码</span>
									</div>
									<div class="btn-wrapped">
										<el-button type="primary" @click="Login">登录</el-button>
									</div>
									<div class="go-register">
										还没有账号？<span>马上注册</span>
									</div>
								</div>
							</el-form>
						</el-tab-pane>
					    <el-tab-pane label="注册" name="register">
							<el-form class="login-form">
								<el-form-item label="账号">
									<el-input v-model="registerData.account" placeholder="账号长度6-12位"></el-input>
								</el-form-item >
								<el-form-item label="密码">
									<el-input v-model="registerData.password" placeholder="密码需长度6-18位的字母和数字"></el-input>
								</el-form-item>
								<el-form-item label="确认密码">
									<el-input v-model="registerData.repassword" placeholder="请再次输入密码"></el-input>
								</el-form-item>
								<!-- 注册卡片底部外壳 -->
								<div class="card-bottom-wrapped">
									<div class="btn-wrapped">
										<el-button type="primary" @click="Register">注册</el-button>
									</div>
								</div>
							</el-form>
						</el-tab-pane>
					  </el-tabs>
				</el-card>
			  </div>
		  </el-main>
	      <el-footer class="footer-wrapped">
			  <div class="footer-content">
				  <div class="title">
					  <span>弓介大帝支持&nbsp|&nbsp</span>
					  <span>弓介大帝支持&nbsp|&nbsp</span>
					  <span>弓介大帝支持&nbsp|&nbsp</span>
					  <span>弓介大帝支持&nbsp|&nbsp</span>
					  <span>弓介大帝支持</span>
				  </div>
			  </div>
		  </el-footer>
	    </el-container>
	</div>
	<forget ref="forgetp"></forget>
</template>

<script lang="ts" setup>
	import {ref,reactive} from 'vue'
	import forget from './components/forget_password.vue'
	import { register,login } from '@/api/login';
	import { ElMessage } from 'element-plus'
	import { useRouter } from 'vue-router';
	
	//表单接口
	interface formData{
		account:number;
		password:string;
		repassword?:'';
	}
	const activeName = ref('login')
	const forgetp=ref()
	const router=useRouter()
	//登入表单数据
	const loginData : formData=reactive({
		account:null,
		password:''
	})
	//注册表单数据
	const registerData : formData=reactive({
		account:null,
		password:'',
		repassword:'',
	})
	// 注册
	const Register=async()=>{
		if(registerData.password===registerData.repassword){
			const res=await register(registerData)
			if(res.data.message==="账号注册成功"){
				ElMessage({
				    message: '注册成功',
				    type: 'success',
				})
				activeName.value='login'
			}else{
				ElMessage.error('注册失败'+res.data.message)
			}
		}else{
			ElMessage.error('注册失败')
		}
	}
	
	//登录
	const Login=async ()=>{
		const res=await login(loginData)
		const {token}=res.data
		if(res.data.message==="登录成功"){
			ElMessage({
			    message: '登录成功',
			    type: 'success',
			})
			localStorage.setItem('token',token)
			router.push('./home')
		}else{
			ElMessage.error('登录失败')
		}
	}
	//打开修改密码弹窗
	const openForget=()=>{
		forgetp.value.open()
	}
</script>

<style lang="scss" scoped>
	*{
		box-sizing: border-box;
	}
	//头部外壳
	.header-wrapped{
		//头部内容
		.header-content{
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			//欢迎语
			.welcome{
				font-size: 13px;
			}
		}
	}
	// 主体部分
	.el-main{
		background-image: url('@/assets/Acg.jpeg');
		height: 600px;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center center;
		--el-main-padding:0;
		// 登录外壳
		.login-wrapped{
			height: 100%;
			margin: 0 auto;
			// 登录卡片
			.box-card{
				width: 350px;
				height: 375px;
				float:right;
				position: relative;
				top:14%;
				//标签页
				.demo-tabs{
					//表单
					.login-form{
						margin-top: 30px;
						//登录卡片底部样式
						.card-bottom-wrapped{
							.forget-password{
								text-align: right;
								margin-bottom: 10px;
								span{
									font-size: 12px;
									color: #4091ff;
									//鼠标移入鼠标变手指样式
									cursor: pointer;
								}
							}
							//底部登录按钮样式
							.btn-wrapped{
								width: 100%;
								padding: 0 10px;
								.el-button{
									width: 100%;
									height: 40px;
									font-size: 16px;
								}
							}
							.go-register{
								text-align: center;
								font-size: 12px;
								margin-top: 10px;
								span{
									color: #4091ff;
									cursor: pointer;
								}
							}
						}
					}
				}
				
			}
		}
	}
	// 底部外壳
	.footer-wrapped{
		margin-top: 10px;
		// 底部内容
		.footer-content{
			margin: 0 auto;
			// 底部介绍
			.title{
				display: flex;
				justify-content: center;
				align-items: center;
				span{
					color:#666;
					font-size: 12px;
				}
			}
		}
	}
	// tabs标签
	:deep(.el-tabs__item){
		color:#333;
		font-size: 18px;
	}
	// 输入框
	:deep(.el-input__inner){
		height: 40px;
	}
	// 输入框标题
	:deep(.el-form-item__label){
		height: 40px;
		line-height: 40px;
	}
	@media screen and (max-width: 468px) {
	    
	}
	@media (min-width: 768px) {
		.header-content,.login-wrapped,.footer-content{
			width: 750px;
		}
	}
	@media (min-width: 992px) {
		.header-content,.login-wrapped,.footer-content{
			width: 970px;
		}
	}
	@media (min-width: 1200px) {
		.header-content,.login-wrapped,.footer-content{
			width: 1170px;
		}
	}
</style>