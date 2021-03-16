<template>
	<view class="Home" v-loading="loading">
		<view class="left">
			<view class="logo">
				<img src="../../static/logo.png"></img>
				<p>钻机管理系统</p>
			</view>
			<view class="nav">
				<ul>
					<router-link tag="li" to="/home/" exact><i class="el-icon-document"></i>年度结算</router-link>
					<router-link tag="li" to="/home/examine"><i class="el-icon-document-checked"></i>审核</router-link>
					<router-link tag="li" to="/home/record"><i class="el-icon-folder-opened"></i>未结算项目</router-link>
					<router-link tag="li" to="/home/assignProjectManager"><i class="el-icon-thumb"></i>绑定项目经理</router-link>
				</ul>
			</view>
		</view>
		<view class="right">
			<view class="top">
				<view @click="exit" class="userInfo">
					<span>退出登录</span>
				</view>
				<!-- <el-popover class="list" placement="bottom" width="100" trigger="click">
					<ul>
						<li>
							<button @click="exit" style=" border: none; background-color: transparent;"><span >退出登录</span></button>
						</li>
					</ul>
					<view class="userInfo" slot="reference">
						<span>{{userInfo.username}}</span>
						<i class="el-icon-caret-bottom"></i>
					</view>
				</el-popover> -->
			</view> 
			<view class="content">
				<router-view></router-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				loading: false
			}
		},
		methods: {
			handleHome() {
				this.$router.push('/home/assignProjectManager')
			},
			exit() {
				uni.removeStorageSync('uniIdToken');
				uni.removeStorageSync('uid')
				this.$router.push('/login')
			}
		},
		beforeRouteEnter(to, from, next) {
			// next(vm => {
			// 	vm.loading = true
			// 	vm.$mpWeb.callFunction({
			// 		name:'searchUser',
			// 		data:{
			// 			uid:uni.getStorageSync('uid')
			// 		}
			// 	}).then(res => {
			// 		if (res.result.code === 0){
			// 			vm.userInfo = res.result.userInfo
			// 		}else{
			// 			vm.$notify.error({
			// 				title: '错误',
			// 				message: res.result.msg
			// 			});
			// 		}
			// 		vm.loading = false
			// 	})
			// })
			next()
		}
	}
</script>

<style lang="less">
	uni-button:after {
		border: none;
	}

	a {
		text-decoration: none;
	}

	ul {
		list-style: none;
	}

	.Home {
		display: flex;
		height: 100vh;

		.left {
			width: 240px;
			background: #2d2d36;

			.logo {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 60px;
				background: #37485d;

				img {
					height: 100%;
				}
				
				p{
					margin-left: 10px;
					color: #C0C0C0;
					font-size: 20px;
				}
			}

			.nav {

				ul {
					margin: 0 auto;
					color: #57697e;

					.router-link-active {
						color: #ff4500;
						background-color: rgb(67, 74, 80);
					}

					li {
						height: 52px;
						line-height: 52px;
						text-indent: 0.5em;
						white-space: nowrap;
						overflow: hidden;
						-o-text-overflow: ellipsis;
						text-overflow: ellipsis;
						margin: 10px 0;
						font-size: 20px;
						cursor: pointer;

						i {
							font-size: 20px;
							margin: 0 10px;
						}

						a {
							color: #57697e;
						}
					}
				}
			}
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			background: 'white';

			.content {
				flex: 1;
				display: flex;
				overflow: hidden;

				&>div {
					flex: 1;
				}
			}

			.top {
				height: 60px;
				background: #2d2d36;
				display: flex;
				justify-content: flex-end;
				align-items: center;


				.userInfo {
					color: #C0C0C0;
					margin-right: 50px;
					cursor: pointer;
				}

				.icon {
					width: 60px;
					height: 26px;
					line-height: 26px;
					text-align: center;
					border: 1px solid hsla(0, 0%, 100%, .3);
					margin-right: 16px;

					i {
						font-size: 20px;
						color: red;
					}
				}
			}
		}
	}
</style>
