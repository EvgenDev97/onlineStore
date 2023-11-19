const uuid = require('uuid')
const path = require('path')
const {Device} = require('../models/models')
const ApiError = require('../error/ApiError')
class DeviceController{
    async create(req,res, next){
        try{
            const {name,price,brandId,typeId, info} = req.body
            console.log(req.files)
            const {img} = req.files
            let fileName =  uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, "..", "static", fileName))

            const device = await Device.create
            ({name,price,brandId,typeId, info, img:fileName})

            return res.json(device)
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res){
        let {brandId, typeId,limit, page}  = req.query // получаем из строки запроса
        page = page || 1
        limit = limit  || 9
        let offset = page * limit - limit
        let devices;
        if(!brandId  && !typeId){
            devices = await Device.findAndCountAll({limit, offset})
        }
        if(brandId && !typeId){
            devices = await Device.findAndCountAll({where:{brandId}, limit,offset})
        }

        if(!brandId && typeId){
            devices = await  Device.findAndCountAll({where:{typeId}, limit,offset})
        }

        if(brandId && typeId){
            devices = await Device.findAndCountAll({where: {typeId, brandId}, limit,offset})
        }
        return res.json(devices)
    }

    async getOne(req,res){

    }
}

module.exports = new DeviceController()