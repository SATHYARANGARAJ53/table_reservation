var express = require('express')
var cors = require('cors')
var app = express()
app.use(express.json())
app.use(cors())

//connect to db
const mongoose = require('mongoose')
mongoose
    .connect('mongodb+srv://sathya:UCPKD1CiN9n5AgRX@cluster0.4jwttmw.mongodb.net/TableReservation')
    .then(console.log("connected to mongo"))


//schema
const reservationSchema = new mongoose.Schema({
    date: { type: String, required: true },
    time: { type: String, required: true },
    guest: { type: Number, required: true },
    phonenumber: { type: Number, required: true },
})

//model
let Reserve = mongoose.model("table", reservationSchema)

//get
app.get("/api", async (req, res) => {
    const reserve = await Reserve.find()
    res.json(reserve)
})
//add
app.post('/api', (req, res) => {
    try {
        const { date, time, guest, phonenumber } = req.body
        const newitem = new Reserve({ date, time, guest, phonenumber })
        newitem.save();
        res.status(200).json(newitem)
    }
    catch {
        console.error("Error adding reservation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})



//to start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server started...")
})

