const express = require('express');
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


module.exports = router;
