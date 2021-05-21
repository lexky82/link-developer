const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const mongoose = require('mongoose');
const { auth } = require("../middleware/auth");
const multer = require("multer");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
  
  var upload = multer({ storage: storage }).single("file")
  
  router.post('/image', (req, res) => {
  
    //가져온 이미지를 저장을 해주면 된다.
    upload(req, res, err => {
        if (err) {
            return req.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
  
  })

router.post('/userlist', (req, res) => {
    let body = {}

    if (Object.keys(req.body).length > 0) {
        body = {
            skill: { $in: req.body }
        }
        console.log(body)
    }

    User.find(body)
        .exec((err, userList) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, userList: userList })
        })
})

router.post('/profile', (req, res) => {
    let body = {
        _id: mongoose.Types.ObjectId(req.body._id)
    }

    User.findOne(body)
        .exec((err, profile) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, profile: profile })
        })
})

router.put('/portfolio', (req, res) => {

    User.updateOne(
        { _id: mongoose.Types.ObjectId(req.body._id) },
        { portfolio: req.body.portfolioList },
        { upsert: true }
    )
        .then(() => {
            res.status(200).json({ success: true })
        },
            (err) => {
                console.log(err)
                res.json({ success: false, err })
            })
})


router.put('/addskill', (req, res) => {

    User.updateOne(
        { _id: mongoose.Types.ObjectId(req.body._id) },
        { $addToSet: { skill: req.body.skill } },
        { upsert: true })
        .then(() => {
            res.status(200).json({ success: true })
        },
            (err) => {
                console.log(err)
                res.json({ success: false, err })
            })

})

router.put('/removeskill', (req, res) => {

    User.updateOne(
        { _id: mongoose.Types.ObjectId(req.body._id) },
        { $pull: { skill: req.body.skill } }
    )
        .then(() => {
            res.status(200).json({ success: true })
        },
            (err) => {
                res.json({ success: false, err })
            })

})
router.put('/removeportfolio', (req, res) => {
    User.updateOne(
        { _id: mongoose.Types.ObjectId(req.body._id) },
        {$pull: { portfolio: { id: parseInt(req.body.portfolio) } }}
    )
        .then(() => {
            res.status(200).json({ success: true })
        },
            (err) => {
                console.log(err)
                res.json({ success: false, err })
            })

})


module.exports = router;
