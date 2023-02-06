import http from "node:http";

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/") {
    res.setHeader("Content-type", "application/json");
    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: "1",
      name: "Henrique",
      sobrenome: "Araujo",
    });

    return res.writeHead(201).end();
  }
});

server.listen(3000);
