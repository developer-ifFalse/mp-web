<template>
	<view v-loading="loading" class="register">
		<!-- <image src="../../static/loginBg.png"></image> -->

		<el-card class="box-card" style="width: 25%; background-color: rgba(255,255,255,0.2); border: 0;">
			<div slot="header" class="clearfix" style="font-weight: bold;">
				<span>注册</span>
			</div>
			<el-form :rules="rules" :model="formData" ref='ruleForm'>
				<!-- <el-form-item label="手机号" prop="phone" style="position: relative;">
					<el-input v-model="formData.phone"></el-input>
					<el-button @click="sendSmsCode()" type="primary" size="small" style="position: absolute; right: 0; height: 40px;">获取验证码</el-button>
				</el-form-item>
				<el-form-item label="验证码" prop="code">
					<el-input v-model="formData.code"></el-input>
				</el-form-item> -->
				<el-form-item label="公司名称" prop="companyname">
					<el-input v-model="formData.companyname" placeholder="请输入公司名称"></el-input>
				</el-form-item>
				<el-form-item label="账号" prop="username">
					<el-input v-model="formData.username" placeholder="请输入3到20个字符" ></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="formData.password" placeholder="请输入6到20个字符"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="passwordTow">
					<el-input type="password" v-model="formData.passwordTow" placeholder="请输入6到20个字符"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm()">注册</el-button>
					<el-button @click="resetForm()">重置</el-button>
					<el-button style="position: absolute; right: 0;" @click="login()">去登录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {},
				rules: {
					companyname: [{
						required: true,
						message: '请输入公司名称',
						trigger: 'blur'
					}],
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							min: 11,
							max: 11,
							message: '请输入正确的手机号',
							trigger: 'blur'
						}
					],
					code: [{
							required: true,
							message: '请输入验证码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 6,
							message: '长度6个字符',
							trigger: 'blur'
						}
					],
					username: [{
							required: true,
							message: '请输入账号',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 20,
							message: '长度在 3 到 20 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 20,
							message: '长度在 6 到 20 个字符',
							trigger: 'blur'
						}
					],
					passwordTow: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 20,
							message: '长度在 6 到 20 个字符',
							trigger: 'blur'
						}
					]
				},
				loading: false
			}
		},
		methods: {
			submitForm() {
				if (this.formData.username && this.formData.password && this.formData.passwordTow && this.formData.companyname) {
					this.loading = true
					if (this.formData.password === this.formData.passwordTow) {
						this.$mpWeb('register',{
								username: this.formData.username,
								password: this.formData.password,
								companyname: this.formData.companyname
						}).then(res => {
							if (res.result.code === 0) {
								// console.log(res)
								this.$notify({
									title: '成功',
									message: '注册成功',
									type: 'success'
								});
								this.loading = false
								this.$router.push('/login')
							} else {
								this.loading = false
								this.$notify.error({
									title: '错误',
									message: res.result.msg
								});
							}
						})
					} else {
						this.$notify.error({
							title: '错误',
							message: '两次密码不一致！'
						});
						this.loading = false
					}
					this.resetForm()
				} else {
					this.$notify({
						title: '警告',
						message: '请填写完信息',
						type: 'warning'
					});
				}
			},
			resetForm() {
				this.formData = {}
			},
			login() {
				this.$router.push('/login')
			},
			// sendSmsCode(){
			// 	this.$mpWeb.callFunction({
			// 		name:'sendSmsCode',
			// 		data:{
			// 			mobile:this.formData.phone
			// 		}
			// 	}).then(res => {
			// 		console.log(res)
			// 	})
			// }
		},
	}
</script>

<style>
	.register {
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	
	.register::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url(../../static/loginBg.png);
		filter: blur(5px);
		z-index: -1;
		background-size: cover;
	}

	.register>.box-card {
		margin: auto;
	}

	uni-page-body {
		width: 100%;
		height: 100%;
	}
</style>
