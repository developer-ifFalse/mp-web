'use strict';
const uniID = require('uni-id')
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {uid,uniIdToken} = event
	let res = await uniID.checkToken(uniIdToken)
	if(res.code === 0){
		res = await db.collection('uni-id-users').where({
			_id:uid
		}).get()
	}else{
		return res
	}
	return res
};
