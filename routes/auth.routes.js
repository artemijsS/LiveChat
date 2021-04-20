const {Router} = require('express');
const config = require('config');
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = Router();


// api/auth/register
router.post('/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimal length - 6 symbols').isLength({ min: 6 }),
        check('telephone', 'Incorrect Telephone').isLength({ min: 8 }).isNumeric(),
        check('name', 'Incorrect name').notEmpty()
    ],
    async (req, res) => {

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect data on registration"
                })
            }

            const {telephone, name, email, password} = req.body

            // E-mail check
            let candidate = await User.findOne({ email })
            if (candidate)
                return res.status(400).json({ message: "User with this email is already registered" })

            // Telephone check
            candidate = await User.findOne({ telephone })
            if (candidate)
                return res.status(400).json({ message: "User with this telephone is already registered" })

            const hashedPass = await bcrypt.hash(password, 12)
            const user = new User({
                telephone,
                name,
                email,
                password: hashedPass,
                status: true
            });

            await user.save();

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '2h' }
            );

            res.json({ token, userId: user.id, user })

        } catch (e) {
            res.status(500).json({ message: "Error" })
        }

    })

// api/auth/login
router.post('/login',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimal length - 6 symbols').isLength({ min: 6 })
    ],
    async (req, res) => {

        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect data on login"
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({ email })

            if (!user)
                return res.status(400).json({ message: "User not found" })

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch)
                return res.status(400).json({ message: "Incorrect data on login"})

            user.status = true
            await user.save()

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '2h' }
            );

            res.json({ token, userId: user.id, user })

        } catch (e) {
            res.status(500).json({ message: "Error" })
        }
    })

module.exports = router;