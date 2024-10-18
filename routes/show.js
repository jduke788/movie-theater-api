const express = require("express")
const Show = require("../models/Show")
const router = express.Router()


router.get("/", async (req, res) => {
    const shows = await Show.findAll()
     res.json({shows})
 })


 module.exports = router