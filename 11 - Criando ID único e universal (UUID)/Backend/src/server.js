import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from '../database.js';
import { randomUUID } from 'node:crypto';

/* 
  UUID (Universally Unique Identifier) é um identificador único universal,
  que é um número de 128 bits usado para identificar informações em sistemas.
  Ele é amplamente utilizado em bancos de dados e sistemas distribuídos para garantir que cada
  registro tenha um identificador exclusivo, mesmo que seja gerado em diferentes locais ou momentos.
*/

const database = new Database();


const server = http.createServer(async (req, res) => {

    const { method, url } = req;

    await json(req, res);


    if (method === 'GET' && url === '/users') {
        const users = database.select('users');


        return res.end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body;

        const user = ({ 
            id: randomUUID(),
            name,
            email
        });

        database.insert('users', user);

        return res.writeHead(201).end();
    }
});

server.listen(3333, ()=>{console.log('Server running on http://localhost:3333')});