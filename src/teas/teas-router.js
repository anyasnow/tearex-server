const express = require('express')
const TeasService = require('./teas-service')
const { requireAuth } = require('../middleware/jwt-auth')
const jsonBodyParser = express.json()
const teasRouter = express.Router()


teasRouter
    .route('/:user_id')
    // .all(requireAuth)
    .get((req, res, next) => {
        console.log(req.params)
        TeasService.getAllTeasbyUser(req.app.get('db'), req.params.user_id)
            .then(teas => {
                res.json(teas);  //res.json(teas.map(TeasService.seralizeTea))
            })
            .catch(next)
    });


teasRouter
    .route('/:user_id')
    .post(jsonBodyParser, (req, res, next) => {
        const { user_id } = req.params;
        const { teaname, brand, type, packaging, notes } = req.body
        const newTea = { teaname, brand, type, packaging, notes, user_id }

        TeasService.insertTea(req.app.get('db'), newTea)
            .then(tea => {
                return res
                    .status(201)
                    .json(tea)
            })
            .catch(next)
    })


teasRouter
    .route('/:user_id/:tea_id')
    // .all(requireAuth)
    // .all(checkTeaExists)
    .get((req, res, next) => {
        const { user_id, tea_id } = req.params;

        const tea = {
            user_id,
            tea_id
        }

        TeasService.getTeaById(req.app.get('db'), tea)
            .then(tea => {
                res.json(tea)
            })
            .catch(next)
    })

teasRouter
    .route('/:user_id/:tea_id')
    // .all(requireAuth)
    // .all(checkTeaExists)
    .patch(jsonBodyParser, (req, res, next) => {
        const { user_id, tea_id } = req.params;

        const tea = {
            user_id,
            tea_id
        }
        const { teaname, brand, type, packaging, notes } = req.body
        const updatedTea = { teaname, brand, type, packaging, notes }

        TeasService.updateTea(req.app.get('db'), tea, updatedTea)
            .then(tea => {
                return res
                    // .location(`/teas/${tea.id}`)
                    .json(tea)
            })
            .catch(next)
    })

teasRouter
    .route('/:user_id/:tea_id')
    // .all(requireAuth)
    // .all(checkTeaExists)
    .delete((req, res, next) => {
        const { user_id, tea_id } = req.params;

        const tea = {
            user_id,
            tea_id
        }

        TeasService.deleteTea(req.app.get('db'), tea)
            .then(() => {
                return res
                    .json('deleted')
                    .status(204)
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