const router = require("express").Router()

const album = require("../models/album")
const artist = require("../models/artist")
const song = require("../models/song")

router.post("/save", async (req, res) => {
    const newSong = song ({
        name: req.body.name,
        imageURL: req.body.imageURL,
        songURL: req.body.songURL,
        albumId: req.body.albumId,
        albumName: req.body.albumName,
        artistId: req.body.artistId,
        artistName: req.body.artistName,
        language: req.body.language,
        category: req.body.category,
        viewCount: req.body.viewCount,
    })

    try {
        const savedSong = await newSong.save()
        return res.status(200).send({success : true, song : savedSong})
    } catch (error) {
        return res.status(400).send({success : false, message : error})
    }
})

router.get("/getOne/:id", async (req, res) => {
    const filter = {_id: req.params.id}
    const data = await song.findOne(filter)

    if(data) {
        return res.status(200).send({success : true, song : data})
    } else {
        return res.status(400).send({success : false, message : "Data not found."})
    }
})

router.get("/getAll", async (req, res) => {
    const options = {
        name: 1,
        createdAt: 1,
    }
    const data = await song.find().sort(options)

    if(data) {
        return res.status(200).send({success : true, song : data})
    } else {
        return res.status(400).send({success : false, message : "Data not found."})
    }
})

router.get("/getAllByViewsCount", async (req, res) => {
    const options = {
        viewCount: 1,
    }
    const data = await song.find().sort(options)

    if(data) {
        return res.status(200).send({success : true, song : data})
    } else {
        return res.status(400).send({success : false, message : "Data not found."})
    }
})

router.get("/getAllByTimeCreated", async (req, res) => {
    const options = {
        createdAt: 1,
    }
    const data = await song.find().sort(options)

    if(data) {
        return res.status(200).send({success : true, song : data})
    } else {
        return res.status(400).send({success : false, message : "Data not found."})
    }
})

router.put("/update/:id", async (req, res) => {
    const filter = {_id: req.params.id}
    const options = {
        upsert: true,
        new: true,
    }

    try {
        const result = await song.findOneAndUpdate(filter, {
            name: req.body.name,
            imageURL: req.body.imageURL,
            songURL: req.body.songURL,
            albumId: req.body.albumId,
            albumName: req.body.albumName,
            artistId: req.body.artistId,
            artistName: req.body.artistName,
            language: req.body.language,
            category: req.body.category,
            viewCount: req.body.viewCount,
        }, options)

        return res.status(200).send({success: true, data: result})
    } catch (error) {
        return res.status(400).send({success : false, message : error})
    }
})

router.delete("/delete/:id", async (req, res) => {
    const filter = {_id: req.params.id}
    const result = await song.deleteOne(filter)

    if(result) {
        return res.status(200).send({success : true, message : "Data deleted successfully", data : result})
    } else {
        return res.status(400).send({success : false, message : "Data not found."})
    }
})

module.exports = router