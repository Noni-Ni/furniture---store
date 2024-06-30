const { Router } = require("express");
const { body, validationResult } = require('express-validator');
const { getAll, create, getById, getByAuthorId, deleteById, update } = require("../services/furniture");
const { isUser } = require("../middlewares/guards");
const { parseErrors } = require("../util");

const catalogRouter = Router();

catalogRouter.get('/', async (req, res) => {
    let data
    if (req.query.where) {
        const ownerId = req.query.where.match(/_ownerId="(.+?)"/)?.[1];

        if (ownerId) {
            data = await getByAuthorId(ownerId);
            
           
        }
    }
    if (!data) {
        data = await getAll();
    }


    res.json(data);


});

catalogRouter.post('/', isUser(),
    body('make').trim().isLength({ min: 4 }).withMessage('Make must be at least 4 symbols long'),
    body('model').trim().isLength({ min: 4 }).withMessage('Model must be at least 4 symbols long'),
    body('year').trim().isInt({ min: 1950, max: 2050 }).withMessage('The year must be between 1950 and 2050'),
    body('description').trim().isLength({ min: 10 }).withMessage('The description must be more than 10 symbols'),
    body('price').trim().isFloat({ min: 0.01 }).withMessage('The price must be a positive number'),
    body('img').trim().isURL({ require_tld: false, require_protocol: true }).withMessage('Please enter valid image URL'),
    body('make').trim(),
    async (req, res) => {
        try {
            const validation = validationResult(req);
            if (validation.errors.length) {
                throw validation.errors
            }
            const result = await create(req.body, req.user._id);
            res.json(result);

        } catch (err) {
            const parsed = parseErrors(err);
            res.status(400).json({ code: 400, message: parsed.message });
        }
    })

catalogRouter.get('/:id', async (req, res) => {
    const record = await getById(req.params.id);
    if (!record) {
        res.status(404).json({ code: 404, message: 'Item not found' });
        return;
    }
    res.json(record);
});

catalogRouter.put('/:id', isUser(),
    body('make').trim().isLength({ min: 4 }).withMessage('Make must be at least 4 symbols long'),
    body('model').trim().isLength({ min: 4 }).withMessage('Model must be at least 4 symbols long'),
    body('year').trim().isInt({ min: 1950, max: 2050 }).withMessage('The year must be between 1950 and 2050'),
    body('description').trim().isLength({ min: 10 }).withMessage('The description must be more than 10 symbols'),
    body('price').trim().isFloat({ min: 0.01 }).withMessage('The price must be a positive number'),
    body('img').trim().isURL({ require_tld: false, require_protocol: true }).withMessage('Please enter valid image URL'),
    body('make').trim(),
    async (req, res) => {
        try {
            const validation = validationResult(req);
            if (validation.errors.length) {
                throw validation.errors
            }
            const result = await update(req.params.id, req.body, req.user._id);
            res.json(result);

        } catch (err) {
            const parsed = parseErrors(err);
            res.status(400).json({ code: 400, message: parsed.message });
        }
    })

catalogRouter.delete('/:id', isUser(), async (req, res) => {
    try {
        await deleteById(req.params.id, req.user._id);
        res.status(204).end();
    } catch (error) {
        if (error.message == 'Access denied') {
            res.status(403).json({ code: 403, message: 'Access denied' });
        } else if (error instanceof ReferenceError) {
            res.status(404).json({ code: 404, message: 'Item not found' });
        } else {
            res.status(400).json({ code: 400, message: parseErrors(error).message });
        }
    }
})

module.exports = { catalogRouter }