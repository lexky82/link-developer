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

router.post('/removepost', (req, res) =>{

  console.log(req.body)

  StudyPost.deleteOne({ _id : req.body._id})
  .then(() => {
    res.status(200).json({ success: true })
},
    (err) => {
        console.log(err)
        res.json({ success: false, err })
    })
  .catch((err) => {
    console.log(err)
  })
})

module.exports = router;