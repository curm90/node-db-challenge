const express = require('express');
const Projects = require('../helpers/project-model');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get().map(project => {
      if (project.completed) {
        project.completed = true;
      } else if (!project.completed) {
        project.completed = false;
      }
      return project;
    });
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'request could not be processed ' + error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Projects.getById(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'request could not be processed ' + error.message });
  }
});

router.get('/:id/tasks', async (req, res) => {
  try {
    const tasks = await Projects.getTasks(req.params.id);
    if (tasks.length) {
      res.status(200).json(tasks);
    } else {
      res.status(404).json({ message: 'This project has no tasks ' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'request could not be processed ' + error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, description, completed } = req.body;
    const newProject = await Projects.add({
      name,
      description,
      completed
    });
    res.status(201).json(newProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'request could not be processed ' + error.message });
  }
});

router.post('/:id/tasks', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, notes, completed, project_id = id } = req.body;
    const task = await Projects.addTask(
      {
        description,
        notes,
        completed,
        project_id
      },
      id
    );
    if (task) {
      const newTask = await Projects.getById(id);
      res.status(201).json(newTask);
    } else {
      res.status(400).json({ message: 'Could not find project with given id' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'request could not be processed ' + error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Projects.delete(req.params.id);
    res.status(200).json(`deleted ${deleted} project`);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'request could not be processed ' + error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    const updatedProject = await Projects.update(id, {
      name,
      description,
      completed
    });
    res.status(200).json(updatedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'request could not be processed ' + error.message });
  }
});

module.exports = router;
