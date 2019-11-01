const express = require('express');
const Action = require('../data/helpers/actionModel.js')

const router = express.Router();
router.use(express.json());


router.get("/", (req, res,) => {
    Action.get()
    .then(action => res.status(200).json(action))
    .catch(() => res.status(500).json({ error: "unable to retrieve actions" }));
}); 

router.get('/:id', (req, res) => {
        id = req.params.id
        Action.get(id)
        .then(action => {
        if (action) {
           res.status(200).json(action)
        } else {
            res.status(404).json({message: "The action with given id doesn't exist"});
        }
    })
    .catch(() => res.status(500).json({
        error: "unable to retrieve actions with given id"
    }));
});



router.delete('/:id', (req, res) => {
    const id = req.params.id
    if (Action) {
        Action.remove(id)
            .then(action => res.status(200).json({
                message: 'The action has been deleted'
            }))
            .catch(() =>
                res
                .status(500)
                .json({
                    error: "Unable to delete action"
                })
            );
    } else {
        res.status(400).json({
            message: "The action with the specified ID does not exist."
        });

    }
});

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body;
    if (!req.body.project_id || !req.body.description || !req.body.notes || req.body.completed === undefined) {
        res.status(400).json({
            message: "missing data field, please check you have  a project_id, notes, description, and a completed with a true or false"
        })
    } else {
        Action.update(id, changes)
            .then(action => res.status(200).json(action))
            .catch(() =>
                res.status(500).json({
                    errorMessage: "action could not be updated"
                })
            );
    }
});





module.exports = router;