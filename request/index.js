import {mpWeb} from 'common/config.js'

export default function(name,data){
	// console.log(name,data)
	return mpWeb.callFunction({
		name,
		data
	}).then(res => {
		if(res.success){
			if(res.result.code === 0 || (res.result && !res.result.code)){
				return res
			}else{
				this.$notify.error({
					title:'错误',
					message:res.result.msg
				})
			}
		}else{
			this.$notify.error({
				title: '失败',
				message: res.result.msg 
			})
		}
	})
}