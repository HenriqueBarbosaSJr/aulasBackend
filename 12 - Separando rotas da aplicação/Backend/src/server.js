import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';


/* 
  UUID (Universally Unique Identifier) é um identificador único universal,
  que é um número de 128 bits usado para identificar informações em sistemas.
  Ele é amplamente utilizado em bancos de dados e sistemas distribuídos para garantir que cada
  registro tenha um identificador exclusivo, mesmo que seja gerado em diferentes locais ou momentos.
*/


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