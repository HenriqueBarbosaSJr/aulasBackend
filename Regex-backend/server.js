import http from 'node:http';
const users = [];

// Regex para validação dos campos
const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexTelefone = /^\(\d{2}\) 9\d{4}-\d{4}$/;
const regexDataNascimento = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const server = http.createServer(async (req, res) => {

    const { method, url } = req;

    console.log(`Method: ${method} | URL: ${url}`);


    if (method === 'GET' && url === '/users') {
        //return res.end('Listagem de usuários');
        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users));
    }

    //Uso em cabeçalhos de resposta
    
        if (method === 'POST' && url === '/users') {
            const buffers = [];

            for await (const chunk of req) {
                buffers.push(chunk);
            }

            const body = Buffer.concat(buffers).toString();
            const user = JSON.parse(body || '{}');

            const isCpfValid = regexCPF.test(user.cpf);
            const isEmailValid = regexEmail.test(user.email);
            const isTelefoneValid = regexTelefone.test(user.telefone);
            const isDataNascimentoValid = regexDataNascimento.test(user.data_nascimento);

            if (!isCpfValid || !isEmailValid || !isTelefoneValid || !isDataNascimentoValid) {
                return res.writeHead(400).end('Dados de usuário inválidos.');
            }

            users.push(user);
            return res.end('Criação de usuários');
        }

   

    return res.end('Hello World !!');
});

server.listen(3333);