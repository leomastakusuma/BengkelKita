import locationModels from "../models/Location_models"
import abstractBengkelKita from "../../../../library/abstractBengkelKita"


export default class Location extends abstractBengkelKita {
	constructor(router) {
		super()
		this.router = router
		this.registerRoutes()
	}

	registerRoutes() {
		this.router.get("/location", this.getLocation.bind(this))
		this.router.post("/location", this.postLocation.bind(this))
		this.router.put("/location/:uid", this.updateLocation.bind(this))
		this.router.get("/location/:uid", this.findByID.bind(this))
		this.router.delete("/location/:uid", this.deleteLocation.bind(this))
	}

	getLocation(req, res) {
		locationModels.getAllLocation((resultData) => {
			this.responseSuccess("Success get location", resultData, (response) => {
				res.json(response)
			})
		})

	}

	postLocation(req, res) {
		let validation = []
		let errors = []
		validation.push((typeof (req.body.name) != "undefined") ? true : false)
		validation.push((typeof (req.body.latitude) != "undefined") ? true : false)
		validation.push((typeof (req.body.longitude) != "undefined") ? true : false)
		validation.forEach(element => {
			if (element == false) {
				errors.push(false)
			}
		})

		if (errors.length > 0) {
			this.responseValidation("Opps please check your input data.", (response) => {
				res.json(response)
			})
		} else {
			let Params = {
				"name": req.body.name,
				"latitude": req.body.latitude,
				"longitude": req.body.longitude,
				"address": req.body.address
			}
			locationModels.saveLocation(Params, (insertLocation) => {
				if (insertLocation.affectedRows > 0) {
					this.responseSuccess("Location has been save.", {}, (successCreateLocation) => {
						res.json(successCreateLocation)
					})
				} else {
					this.responseFailed("Failed create locations", {}, (failCreadLocation) => {
						res.json(failCreadLocation)
					})
				}

			})

		}



	}
	updateLocation(req, res) {
		let dataResult = {
			"Welcome": "Update Location"
		}
		this.responseSuccess("Location has been update", dataResult, (response) => {
			res.json(response)
		})

	}

	deleteLocation(req, res) {
		let dataResult = {
			"Welcome": "API BangkelKita"
		}
		this.responseSuccess("Testing", dataResult, (response) => {
			res.json(response)
		})

	}

	findByID(req, res) {
		let validation = []
		let errors = []
		validation.push((typeof (req.params.uid) != "undefined") ? true : false)
		validation.forEach(element => {
			if (element == false) {
				errors.push(false)
			}
		})

		if (errors.length > 0) {
			this.responseValidation("Opps please check your params data.", (response) => {
				res.json(response)
			})
		} else {
			locationModels.getLocationByID(req.params.uid,resultData => {
				if(resultData.length){
					this.responseSuccess("Success get location", resultData[0], (response) => {
						res.json(response)
					})
				}else{
					this.responseNotFound("UID Location not found",NotFound=>{
						res.json(NotFound)
					})	
				}

			})
		}
	}
}