import { Readable, Transform, Writable } from "node:stream";

// Stream de Leitura

class OneTorHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}

// new OneTorHundredStream().pipe(process.stdout);

// Stream de Escrita

class MultiplyTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

// new OneTorHundredStream().pipe(new MultiplyTenStream());

// Stream de Transformação

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed)));
  }
}

new OneTorHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyTenStream());
