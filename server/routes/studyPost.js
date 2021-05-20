const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { StudyPost } = require("../models/StudyPost");

//=================================
//             studyPost
//=================================

router.post('/', (req, res) => {

  const studyPost = new StudyPost(req.body);
  studyPost.save((err) => {
    if (err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  });

})

router.post('/studyPosts', (req, res) => {
  let body = {}

  for (let key in req.body) {

    if (key === 'onOff') {
      body[key] = req.body[key]
    }

    if (req.body[key].length > 0) {
      body[key] = { $in: req.body[key] }
    }

  }
  console.log(body)

  StudyPost.find(body)
    .exec((err, studyPostInfo) => {
      if (err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true, studyInfo: studyPostInfo })
    })
})

router.get('/studyPosts_by_id', (req, res) => {

  let productIds = req.query.id

  let body = {
    _id: mongoose.Types.ObjectId(productIds)
  }

  StudyPost.find(body)
    .exec((err, study) => {
      if (err) return res.status(400).send(err)
      return res.status(200).send(study)
    })

})

module.exports = router;