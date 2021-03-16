<template>
	<view class="settlement">
		<el-card class="card">
			<view class="yearSelect">
				<template>
					<el-select @change="handleSearch" v-model="dateYear" placeholder="请选择">
						<el-option v-for="item in options" :key="item" :label="item" :value="item">
						</el-option>
					</el-select>
				</template>
			</view>
			<view class="tag">
				<el-tag>
					总收入:￥{{toFixed2(Income_and_expenditure.total_income)}}
				</el-tag>
				<el-tag type="danger" style="margin-left: 10px;">
					总支出:￥{{toFixed2(Income_and_expenditure.total_expend)}}
				</el-tag>
			</view>
			<el-table height="749px" v-loading="loading" :row-style="{height:'70px'}" class="table" :data="tableData">
				<el-table-column type="expand" style='display: flex;'>
					<template slot-scope="props">
						<div>
							<h2>支出：</h2>
							<el-table border :data="props.row.project_expend" style="width: 100%">
								<el-table-column prop="worker_cost" label="工人食宿费" width="180"></el-table-column>
								<el-table-column prop="drill_freight" label="配件费用" width="180"></el-table-column>
								<el-table-column prop="fuel_oil" label="燃油费"></el-table-column>
								<el-table-column prop="parts_cost" label="钻机运费"></el-table-column>
								<el-table-column prop="date" label="日期"></el-table-column>
							</el-table>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="project_name" label="项目名" width="180">
				</el-table-column>
				<el-table-column prop="project_address" label="地址">
				</el-table-column>
				<el-table-column prop="project_jia_info" label="甲方">
				</el-table-column>
				<el-table-column prop="project_expend" label="支出" width="180">
					<template slot-scope="props">
						{{toFixed2(project_expend(props))}}
					</template>
				</el-table-column>
				<el-table-column label="收入" width="180">
					<template slot-scope="scope">
						<el-popover trigger="hover" placement="top">
							<p>付款方:{{scope.row.revenue_company}}</p>
							<p>收款方式:{{scope.row.revenue_type}}</p>
							<p>收款日期:{{scope.row.revenue_date}}</p>
							<div slot="reference">
								{{ toFixed2(scope.row.money) }}
							</div>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column prop="project_begin_date" label="开始时间">
				</el-table-column>
				<el-table-column prop="project_end_date" label="结束时间">
				</el-table-column>
			</el-table>
			<el-pagination hide-on-single-page background prev-text="上一页" next-text="下一页" layout="prev, pager, next"
			 @current-change="handleCurrentChange" :total="total">
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
				total: 0,
				companyname: '',
				Income_and_expenditure: {},
				Income_and_expenditure_list: [],
				options: [],
				year: '',
				dateYear: ''
			}
		},
		methods: {
			handleSearch(val) {
				this.loading = true
				this.dateYear = val
				const uniIdToken = uni.getStorageSync('uniIdToken')

				this.$mpWeb('settlement', {
					companyname: this.companyname,
					page: 1,
					date: this.dateYear,
					uniIdToken: uniIdToken,
				}).then(res => {
					if (res) {
						this.tableData = res.result.data
						this.total = res.result.count.total

						this.Income_and_expenditure = this.Income_and_expenditure_list.filter(item => {
							return item.year == this.dateYear
						})[0]
						// this.Income_and_expenditure = this.Income_and_expenditure.length ? this.Income_and_expenditure : {}
					}
					this.loading = false
				})
			},
			handleCurrentChange(val) {
				this.loading = true
				const uniIdToken = uni.getStorageSync('uniIdToken')
				this.$mpWeb('settlement', {
					companyname: this.companyname,
					page: val,
					uniIdToken: uniIdToken,
					date: this.dateYear
				}).then(res => {
					if (res) {
						this.tableData = res.result.data
						this.total = res.result.count.total
					}
					this.loading = false
				})
			},
			resetSearch() {
				this.queryParam = {}
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
		},
		computed: {
			project_expend: function() {

				return function(props) {

					let sum = 0
					props.row.project_expend.forEach(item => {
						sum += +item.drill_freight + +item.fuel_oil + +item.parts_cost + +item.worker_cost
					})
					return sum.toFixed(2)
				}
			},
			toFixed2:function(){
				return function(val){
					
					if(val){
						return (+val).toFixed(2)
					}else{
						return 0
					}
					
				}
			}
		},
		beforeRouteEnter(to, from, next) {
			// console.log('sss')
			next(vm => {
				// 通过 `vm` 访问组件实例
				const uid = uni.getStorageSync('uid')
				const uniIdToken = uni.getStorageSync('uniIdToken')
				vm.dateYear = new Date().getFullYear()
				// console.log(uid+'+++++'+uniIdToken)
				vm.$mpWeb('searchUser', {
					uid: uid,
					uniIdToken: uniIdToken,
				}).then(res => {
					if (res) {
						console.log(1)
						vm.companyname = res.result.data[0].companyname
						vm.Income_and_expenditure_list = res.result.data[0].Income_and_expenditure
						// console.log(res.result.data)
						vm.options = vm.Income_and_expenditure_list?.reduce((prev, cur) => {
							prev.push(cur.year)
							return prev
						}, [])
						// console.log(vm.options)

						vm.Income_and_expenditure = res.result.data[0].Income_and_expenditure?.filter(item => {
							return item.year == new Date().getFullYear()
						})[0]
						vm.Income_and_expenditure = vm.Income_and_expenditure?vm.Income_and_expenditure:{}
						vm.$mpWeb('settlement', {
							companyname: res.result.data[0].companyname,
							page: 1,
							uniIdToken: uniIdToken,
							date: vm.dateYear
						}).then(res => {
							if (res) {
								console.log(2)
								vm.tableData = res.result.data
								vm.total = res.result.count.total
							}
							vm.loading = false
						})
					}
				})
			})
		}
	}
</script>

<style lang="less">
	.settlement {
		width: 100%;

		.card {
			width: 99%;
			margin: 0.5% 0 0 0.5%;
			height: 99%;
			// overflow: scroll;

			.yearSelect {
				float: left;
			}

			.tag {
				text-align: right;
				padding-bottom: 2vw;
			}

			.table {
				text-align: center;


				.demo-table-expand label {
					width: 90px;
					color: #99a9bf;
				}

				.demo-table-expand .el-form-item {
					margin-right: 0;
					margin-bottom: 0;
					width: 50%;
				}

			}

			.el-pagination {
				text-align: right;
			}

		}
	}
</style>
