const express = require('express');
const Resources = require('../helpers/resources-model');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const resources = await Resources.get();
    res.status(200).json(resources);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'request could not be processed ' + error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const resource = await Resources.getById(req.params.id);
    res.status(200).json(resource);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'request could not be processed ' + error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newResource = await Resources.add({
      name,
      description
    });
    res.status(201).json(newResource);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'request could not be processed ' + error.message });
  }
});

module.exports = router;
