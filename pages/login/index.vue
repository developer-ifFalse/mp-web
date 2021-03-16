<template>
	<view v-loading="loading" class="login">
		<!-- <image src="../../static/loginBg.png"></image> -->

		<el-card class="box-card" style="width: 25%; background-color: rgba(255,255,255,0.2); border: 0;">
			<div slot="header" class="clearfix" style="font-weight: bold;">
				<span>登录</span>
			</div>
			<el-form :rules="rules" :model="formData" ref='ruleForm'>
				<el-form-item label="账号" prop="username">
					<el-input v-model="formData.username" placeholder="请输入账号"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm()">登录</el-button>
					<el-button @click="resetForm()">重置</el-button>
					<el-button style="position: absolute; right: 0;" @click="register()">注册</el-button>
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
					]
				},
				loading: false
			}
		},
		methods: {
			submitForm() {
				if (this.formData.username || this.formData.password) {
					this.loading = true
					this.$mpWeb.call(this, 'webLogin', {
						username: this.formData.username,
						password: this.formData.password
					}).then(res => {
						// console.log(res)
						if (res) {
							uni.setStorageSync('uniIdToken', res.result.token)
							uni.setStorageSync('uid', res.result.uid)
							this.$router.push('/home')
						}
						this.loading = false
					})
					this.resetForm()
				} else {
					this.$notify({
						title: '警告',
						message: '请填写账号密码',
						type: 'warning'
					});
				}
			},
			resetForm() {
				this.formData = {}
			},
			register() {
				this.$router.push('/register')
			}
		},
	}
</script>

<style>
	.login {
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.login::before {
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

	.login>.box-card {
		min-height: 380px;
		margin: auto;
	}

	uni-page-body {
		width: 100%;
		height: 100%;
	}
</style>
