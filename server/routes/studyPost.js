const express = require('express');
const router = express.Router();
const { Post } = require("../models/StudyPost");
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================


router.post('/', (req, res) => {

    const product = new Product(req.body);
    product.save((err) => {
      if(err) return res.status(400).json({ success:false, err})
      return res.status(200).json({ success:true })
    });
  
  })


module.exports = router;
