const {Router} = require('express');
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');
const {check, validationResult} = require('express-validator')
const { cloudinary } = require('../cloudinary');

const User = require('../models/User');

const router = Router();

// api/user/admin/find
router.post('/find', auth, admin, async (req, res) => {

    try {

        const telephone = req.body.telephone

        const docs = await User.find({telephone: {$regex: telephone, $options: 'i'}},"name telephone photo id")

        res.json(docs)
    } catch (e) {
        res.status(500).json({ message: "Error" })
    }

})

// api/user/admin/updateName
router.post('/updateName', auth, admin, [
        check('name', 'Name can not be empty').notEmpty()
    ],
    async (req, res) => {

        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Name can not be empty"
                })
            }

            const id = req.body.id
            const user = await User.findById(id)

            user.name = req.body.name
            await user.save()

            res.json({ name: req.body.name })

        } catch (e) {
            res.status(500).json({ message: "Error" })
        }

    })

// api/user/admin/updateAbout
router.post('/updateAbout', auth, admin, async (req, res) => {

    try {

        const id = req.body.id
        const user = await User.findById(id)

        user.description = req.body.about

        await user.save()
        res.json({ about: req.body.about })

    } catch (e) {
        res.status(500).json({ message: "Error" })
    }

})

// api/user/admin/updateImage
router.post('/updateImage', auth, admin, async (req, res) => {

    try {

        const id = req.body.id
        const user = await User.findById(id)
        const fileStr = req.body.img
        const uploadResponse = await cloudinary.uploader.upload(fileStr)
        if (user.photo) {
            await cloudinary.uploader.destroy(user.photo)
        }
        user.photo = uploadResponse.public_id
        await user.save()

        res.json({ photo: user.photo })

    } catch (e) {
        res.status(500).json({ message: "Error" })
    }

})

// api/user/admin/updateTelephone
router.post('/updateTelephone', auth, admin, [
        check('telephone', 'Incorrect Telephone').isLength({ min: 8 }).isNumeric()
    ] , async (req, res) => {

        try {

            const errors = validationResult(req);

            const language = req.body.language
            let msg
            if (language === "LV")
                msg = "Ir ievadīte nepareizi dati"
            else if (language === "RU")
                msg = "Введены неправильные данные"
            else
                msg = "Incorrect data"

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: msg
                })
            }

            const id = req.body.id
            const user = await User.findById(id)
            const telephone = req.body.telephone

            const candidate = await User.findOne({ telephone })
            if (candidate) {
                return res.status(500).json({message: "Error"})
            }

            user.telephone = telephone

            await user.save()

            res.json({ telephone: user.telephone })

        } catch (e) {
            res.status(500).json({ message: "Error" })
        }

})

// api/user/admin/updateEmail
router.post('/updateEmail', auth, admin, [
    check('email', 'Incorrect email').isEmail()
] , async (req, res) => {

    try {

        const errors = validationResult(req);

        const language = req.body.language
        let msg
        if (language === "LV")
            msg = "Ir ievadīte nepareizi dati"
        else if (language === "RU")
            msg = "Введены неправильные данные"
        else
            msg = "Incorrect data"

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: msg
            })
        }

        const id = req.body.id
        const user = await User.findById(id)
        const email = req.body.email

        const candidate = await User.findOne({ email })
        if (candidate) {
            return res.status(500).json({message: "Error"})
        }

        user.email = email

        await user.save()

        res.json({ email: user.email })

    } catch (e) {
        res.status(500).json({ message: "Error" })
    }

})


module.exports = router;