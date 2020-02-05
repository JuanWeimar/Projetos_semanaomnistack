const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(Request, Response){
        const { latitude, longitude, techs } = Request.query;

        const techsArray = parseStringAsArray(techs);

        const Devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 100000,
                },
            },
        });
        

        
        return Response.json(Devs);

    }
}