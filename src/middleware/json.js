export async function json(req, res) {
  // Leitura de dados
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  // Transforma os dados
  try {
    req.bodyRequest = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.bodyRequest = null;
  }

  res.setHeader("Content-type", "application/json");
}
