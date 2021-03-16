'use strict';
const uniID = require('uni-id')
const db = uniCloud.database()
exports.main = async (event, context) => {
	
	const { uniIdToken,code='' } = event
	let res = await uniID.checkToken(uniIdToken)
	
	if(res.code === 0){
		res = await db.collection('userdata').where({
			wkID:code
		}).get()
	}

	return res
};
