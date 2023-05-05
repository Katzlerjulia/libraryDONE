const express = require('express');
const router = express.Router();
const controller = require('../controllers/customerController');

router.get("/all", async (req, res) => {

    await controller.get(req, res);
});

router.get("/search", async (req, res) => {

    console.log(req.query);

    await controller.search(req, res);
});

// lägger till get request för add customers
router.post("/add", async (req, res) => {
  console.log(req.query);

  await controller.add(req, res);

  res.sendStatus(200);
});

router.put("/edit", async (req, res) => {

    await controller.edit(req, res);
    console.log(req.body);
});

// DELETE
router.delete("/remove", async (req, res) => {
  await controller.remove(req, res);

  res.sendStatus(200);
});

module.exports = router;
