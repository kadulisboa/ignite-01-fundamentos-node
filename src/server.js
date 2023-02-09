import http from 'node:http';

const users = [];

const server = http.createServer(async (request, response) => {
  const {method, url} = request;

  const buffers = [];

  for await ( const chunk of request ) {
    buffers.push(chunk);
  }

  try {
    
    request.body = JSON.parse(Buffer.concat(buffers).toString());

  } catch {

    request.body = null;

  }

  
  
  if( url === '/users' && method === 'GET') {
    // console.table([{"URL": url, "METHOD" : method, "ACTION": "Listagem de Usuários" }]);
    
    return response
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users));
  }

  if( url === '/users' && method === 'POST') {
    const { name, email } = request.body;
    // console.table([{"URL": url, "METHOD" : method, "ACTION": "Criação de Usuários" }]);

    users.push({
      id: 1,
      name,
      email,
    });

    return response.writeHead(201).end();
  }

  // console.table([{"URL": url, "METHOD" : method, "ACTION": "" }]);
  return response.writeHead(404).end();
})

server.listen(3333);
