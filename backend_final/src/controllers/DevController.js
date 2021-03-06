const axios = require('axios');
const Dev = require('../models/utils/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(Request, Response){
        const devs = await Dev.find();

        return Response.json(devs);
    },

    async store (Request, Response)  {
        const { github_username, techs, latitude, longitude } = (Request.body);

        let devs = await Dev.findOne({github_username});

        if(!devs){
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
        const { name = login, avatar_url, bio } = apiResponse.data;
    
        const techsArray = parseStringAsArray(techs);
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };
        
        devs = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        });
        }
    
        
    
        return Response.json(devs);
    }
};