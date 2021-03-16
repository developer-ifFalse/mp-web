'use strict';
const uniID = require('uni-id')
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {companyname,uniIdToken,page,date} = event
	let res = await uniID.checkToken(uniIdToken)
	
	if(res.code === 0){
		let count = await db.collection('project_store').where({
			project_jia_info:companyname,
			revenue_date:RegExp(`^${date}`),
			project_status:3
		}).count()
		// let list = await db.collection('project_store').where({
		// 	project_jia_info:companyname
		// }).get()
		res = await db.collection('project_store').where({
			project_jia_info:companyname,
			revenue_date:RegExp(`^${date}`),
			project_status:3
		}).skip((page-1)*10).limit(10).get()
		res.count = count
	}else{
		return res
	}
	
	return res
};