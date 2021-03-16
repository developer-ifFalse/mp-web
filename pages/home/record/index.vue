<template>
	<el-card v-loading="loading" style="width: 99%; margin: 0.5% 0 0 0.5%; height: 99%;">
		<view class="tag">
			<el-tag>
				总未结账:￥{{toFixed2(sum) || 0}}
			</el-tag>
		</view>
		<el-table :row-style="{height:'70px'}" :data="tableData" style="width: 100%; margin-top: 20px; ">
			<el-table-column label="预计收入" prop="income">
				<template slot-scope="props">
					{{toFixed2(props.row.income)}}
				</template>
			</el-table-column>
			<el-table-column label="项目经理" prop="pm">
			</el-table-column>
			<el-table-column label="付款方" prop="revenue_company">
			</el-table-column>
			<el-table-column label="付款方式" prop="revenue_type">
			</el-table-column>
			<el-table-column label="时间" prop="date">
			</el-table-column>
		</el-table>
		<el-pagination hide-on-single-page background prev-text="上一页" next-text="下一页" layout="prev, pager, next"
		 @current-change="handleCurrentChange" :total="total">
		</el-pagination>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				loading: true,
				total: 0,
				uid: '',
				uniIdToken: '',
				sum:0
			}
		},
		computed:{
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
			handleSearch(page = 1) {
				this.loading = true
				this.$mpWeb('toExamine', {
					uniIdToken: this.uniIdToken,
					uid: this.uid
				}).then(res => {
					if (res.result) {
						this.tableData = []
						this.sum = 0
						res.result.data.forEach(item => {
							let arr = item.income.filter((Item, index) => {
								if(Item.check_status == 2){
									this.sum += Item.income
									Item.pm = item.name
								}
								return Item.check_status == 2
							})
				
							this.tableData = [...this.tableData, ...arr]
						})
						this.total = this.tableData.length
						console.log(this.tableData)
						this.tableData = this.tableData.filter((item, index) => {
							return 10 * (page - 1) <= index && index < 10 * page
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
			handleCurrentChange(val) {
				this.handleSearch(val)
			}
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				const _this = vm
				_this.uid = uni.getStorageSync('uid')
				_this.uniIdToken = uni.getStorageSync('uniIdToken')
				_this.handleSearch()
			})
		}
	}
</script>

<style lang="less">
	.record {
		width: 100%;
	}

	.tag {
		text-align: right;
		padding-bottom: 2vw;
	}
	
	.el-pagination {
		text-align: right;
	}
</style>
