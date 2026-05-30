import http from 'http';
import {jsonBodyHandler} from "./middlewares/jsonBodyHandler.js"

const server = http.createServer(async (req,resp) => {
    const {method,url} = req
    await jsonBodyHandler(req,resp)
    if(method === "GET" && url === "/products"){
        return resp
            .writeHead(200)
            .end("Informacoes foram entregues com sucesso");
    }
    if(method === "POST" && url === "/products"){
        return resp
            .writeHead(201)
            .end(JSON.stringify(req.body));

    }
    return resp
        .writeHead(404)
        .end("Rota não encontrada")
});
server.listen(3333)