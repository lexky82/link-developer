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
    if(err) return res.status(400).json({ success:false, err})
    return res.status(200).json({ success:true })
  });

})

router.post('/studyPosts', (req, res) => {
  
  StudyPost.find()
  .exec((err, studyPostInfo) =>{
    if(err) return res.status(400).json({success: false, err})
    return res.status(200).json({success: true, studyInfo : studyPostInfo})
  })
})

router.get('/studyPosts_by_id', (req, res) => {

  let productIds = req.query.id
  
  let body = {
    _id : mongoose.Types.ObjectId(productIds)
  }

  //productId를 이용해서 DB에서  productId와 같은 상품의 정보를 가져온다.

  StudyPost.find(body)
      .exec((err, study) => {
          if (err) return res.status(400).send(err)
          return res.status(200).send(study)
      })

})


module.exports = router;