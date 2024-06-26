const router = require("express").Router()

const user = require("../models/user")

const admin = require("../config/firebase.config")

router.get("/login", async(req, res) => {
    if(!req.headers.authorization) {
        return res.status(500).send({message : "Invalid Token!"})
    } else {
        // Reset token ?
        const token = req.headers.authorization.split(" ")[1]
        try {
            const decodeValue = await admin.auth().verifyIdToken(token)
            if(!decodeValue) {
                return res.status(505).json({message : "Unauthorized"})
            } else {
                // Check if user exist or not
                const userExist = await user.findOne({"user_id" : decodeValue.user_id})
                if(!userExist) {
                    newUserData(decodeValue, req, res)
                } else {
                    updateNewUserData(decodeValue, req, res)
                }
            }
        } catch (error) {
            return res.status(505).json({message : error})
        }
    }
})

const newUserData = async(decodeValue, req, res) => {
    const newUser = new user({
        name : decodeValue.name,
        email : decodeValue.email,
        password : decodeValue.password,
        imageURL : decodeValue.picture,
        premium : decodeValue.premium,
        user_id : decodeValue.user_id,
        email_verified : decodeValue.email_verified,
        role : "member",
        auth_time : decodeValue.auth_time
    })

    try {
        const savedUser = await newUser.save()
        res.status(200).send({user : savedUser})
    } catch (error) {
        res.status(400).send({success : false, message : error})
    }
}

const updateNewUserData = async(decodeValue, req, res) => {
    const filter = {user_id : decodeValue.user_id}

    const options = {
        upsert : true,
        new : true,
    }

    try {
        const result = await user.findOneAndUpdate(
            filter,
            {auth_time : decodeValue.auth_time},
            options,
        )
        res.status(200).send({user : result})
    } catch (error) {
        res.status(400).send({success : false, message : error})
    }
}

router.get("/getOne/:userId", async (req, res) => {
    const filter = {_id: req.params.userId}
    const data = await user.findOne(filter)

    if(data) {
        return res.status(200).send({success : true, data : data})
    } else {
        return res.status(400).send({success : false, message : "Data not found."})
    }
})

router.get("/getAllUsers", async (req, res) => {
    const options = {
        name: 1,
        createdAt: 1,
    }
    const cursor = await user.find().sort(options)

    if(cursor) {
        return res.status(200).send({success : true, data : cursor})
    } else {
        return res.status(400).send({success : false, message : "Data not found."})
    }
})

router.put("/updateRole/:userId", async (req, res) => {
    const filter = {_id: req.params.userId}
    const role = req.body.data.role

    try {
        const result = await user.findOneAndUpdate(filter, {role: role})
        return res.status(200).send({success: true, user: result})
    } catch (error) {
        return res.status(400).send({success : false, message : error})
    }
})

router.delete("/deleteUser/:id", async (req, res) => {
    const filter = {_id: req.params.userId}
    const result = await user.deleteOne(filter)

    if(result.deletedCount) {
        return res.status(200).send({success : true, message : "User deleted successfully"})
    } else {
        return res.status(400).send({success : false, message : "User not found."})
    }
})

module.exports = router