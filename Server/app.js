require("dotenv/config")

const express = require("express")
const cors = require("cors")
const {default : mongoose} = require("mongoose")

const app = express()

// app.use(cors({origin : true}))

app.get("/", (req, res) => {
    return res.json("Hello World!")
})

const userRoute = require("./routes/auth")
app.use("/api/users/", userRoute)

mongoose.connect(process.env.DB_STRING, {useNewUrlParser : true})

mongoose.connection
.once("open", () => console.log("Connected!"))
.on("error", (err) => {
    console.log(`ERROR : ${err}`)
})

app.listen(4000, () => console.log("Listening to port 4000....."))