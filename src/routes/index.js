import { Database } from "../database/index.js";
import { randomUUID } from "node:crypto";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/users",
    handler: (req, res) => {
      const users = database.select("users");

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: "/users",
    handler: (req, res) => {
      const { name, sobrenome } = req.bodyRequest;

      const user = {
        id: randomUUID(),
        name,
        sobrenome,
      };

      database.insert("users", user);

      return res.writeHead(201).end();
    },
  },
];
