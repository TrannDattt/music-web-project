const router = require("express").Router()

const album = require("../models/album")

router.post("/save", async (req, res) => {
    const newAlbum = album ({
        name: req.body.name,
        imageURL: req.body.imageURL,
        artistId: req.body.artistId,
        artistName: req.body.artistName,
        language: req.body.language,
        viewCount: 0,
        likeCount: 0,
    })

    try {
        const savedAlbum = await newAlbum.save()
        return res.status(200).send({success : true, album : savedAlbum})
    } catch (error) {
        return res.status(400).send({success : false, message : error})
    }
})

router.get("/getOne/:id", async (req, res) => {
    const filter = {_id: req.params.id}
    const data = await album.findOne(filter)

    if(data) {
        return res.status(200).send({success : true, album : data})
    } else {
        return res.status(400).send({success : false, message : "Data not found."})
    }
})

router.get("/getAll", async (req, res) => {
    const options = {
        name: 1,
        createdAt: 1,
    }
    const data = await album.find().sort(options)

    if(data) {
        return res.status(200).send({success : true, album : data})
    } else {
        return res.status(400).send({success : false, message : "Data not found."})
    }
})

router.get("/getAllByTimeCreated", async (req, res) => {
    const options = {
        createdAt: 1,
    }
    const data = await album.find().sort(options)

    if(data) {
        return res.status(200).send({success : true, album : data})
    } else {
        return res.status(400).send({success : false, message : "Data not found."})
    }
})

router.get("/getAllByViewsCount", async (req, res) => {
    const options = {
        viewCount: 1,
    }
    const data = await album.find().sort(options)

    if(data) {
        return res.status(200).send({success : true, album : data})
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
        const result = await album.findOneAndUpdate(filter, {
            name: req.body.name,
            imageURL: req.body.imageURL,
            artistId: req.body.artistId,
            artistName: req.body.artistName,
            language: req.body.language,
            viewCount: req.body.viewCount,
            likeCount: req.body.likeCount,
        }, options)

        return res.status(200).send({success: true, data: result})
    } catch (error) {
        return res.status(400).send({success : false, message : error})
    }
})

router.delete("/delete/:id", async (req, res) => {
    const filter = {_id: req.params.id}
    const result = await album.deleteOne(filter)

    if(result) {
        return res.status(200).send({success : true, message : "Data deleted successfully", data : result})
    } else {
        return res.status(400).send({success : false, message : "Data not found."})
    }
})

module.exports = router