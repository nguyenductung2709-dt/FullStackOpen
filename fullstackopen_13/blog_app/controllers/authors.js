const router = require('express').Router();
const middleware = require('../util/middleware');
const { Blog, User } = require('../models/index');
const { Op } = require('sequelize');
const { sequelize } = require('../util/db')


router.get('/', async(req, res) => {
    try {
        const authorsData = await Blog.findAll({
            attributes: [
                'author',
                [sequelize.fn('COUNT', sequelize.col('author')), 'articles'],
                [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
            ],
            group: ['author'],
            order: [
                ['likes', 'DESC']
            ]
        });
        
        const formattedData = authorsData.map(author => ({
            author: author.author,
            articles: author.getDataValue('articles')?.toString() || '0', 
            likes: author.getDataValue('likes')?.toString() || '0', 
        }));

        res.json(formattedData);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;