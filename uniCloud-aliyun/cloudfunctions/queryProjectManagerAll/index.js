'use strict';
const uniID = require('uni-id')
const db = uniCloud.database()
exports.main = async (event, context) => {
	const { uniIdToken, uniId } = event
	
	let res = await uniID.checkToken(uniIdToken)
	if(res.code === 0){
		res = db.collection('userdata').where({
			pm_company:uniId
		}).get()
		return res
	}else{
		return res
	}
	
};
