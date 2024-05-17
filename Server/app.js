require("dotenv/config")

const express = require("express")
const cors = require("cors")
const {default : mongoose} = require("mongoose")

const app = express()

app.use(cors({origin : true}))
app.use(express.json())

app.get("/", (req, res) => {
    return res.json("Hello World!")
})

// User authentication route
const userRoute = require("./routes/auth")
app.use("/api/users/", userRoute)

// Songs route
const songRoute = require("./routes/songs")
app.use("/api/songs/", songRoute)

// Artist route
const artistRoute = require("./routes/artists")
app.use("/api/artists/", artistRoute)

// Album route
const albumRoute = require("./routes/albums")
app.use("/api/albums/", albumRoute)

mongoose.connect(process.env.DB_STRING, {useNewUrlParser : true})

mongoose.connection
.once("open", () => console.log("Connected!"))
.on("error", (err) => {
    console.log(`ERROR : ${err}`)
})

app.listen(4000, () => console.log("Listening to port 4000....."))