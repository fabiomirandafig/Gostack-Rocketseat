/**
 * Métodos HTTP:
 * 
 * GET: Buscar informação no back-end
 * POST: Criar uma informação no back-end
 * PUT/PATCH: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 * 
 * Query Params: Filtros e paginação
 * Route Params: Identificar recursos (Atualizar/Deletar)
 * Request Body: Conteúdo na hora criar ou editar um recurso (JSON)
 * 
 * Middleware:
 * Interceptador de requisições que pode interromper totalmente a requisição ou alterar
 * dados da requisição(next, deixar a requisição prosseguir).
 * O express é baseado em middlewares, é o conceito mais importante dentro do express.

*/

const { response } = require('express');
const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = express();
app.use(cors());
app.use(express.json());

const projects = [];

function logRequests(request,response,next) {
    const { method, url } = request;
   
    const logLabel = `[${method.toUpperCase()}] ${url}`;
   
    // console.log(logLabel);
    // return next(); //Próximo middleware

    // console.log('1');
    console.time(logLabel);
    next();
    // console.log('2');
    console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
    const { id } = request.params;

    if(!isUuid(id)) {
        return response.status(404).json({error: 'Invalid project ID.'});
    }

    return next();
}

app.use(logRequests);
//app.use('/projects/:id', validateProjectId); //outra opção de usar o middleware somente para o put e delete

app.get('/projects',(request,response) => {
    // const {title, owner} = request.query;
    // console.log(title);
    // console.log(owner);

    // console.log('3');
    const { title} = request.query;

    const results = title 
        ? projects.filter(project => project.title.includes(title))
        : projects;

    // const results = owner 
    // ? results.filter(project => project.owner.includes(owner))
    // : results;

    return response.json(results);
});

app.post('/projects',(request,response) => {
    // const body = request.body;
    // console.log(body);

    const { title, owner } = request.body;
    // console.log(title);
    // console.log(owner);
    const project = { id:uuid(), title, owner};
    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', validateProjectId, (request,response) => {
    // const params = request.params;
    // console.log(params);

    const { id } = request.params;
    //console.log(id);
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found!'});
    }

    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', validateProjectId, (request,response) => {
    // const params = request.params;
    // console.log(params);
    const { id } = request.params;
    // console.log(id);

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found!'});
    }

    projects.splice(projectIndex,1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log('🚀️ Back-end started!');
});