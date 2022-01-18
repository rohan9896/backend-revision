const router = require("express").Router();
const verify = require("../utils/verifyToken");

router.use(verify);

//dropdown
router.get("/genres", async(req, res) => {
    try {
        res.status(200).json({
            data: [
                'DSA',
                'Devops',
                'Cloud',
                'React',
                'Javascript',
                'Competitive Programming',
                'Machine Learning',
                'Data Science',
                'Blockchain',
                'Game Development',
                'System Design',
            ],
            success: true,
        });
    } catch (error) {
        res.status(500).json({ error, success: false });
    }
});

module.exports = router;