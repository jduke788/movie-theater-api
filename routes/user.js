const express = require("express")
const User = require("../models/User")
const router = express.Router()


router.use(express.json())

router.get("/", async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})



module.exports = router