import http from 'node:http';

// CommonJs ==> require
// ESmodule ==> import/export

/* Utilizamos o node: dentro do import para indicar que estamos 
   importando um módulo nativo do Node.js, como o 'http'. Isso ajuda a diferenciar entre 
   módulos nativos e módulos de terceiros ou arquivos locais.
*/

// Para executar o código, utilize o comando: node --watch server.js

/*
    - criar usuários
    - Listagem de usuários
    - Edição de usuários
    - Exclusão de usuários

    Uma requisição HTTP  é composta de 2 principais recursos 
        - Método HTTP: GET, POST, PUT, PATCH, DELETE
            - GET: Buscar uma informação no back-end
            - POST: Criar uma informação no back-end
            - PUT: Atualizar uma informação no back-end por completo
            - PATCH: Atualizar uma informação específica no back-end
            - DELETE: Remover uma informação no back-end

        - URL: /users, /users/

        Então eu posso ter metodos diferentes para a mesma URL, por exemplo:
            - GET /users: Listar usuários
            - POST /users: Criar usuário
            - PUT /users: Atualizar usuário
            - DELETE /users: Remover usuário

🧑‍💻    Reter dados em memória:
        stateful: quando os dados são armazenados em memória, eles são perdidos quando o servidor é reiniciado.
        stateless: quando os dados não são armazenados em memória, eles não são perdidos quando o servidor é reiniciado.

🧑‍💻 Cabeçalhos (requisição/resposta) são metadados:
        - Cabeçalhos tanto da requisição quanto da resposta são informações adicinais que podem ser enviadas junto com a requisição HTTP, 
          como tipo de conteúdo, autenticação, etc.
    
      

*/
const users = [];

const server = http.createServer((req, res) => {

    const { method, url } = req;
    /*

        if (url === '/favicon.ico') {
            return res.end();
        }
    */

    console.log(`Method: ${method} | URL: ${url}`);


    if (method === 'GET' && url === '/users') {
        //return res.end('Listagem de usuários');
        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users));
    }

    //Uso em cabeçalhos de resposta
    
        if (method === 'POST' && url === '/users') {
            users.push({ 
                id: 1,
                name: 'John Doe', 
                email: 'john.doe@example.com'
            });
            return res.end('Criação de usuários');
        }

   

    return res.end('Hello World !!');
});

server.listen(3333);





/*

    if (method === 'POST' && url === '/users') {
        return res.end('Criação de usuários');
    }
*/