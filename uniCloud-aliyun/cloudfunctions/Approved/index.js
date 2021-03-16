'use strict';
const uniID = require('uni-id')
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		uniIdToken,
		projectID,
		row,
		type,
		state,
		date,
		uid
	} = event
	let res = await uniID.checkToken(uniIdToken)
	if (res.code === 0) {
		if (type) {
			if (state) {
				res = await db.collection('project_store').doc(projectID).update({
					money: row.income,
					revenue_company: row.revenue_company,
					revenue_type: row.revenue_type,
					revenue_date: date.toString(),
				})

				res = await db.collection('uni-id-users').where({
					_id: uid,
					Income_and_expenditure: {
						year: date
					}
				}).get()
				

				let a = {
					year: date
				}
				if (res.data.length > 0) {
					a = res.data[0].Income_and_expenditure.filter(item => {
						return item.year == date
					})[0]
					
					if(!a.total_income){
						a.total_income = 0
					}
					
					a.total_income = +a.total_income
					a.total_income += +row.income
				}else{
					a.total_income = row.income
				}

				res = await db.collection('uni-id-users').doc(uid).update({
					Income_and_expenditure: dbCmd.pull({
						year: date
					})
				})

				res = await db.collection('uni-id-users').doc(uid).update({
					Income_and_expenditure: dbCmd.unshift(a)
				})


				res = await db.collection('project_income').doc(row._id).update({
					check_status: 1
				})
			} else {
				res = await db.collection('project_income').doc(row._id).update({
					check_status: 0
				})
			}
		} else {
			if (state) {
				res = await db.collection('project_store').doc(projectID).update({
					project_expend: dbCmd.push({
						worker_cost: row.worker_cost,
						drill_freight: row.drill_freight,
						fuel_oil: row.fuel_oil,
						parts_cost: row.parts_cost,
						date: date.toString()
					})
				})
				
				res = await db.collection('uni-id-users').where({
					_id: uid,
					Income_and_expenditure: {
						year: date
					}
				}).get()
				
				let a = {
					year: date
				}
				
				if (res.data.length > 0) {
					a = res.data[0].Income_and_expenditure.filter(item => {
						return item.year == date
					})[0]
					if(!a.total_expend){
						a.total_expend = 0
					}
					
					a.total_expend = +a.total_expend
					a.total_expend += (+row.worker_cost + +row.drill_freight + +row.fuel_oil + +row.parts_cost)
				}else{
					a.total_expend = (+row.worker_cost + +row.drill_freight + +row.fuel_oil + +row.parts_cost)
				}
				
				res = await db.collection('uni-id-users').doc(uid).update({
					Income_and_expenditure: dbCmd.pull({
						year: date
					})
				})
				
				res = await db.collection('uni-id-users').doc(uid).update({
					Income_and_expenditure: dbCmd.unshift(a)
				})

				res = await db.collection('project_expend').doc(row._id).update({
					check_status: 1
				})
			} else {
				res = await db.collection('project_expend').doc(row._id).update({
					check_status: 0
				})
			}
		}


	} else {
		return res
	}
	return res
};
