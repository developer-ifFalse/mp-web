'use strict';
const uniID = require('uni-id')
const db = uniCloud.database()
exports.main = async (event, context) => {

	const {
		uniIdToken,
		id
	} = event

	let res = await uniID.checkToken(uniIdToken)

	if (res.code === 0) {
		res = await db.collection('userdata').where({
			_id: id
		}).update({
			pm_company: '',
			userType:'wk'
		})
		return res
	} else {
		return res
	}

};
