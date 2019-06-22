const express = require('express')
const TeasService = require('./teas-service')
// const { requireAuth } = require('../middleware/jwt-auth')
const jsonBodyParser = express.json()
const teasRouter = express.Router()

teasRouter
    .route('/')
    .get((req, res, next) => {
        TeasService.getAllTeas(req.app.get('db')) //what to pass as second param to only get tea for specific user?
            .then(teas => {
                res.json(teas);
            })
            .catch(next)
    })


teasRouter
    .route('/:tea_id')
    // .all(requireAuth)
    .all(checkTeaExists)
    .get((req, res) => {
        res.json(res.tea)
    })


/* async/await syntax for promises */
async function checkTeaExists(req, res, next) {
    try {
        const tea = await TeasService.getTeaById(
            req.app.get('db'),
            req.params.tea_id
        )

        if (!tea)
            return res.status(404).json({
                error: `Tea doesn't exist`
            })

        res.tea = tea
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = teasRouter