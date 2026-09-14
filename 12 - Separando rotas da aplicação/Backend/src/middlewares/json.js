/*
    Middleware é um módulo(função) que intercepta a requisição e a resposta, 
    podendo modificar ou adicionar informações antes de passar para o 
    próximo middleware ou rota.

    obs: O middleware é fácil de ser reconhecido, pois ele recebe 3 parâmetros: req, res e next.
*/

export async function json(req, res){
     const buffer = [];

    for await (const chunk of req){
        buffer.push(chunk);
    }

    try {
        req.body = JSON.parse((Buffer.concat(buffer).toString()));
    } catch{
        req.body = null;
    }

    res.setHeader('Content-Type', 'application/json');

};

