import { Location_models } from "../models/Location_models"
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
		this.getModelLocation().getAllLocation((resultData) => {
			this.responseSuccess("Success get location", resultData, (response) => {
				res.json(response)
			})
		})

	}

	/**
	 * @description create Location
	 * @param {name,latitude,longitude} req 
	 */
	postLocation(req, res) {
		let validation = []
		let errors = []
		validation.push((typeof (req.body.name) != "undefined")  ?  true : "name is required" )
		validation.push((typeof (req.body.latitude) != "undefined") ? true : "latitude is required")
		validation.push((typeof (req.body.longitude) != "undefined") ? true : "longitude is required")
		validation.forEach(element => {
			if (element != true) {
				errors.push(element+"\n")
			}
		})

		if (errors.length > 0) {
			this.responseValidation("Validation Errors : "+errors, (response) => {
				res.json(response)
			})
		} else {
			let Params = {
				"name": req.body.name,
				"latitude": req.body.latitude,
				"longitude": req.body.longitude,
				"address": req.body.address
			}
			this.getModelLocation().saveLocation(Params, (insertLocation) => {
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
	/**
	 * @description update Location
	 * @param {*} req 
	 * @param {*} res 
	 */
	updateLocation(req, res) {
		let validation = []
		let errors = []
		validation.push((typeof (req.body.name) != "undefined")  ?  true : "name is required" )
		validation.push((typeof (req.body.latitude) != "undefined") ? true : "latitude is required")
		validation.push((typeof (req.body.longitude) != "undefined") ? true : "longitude is required")
		validation.forEach(element => {
			if (element != true) {
				errors.push(element+"\n")
			}
		})

		if (errors.length > 0) {
			this.responseValidation("Validation Errors : "+errors, (response) => {
				res.json(response)
			})
		} else {
			let params = {
				"name": req.body.name,
				"latitude": req.body.latitude,
				"longitude": req.body.longitude,
				"address": req.body.address,
				"uid" : req.params.uid
			}

			this.getModelLocation().updateLocation(params,(resultUpdate)=>{
				if(resultUpdate.affectedRows > 0){
					this.responseSuccess("Location has been update", {}, (response) => {
						res.json(response)
					})
				}else{
					this.responseFailUpdate((response) => {
						res.json(response)
					})
				}

			})
		}

	}

	/**
	 * @description delete Location ByID
	 * @param {*} req 
	 * @param {*} res 
	 */
	deleteLocation(req, res) {
		let dataResult = {
			"Welcome": "API BangkelKita"
		}
		this.responseSuccess("Testing", dataResult, (response) => {
			res.json(response)
		})

	}

	/**
	 * @description get Location ByID
	 * @param {uid} req 
	 */
	findByID(req, res) {
		let validation = []
		let errors = []

		validation.push((isNaN(req.params.uid) != true)  ? true : "uid must be INT")
		validation.forEach(element => {
			if (element !=true) {
				errors.push(element)
			}
		})

		if (errors.length > 0) {
			this.responseValidation("Validation errors : "+errors, (response) => {
				res.json(response)
			})
		} else {
			this.getModelLocation().getLocationByID(req.params.uid, resultData => {
				if (resultData.length) {
					this.responseSuccess("Success get location", resultData[0], (response) => {
						res.json(response)
					})
				} else {
					this.responseNotFound("UID Location not found", NotFound => {
						res.json(NotFound)
					})
				}

			})
		}
	}

	/**
	 * @description get Model Location
	 */
	getModelLocation(){
		let locationModels = new Location_models()
		return locationModels
	}
}