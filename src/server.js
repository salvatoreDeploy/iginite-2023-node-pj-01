import http from "node:http";

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // Leitura de dados
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  // Transforma os dados
  try {
    req.bodyRequest = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  //console.log(bodyRequest);

  if (method === "GET" && url === "/") {
    res.setHeader("Content-type", "application/json");
    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, sobrenome } = req.bodyRequest;

    users.push({
      id: "1",
      name,
      sobrenome,
    });

    return res.writeHead(201).end();
  }
});

server.listen(3000);
