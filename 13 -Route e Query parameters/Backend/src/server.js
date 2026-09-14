import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';


// Query params => URL Stateful => filtros paginação não-obrigatórios 
// Route params => URL Stateful => identificar recursos
// Request body => Dados para criação ou atualização de recursos (JSON) (dados e um fomulario)
//                 Estes dados são enviados no corpo da requisição, não na URL. (POST, PUT, PATCH)
//                 Passam pelo protocolo https, são mais seguros para transmitir dados sensíveis, 
//                 como senhas, tokens de autenticação, informações pessoais, etc.

/* Atenção tanto Query params quanto Route não possui quaquer criptografia, 
   não são seguros para transmitir dados sensíveis. */

// http://localhost:3333/users/userId?1&name=Lucas&age=22    (Query params)
// GET http://localhost:3333/users/1                         (Route params)
// DELETE http://localhost:3333/users/1                      (Route params)
// POST http://localhost:3333/users                          (Request body)

const server = http.createServer(async (req, res) => {

    const { method, url } = req;

    await json(req, res);

    const route = routes.find(route =>{
        return route.method == method &&  route.path == url
    });
    //console.log(route);

    if (route){
        return route.handler(req, res);
    }
    


});

server.listen(3333, ()=>{console.log('Server running on http://localhost:3333')});