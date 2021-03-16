<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
	*{
		margin: 0;
		padding: 0;
		font-size: 16px;
	}
	
	.el-form-item__label{
		font-size: 18px !important;
	}
	.el-popper{
		/* text-align: center !important; */
		padding: 0 !important;
	}
</style>
