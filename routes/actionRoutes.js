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




module.exports = router;