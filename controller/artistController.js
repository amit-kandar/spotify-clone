const { addartistSchema } = require("../validator/artistValidator")
const db = require('../config/database')
const { Op } = require("sequelize")
const Artist = db.Artist
const Song = db.Song

const AddArtist = async(req, res) => {
    let success = false

    const { error } = await addartistSchema.validate(req.body);
    if (error) return res.status(422).json({success: success, error: error})

    const info = {
        name: req.body.name,
        dob: req.body.dob,
        bio: req.body.bio,
        userId: data.id
    }

    try {

        const artist = await Artist.create(info)
        success = true
        res.status(200).json({success: success, Artists: artist})
        
    } catch (error) {
        res.status(500).json({error: error})
    }
}

const GetArtists = async(req, res)=> {
    let success = false;
    try {
        const artists = await Artist.findAll({where: {userId: data.id}})
        success = true
        res.status(200).json({success: success, Artists: artists})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

const GetTop10 = async(req, res)=>{
    let success = false
    const userId = data.id

    try{

        const artist = await Artist.findAll({
            where: {
                userId: userId
            },
            include: [{
                model: Song,
                attributes: ["name", "rating"],
                where:{rating: {[Op.gte]: 1}}
            }],
            order: [[Song, "rating", "DESC"]],
            attributes: ["id","name", "dob"],
            limit: 10

        })

        success = true
        res.status(200).json({success: success, Count: artist.length, artist})

    } catch (error) {
        res.status(500).json({error: error})
    }
}

module.exports = { AddArtist, GetArtists, GetTop10 }