'use strict';
const uniID = require('uni-id')
const db = uniCloud.database()
const dbCmd = db.command
const $ = dbCmd.aggregate
exports.main = async (event, context) => {

	const {
		uniIdToken,
		uid
	} = event
	let res = await uniID.checkToken(uniIdToken)
	if (res.code === 0) {
		res = await db.collection('userdata')
			.aggregate()
			.match({
				pm_company: uid
			})
			.lookup({
				from: 'project_store',
				localField: '_id',
				foreignField: 'pm_id',
				as: 'project_store'
			})
			.lookup({
				from: 'project_expend',
				localField: 'project_store._id',
				foreignField: 'projectID',
				as: 'expend'
			})
			.end() 
	}

	return res
};
