import http from 'node:http';


const users = [];

const server = http.createServer(async (req, res) => {

    const { method, url } = req;

    const buffer = [];

    for await (const chunk of req){
        buffer.push(chunk);
    }

    try {
        req.body = JSON.parse((Buffer.concat(buffer).toString()));
    } catch{
        req.body = null;
    }


    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body;
        users.push({ 
            id: 1,
            name,
            email
        });
        return res.writeHead(201).end();
    }
});

server.listen(3333, ()=>{console.log('Server running on http://localhost:3333')});