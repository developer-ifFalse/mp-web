<template>
	<view class="examine">
		<el-card v-loading="loading" style="width: 99%; margin: 0.5% 0 0 0.5%; height: 99%;">
			<view style="margin-top: 20px;">
				<el-button @click="handleIncome" type="primary">收入</el-button>
				<el-button @click="handleExpend" type="primary">支出</el-button>
			</view>
			<el-table :row-style="{height:'70px'}" :data="tableData" style="width: 100%; margin-top: 20px;">
				<el-table-column v-if="showIncome" label="收入" prop="income">
					<template slot-scope="props">
						{{toFixed2(props.row.income)}}
					</template>
				</el-table-column>
				<el-table-column v-if="showIncome" label="付款方" prop="revenue_company">
				</el-table-column>
				<el-table-column v-if="showIncome" label="付款方式" prop="revenue_type">
				</el-table-column>
				<el-table-column v-if="!showIncome" label="工人食宿费" prop="worker_cost">
					<template slot-scope="props">
						{{toFixed2(props.row.worker_cost)}}
					</template>
				</el-table-column>
				<el-table-column v-if="!showIncome" label="钻机运费" prop="drill_freight">
					<template slot-scope="props">
						{{toFixed2(props.row.drill_freight)}}
					</template>
				</el-table-column>
				<el-table-column v-if="!showIncome" label="燃油费" prop="fuel_oil">
					<template slot-scope="props">
						{{toFixed2(props.row.fuel_oil)}}
					</template>
				</el-table-column>
				<el-table-column v-if="!showIncome" label="配件费用" prop="parts_cost">
					<template slot-scope="props">
						{{toFixed2(props.row.parts_cost)}}
					</template>
				</el-table-column>
				<el-table-column label="发票" prop="vouchers">
					<template slot-scope="scope">
						<el-image style="max-height: 70px; max-width: 70px;" :src="scope.row.vouchers[0]" :preview-src-list="scope.row.vouchers">
						</el-image>
					</template>
				</el-table-column>
				<el-table-column label="时间" prop="date">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">通过</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">不通过</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination hide-on-single-page background prev-text="上一页" next-text="下一页" layout="prev, pager, next"
			 @current-change="handleCurrentChange" :total="total" :page-size="8">
			</el-pagination>
		</el-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				loading: true,
				showIncome: true,
				uid: '',
				uniIdToken: '',
				total: 0
			}
		},
		computed: {
			toFixed2: function() {
				return function(val) {
					if (val) {
						return (+val).toFixed(2)
					} else {
						return 0
					}
				}
			}
		},
		methods: {
			handleEdit(index, row) {
				const type = this.showIncome ? 1 : 0
				this.handleToExamine(row, type, 1)
			},
			handleDelete(index, row) {
				const type = this.showIncome ? 1 : 0
				this.handleToExamine(row, type, 0)
			},
			handleToExamine(row, type, state) {
				this.loading = true
				this.$mpWeb('Approved', {
					projectID: row.projectID,
					uniIdToken: this.uniIdToken,
					row: row,
					type: type,
					state: state,
					date: new Date().getFullYear(),
					uid: this.uid,
				}).then(res => {
					if (res.result) {
						if (this.showIncome) {
							this.handleIncome()
						} else {
							this.handleExpend()
						}
						this.$notify.success({
							title: '成功'
						})
					} else {
						this.$notify.error({
							title: '错误',
							message: res.result.msg
						})
					}
				})
			},
			handleIncome(e, page = 1) {
				this.loading = true
				this.$mpWeb('toExamine', {
					uniIdToken: this.uniIdToken,
					uid: this.uid
				}).then(res => {
					console.log(res)
					if (res.result) {
						this.showIncome = true
						this.tableData = []
						console.log(this.tableData)
						res.result.data.forEach(item => {
							let arr = item.income.filter((Item, index) => {
								return Item.check_status == -1
							})
							this.tableData = [...this.tableData, ...arr]
						})
						console.log(this.tableData)
						this.total = this.tableData.length
						this.tableData = this.tableData.filter((item, index) => {
							return 8 * (page - 1) <= index && index < 8 * page
						})
					} else {
						this.$notify.error({
							title: '错误',
							message: res.result.msg
						})
					}
					this.loading = false
				})
			},

			handleExpend(e, page = 1) {
				this.loading = true
				this.$mpWeb('toExpend', {
					uniIdToken: this.uniIdToken,
					uid: this.uid
				}).then(res => {
					if (res.result) {
						this.showIncome = false
						this.tableData = []
						res.result.data.forEach(item => {
							let arr = item.expend.filter((Item, index) => {
								return Item.check_status == -1
							})

							this.tableData = [...this.tableData, ...arr]
						})

						this.total = this.tableData.length
						this.tableData = this.tableData.filter((item, index) => {
							return 8 * (page - 1) <= index && index < 8 * page
						})
						console.log(this.tableData)
					} else {
						this.$notify.error({
							title: '错误',
							message: res.result.msg
						})
					}
					this.loading = false
				})
			},
			handleCurrentChange(val) {
				this.showIncome ? this.handleIncome(0, val) : this.handleExpend(0, val)
			},
		},
		beforeRouteEnter(to, from, next) {
			next(_this => {
				_this.uid = uni.getStorageSync('uid')
				_this.uniIdToken = uni.getStorageSync('uniIdToken')
				_this.handleIncome()
			})
		}
	}
</script>

<style lang="less">
	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}

	.examine {
		width: 100%;

		.top {
			margin-top: 20px;
		}

		.el-pagination {
			text-align: right;

		}
	}
</style>
