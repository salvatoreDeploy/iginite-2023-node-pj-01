import http from "node:http";
import { json } from "./middleware/json.js";

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  //console.log(bodyRequest);

  if (method === "GET" && url === "/") {
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
