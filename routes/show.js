const express = require("express")
const Show = require("../models/Show")
const User = require("../models/User")
const router = express.Router()
const sequelize = require("../db/connection")


router.get("/", async (req, res) => {
    const shows = await Show.findAll()
     res.json({shows})
 })

 router.get("/:id", async (req,res) => {
    const show = await Show.findByPk(req.params.id)
    res.json(show)
})

router.get("/:id/users", async (req, res) => {
    const showUser = await Show.findByPk(req.params.id, { include: [{model: User, as: "users"}]})
    res.json(showUser.users)
})

router.put("/:id/available", async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    if (show) {
        show.available = req.body.available;
        await show.save();
        res.json(show);
      } else {
        res.status(404).json({ error: 'Show not found' })
}})


router.delete("/:id", async (req, res) => {
    const deleteShow = await Show.destroy({where: {id: req.params.id}})
    res.json(deleteShow)
})

router.get('/genre/:genre', async (req, res) => {
    try {
      const genre = req.params.genre;
  
      const shows = await Show.findAll({
        where: { genre: genre }
      });
  
      res.json(shows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
 module.exports = router