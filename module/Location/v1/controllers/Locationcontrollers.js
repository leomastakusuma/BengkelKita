import locationModels from "../models/Location_models"
import abstractBengkelKita from "../../../../library/abstractBengkelKita"

export default class Location extends abstractBengkelKita{
	constructor(router) {
		super()
		this.router = router
		this.registerRoutes()
	}
 
	registerRoutes() {
		this.router.get("/location", this.getLocation.bind(this))
		this.router.post("/location",this.postLocation.bind(this))
		this.router.put("/location/:id",this.updateLocation.bind(this))
		this.router.get("/location/:id",this.findByID.bind(this))
		this.router.delete("/location/:id",this.deleteLocation.bind(this))
	}

	getLocation(req,res){
		locationModels.getDataLocation(1,(resultData)=>{
			this.responseSuccess("Success get location",resultData,(response)=>{
				res.json(response)
			})
		})

	}

	postLocation(req,res){
		req.checkBody("name").notEmpty()
		req.checkBody("latitude").notEmpty()
		req.checkBody("longitude").notEmpty()
		req.checkBody("address").notEmpty()
		req.getValidationResult().then(function (result) {
			if (!result.isEmpty()) {
				let errors = ""
				let require =  result.array()
				require.forEach((element,index) => {
					errors  +=element.msg
					if(index >= 0 && index < require.length-1 ){
						errors  += " /n "
					}                    
				})
				this.responseFailed("Validations Errors "+errors, {}, function (response) {
					res.json(response)
				})
			} else {
				let dataResult = {"Welcome":"Post Location"}
				this.responseSuccess("Location has been save",dataResult,(response)=>{
					res.json(response)
				})		
			}
		})


	}
	updateLocation(req,res){
		let dataResult = {"Welcome":"Update Location"}
		this.responseSuccess("Location has been update",dataResult,(response)=>{
			res.json(response)
		})		

	}

	deleteLocation(req,res){
		let dataResult = {"Welcome":"API BangkelKita"}
		this.responseSuccess("Testing",dataResult,(response)=>{
			res.json(response)
		})

	}

	findByID(req,res){
		let dataResult = {"Welcome":"API BangkelKita"}
		this.responseSuccess("Testing",dataResult,(response)=>{
			res.json(response)
		})
	}
}
