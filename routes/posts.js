const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: 'Sample Title',
            content: 'sample 123 test'
        }
    })
})

module.exports = router;


