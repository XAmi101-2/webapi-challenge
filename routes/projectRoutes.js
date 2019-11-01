const express = require('express');
const router = express.Router();
const Project = require('../data/helpers/projectModel.js')


router.use(express.json());


router.get("/", (req, res,) => {
    Project.get()
    .then(project => res.status(200).json(project))
    .catch(() => res.status(500).json({ error: "unable to retrieve projects" }));
}); 

router.get('/:id', (req, res) => {
    id = req.params.id
    Project.get(id)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({
                    message: "The project doesn't exist with given ID"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "unable to retrieve projects with given id"
            })
        });
})



module.exports = router;