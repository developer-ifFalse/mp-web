<template>
	<view class="Assign">
		<el-card style="width: 99%; margin: 0.5% 0 0 0.5%; height: 99%;">
			<el-form style="margin-top: 20px; position: relative;">
				<el-form-item label="项目经理编号">
					<el-input v-model="queryParam.code" size=""></el-input>
				</el-form-item>

				<el-form-item style="margin-left: 1vw;">
					<el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">查询</el-button>
					<el-button icon="el-icon-delete" size="small" style="margin-left: 8px" @click="resetSearch">重置</el-button>
				</el-form-item>

				<el-form-item style="position: absolute; right: 0;">
					<el-button type="primary" icon="el-icon-search" size="small" @click="handleAll">本公司的项目经理</el-button>
				</el-form-item>
			</el-form>
			<el-table v-loading="loading" :data="tableData" stripe style="width: 100%; margin-top: 20px;">
				<el-table-column prop="name" label="姓名" width="100">
				</el-table-column>
				<el-table-column prop="sex" label="性别" width="100">
				</el-table-column>
				<el-table-column prop="phone" label="电话" width="180">
				</el-table-column>
				<el-table-column prop="idCard" label="身份证号">
				</el-table-column>
				<el-table-column prop="bankID" label="银行卡号">
				</el-table-column>
				<el-table-column prop="address" label="居住地址">
				</el-table-column>
				<el-table-column label="操作" width="180">
					<template slot-scope="scope">
						<el-button v-if="bind" @click="handleDelete(scope.$index, scope.row)">解绑</el-button>
						<el-button v-else-if="scope.row.userType == 'wk'" size="mini" @click="handleEdit(scope.$index, scope.row)">绑定</el-button>
						<el-button disabled v-else>已经绑定公司</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</view>
</template>

<script>
	import {encrypt} from '../../../common/encrypt.js'
	
	export default {
		data() {
			return {
				queryParam: {
					code: '',
				},
				tableData: [],
				loading: false,
				bind: false
			}
		},
		computed: {},
		methods: {
			handleSearch() {
				this.loading = true
				const uniIdToken = uni.getStorageSync('uniIdToken')

				this.$mpWeb('bindProjectManager', {
					code: this.queryParam.code,
					uniIdToken: uniIdToken
				}).then(res => {
					if (res) {
						this.tableData = res.result.data
						this.bind = false
					}
					this.loading = false
				})
			},

			resetSearch() {
				this.queryParam = {}
				this.handleSearch()
			},

			handleEdit(index, row) {
				this.loading = true
				const uniIdToken = uni.getStorageSync('uniIdToken')
				const uniId = uni.getStorageSync('uid')

				this.$mpWeb('handleBind', {
					uniIdToken: uniIdToken,
					uniId: uniId,
					_id: row._id
				}).then(res => {
					if (res.success) {
						this.$notify.success({
							title: '成功',
						})
						this.handleSearch()
					}
				})
			},

			handleDelete(index, row) {
				this.loading = true
				const uniIdToken = uni.getStorageSync('uniIdToken')

				this.$mpWeb('handleUnbundling', {
					uniIdToken: uniIdToken,
					id: row._id
				}).then(res => {
					if (res) {
						this.$notify.success({
							title: '成功',
						})
						this.handleAll()
					}
				})
			},

			handleAll() {
				this.loading = true
				const uniIdToken = uni.getStorageSync('uniIdToken')
				const uniId = uni.getStorageSync('uid')

				this.$mpWeb('queryProjectManagerAll', {
					uniIdToken: uniIdToken,
					uniId: uniId
				}).then(res => {
					if (res) {
						res.result.data.forEach(item => {
							let data = item
							data.idCard = encrypt.decodeHex(data.idCard)
							data.bankID = encrypt.decodeHex(data.bankID)
							this.tableData.push(data)
						})
						// this.tableData = res.result.data
						console.log(this.tableData)
						this.bind = true
					}
					this.loading = false
				})
			}
		},
		beforeRouteEnter(to, from, next) {
			next(mv => {
				mv.handleAll()
			})
		}
	}
</script>

<style lang="less">
	.Assign {
		width: 100%;

		.el-form {
			display: flex;

			.el-form-item {
				display: flex;
			}

			.add {}
		}


		.elTable {

			.cell {
				text-align: center;
			}
		}
	}
</style>
