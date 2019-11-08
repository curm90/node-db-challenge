const express = require('express');
const helmet = require('helmet');

const projectsRouter = require('./src/routers/project-router');
const resourcesRouter = require('./src/routers/resources-router');

const app = express();

app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.json('server running');
});

app.use('/api/projects', projectsRouter);
app.use('/api/resources', resourcesRouter);

module.exports = app;
