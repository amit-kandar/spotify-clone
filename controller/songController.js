const { addSongSchema } = require("../validator/songValidator");
const db = require('../config/database');
const { Op } = require("sequelize");

const Song = db.Song;
const Artist = db.Artist;

const AddSong = async(req, res)=>{
    let success = false;

    const { error } = addSongSchema.validate(req.body);
    if(error) return res.status(422).json({success: success, message: error.message})

    console.log(req.file);

    const info = {
        name: req.body.name,
        releasedate: req.body.releasedate,
        image: req.file.path,
        artistId: req.body.artistId,
        userId: data.id
    }

    try {
        const song = await Song.create(info);
        success = true;
        res.status(201).json({success: success, song})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

const AddRating = async(req, res) => {
    let success = false

    const info = {
        rating: req.body.rating,
        id: req.body.id
    }

    try {
        await Song.update({rating: info.rating},{where: {userId: data.id, id: info.id}})
        success = true
        res.status(200).json({rating: info.rating})
    } catch (error) {
        res.status(500).json({error: error})
    }

}

const GetSong = async(req, res) => {
    let success = false;
    const userid = data.id

    try {
        const song = await Song.findAll({where: {userId: userid}, attributes: ["name", "releasedate", "image"]})
        success = true
        res.status(200).json({success: success, Songs: song})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

const GetTop10 = async(req, res) =>{

    let success = false
    const userId = data.id

    try{

        const songs = await Song.findAll({
            limit: 10,
            where: {
                userId: userId,
                rating: {[Op.gte]: 1}
            },
            include: [{
                model: Artist,
                attributes: ["name"]
            }],
            order: [["rating", "DESC"]],
            attributes: ["id", "image", "name", "releasedate", "rating"]

        })

        success = true
        res.status(200).json({success: success, Count: songs.length, songs})

    } catch (error) {
        res.status(500).json({error: error})
    }
}

module.exports = { AddSong, GetSong, AddRating, GetTop10 }