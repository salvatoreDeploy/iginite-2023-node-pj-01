import http from "node:http";
import { randomUUID } from "node:crypto";
import { Database } from "./database/index.js";
import { json } from "./middleware/json.js";

//const users = [];

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  //console.log(bodyRequest);

  if (method === "GET" && url === "/") {
    const users = database.select("users");

    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, sobrenome } = req.bodyRequest;

    const user = {
      id: randomUUID(),
      name,
      sobrenome,
    };

    database.insert("users", user);

    return res.writeHead(201).end();
  }
});

server.listen(3000);
