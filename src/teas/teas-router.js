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
                res.json(teas);  //res.json(teas.map(seralizeTea))
            })
            .catch(next)
    })
    .post(jsonBodyParser, (req, res, next) => {
        const { teaname, brand, type, packaging, notes } = req.body
        const newTea = { teaname, brand, type, packaging, notes }

        for (const [key, value] of Object.entries(newTea))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })

        TeasService.insertTea(req.app.get('db'), newTea)
            .then(tea => {
                return res
                    .location(`/teas/${tea.id}`)
                    .json(tea)
            })
            .catch(next)
    })



teasRouter
    .route('/:tea_id')
    // .all(requireAuth)
    .all(checkTeaExists)
    .get((req, res, next) => {
        res.json(res.tea)
    })

teasRouter
    .route('/:tea_id')//how to incorporate checkTeaExists?
    .patch(jsonBodyParser, (req, res, next) => {
        const { teaname, brand, type, packaging, notes } = req.body
        const updatedTea = { teaname, brand, type, packaging, notes }

        TeasService.updateTea(req.app.get('db'), req.params.tea_id, updatedTea)
            .then(tea => {
                return res
                    .location(`/teas/${tea.id}`)
                    .json(tea)
            })
            .catch(next)
    })

teasRouter
    .route('/:tea_id') //how to incorporate checkTeaExists?
    .delete((req, res, next) => {
        TeasService.deleteTea(req.app.get('db'), req.params.tea_id)
            .then(() => {
                return res
                    .status(200)
                    .json('deleted')
            })
            .catch(next)
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