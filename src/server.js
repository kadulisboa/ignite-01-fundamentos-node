import http from 'node:http';

const users = [];

const server = http.createServer((request, response) => {
  const {method, url} = request;
  
  if( url === '/users' && method === 'GET') {
    console.table([{"URL": url, "METHOD" : method, "ACTION": "Listagem de Usuários" }]);
    return response
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users));
  }

  if( url === '/users' && method === 'POST') {
    console.table([{"URL": url, "METHOD" : method, "ACTION": "Criação de Usuários" }]);
    
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'john@doe.com',
    })

    return response.writeHead(201).end();
  }

  console.table([{"URL": url, "METHOD" : method, "ACTION": "" }]);
  return response.writeHead(404).end();
})

server.listen(3333);
