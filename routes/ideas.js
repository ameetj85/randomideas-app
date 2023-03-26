const express = require('express');

const router = express.Router();

const Idea = require('../models/Idea');

// get all ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({
      success: true,
      data: ideas,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error: 'Something went wrong.',
    });
  }
});

// add idea
router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.json({
      success: true,
      data: savedIdea,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: 'Something went wrong.',
    });
  }
});

// get specific idea
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({
      success: true,
      data: idea,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: 'Something went wrong.',
    });
  }
});

// update idea
router.put('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    // match the passed in user name with the idea from db
    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        {
          new: true, // if idea with the given id does not exist then it will be created
        }
      );

      return res.json({
        success: true,
        data: updatedIdea,
      });
    } else {
      // user names do not match
      return res.status(403).json({
        success: false,
        error: 'You are not authorised to update this resource.',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: 'Something went wrong.',
    });
  }
});

// delete idea
router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    // match the passed in user name with the idea from db
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({
        success: true,
        data: {},
      });
    }

    // user names do not match
    return res.status(403).json({
      success: false,
      error: 'You are not authorised to delete this resource.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: 'Something went wrong.',
    });
  }
});

module.exports = router;
