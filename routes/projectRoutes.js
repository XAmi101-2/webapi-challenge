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


router.get('/:id/all', (req, res) => {
    id = req.params.id
    Project.getProjectActions(id)
        .then(project => {
            if (project.length > 0) {
                res.status(200).json(project)
            } else {
                res.status(404).json({
                    message: "The project doesn't exist with given ID"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "unable to retrieve project actions with given id"
            })
        });
})

router.post('/', (req, res) => {
const body= req.body;
    // console.log("body", body)

    if (body.description &&  body.name ) {	
    Project
        .insert(body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            res.status(500).json({ error: 'There was an error while adding the project to the database' });
        });
	} else {
        res.status(400).json({ errorMessage: 'missing data for the user.' });
    }
        
	});
// })




router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Project.remove(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).json({
                error: 'The project could not be removed.'
            })
        })
})


router.put('/:id', (req, res) => {

    const id = req.params.id;
    const update = req.body;

    if (!update.name || !update.description) {
        res.status(400).json({
            error: 'Please provide name or description for the project.'
        })
    } else {
        Project.update(id, update)
        .then((updatedProject) => {
            if (updatedProject) {
                res.status(200).json(updatedProject)
            } else {
                res.status(404).json({
                    error: 'The project with the specified ID does not exist.'
                })
            }
        })
        .catch(() => {
            res.status(500).json({
                error: 'unable to modify the project.'
            })
        })
    }
})


module.exports = router;