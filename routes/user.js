const express = require("express")
const User = require("../models/User")
const { Show } = require("../models")
const router = express.Router()


router.use(express.json())

router.get("/", async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

router.get("/:id", async (req,res) => {
    const user = await User.findByPk(req.params.id)
    res.json(user)
})

router.get("/:id/shows", async (req, res) => {
    const userShow = await User.findByPk(req.params.id, { include: [{model: Show, as: "shows"}]})
    res.json(userShow.shows)
})

router.put("/:userId/shows/:showId", async (req, res) => {
    const user = await User.findByPk(req.params.userId)
    const show = await Show.findByPk(req.params.showId)
    if (user && show) {
        show.userId = user.id
        await show.save()
        res.json(show)
    } else {
        res.status(404).json({error: 'User and/or show not found'})
    }
})




module.exports = router