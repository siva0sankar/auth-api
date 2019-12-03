const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');




router.post('/register', async (req, res) => {

    //  Validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details)

    // Checking user is already exist 
    const emailExist = await User.findOne({ email: res.body.email });
    if (emailExist) return res.status(400).send('Email already exists.');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    //  Validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details)

    // Checking user is already exist 
    const user = await User.findOne({ email: res.body.email });
    if (!user) return res.status(400).send('Email not exists.');

    //Compare password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token);

});
module.exports = router;