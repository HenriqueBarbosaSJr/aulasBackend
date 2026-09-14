//Netflix & Spotify

// Importação de clientes via CSV (exemplo)
// 1 GB - 1000.000 de registros
// POST  -> upload import.csv

// 10 Mb de velocidade de upload -> 100 segundos para começar a importar no banco de dados

// A cada 10 Mb de upload, o sistema processa 10.000 registros


/* Falamos de dois tipos de streams:
    Readable Streams: São streams que podem ser lidas, como arquivos, requisições HTTP, etc.
    Writable Streams: São streams que podem ser escritas, como arquivos, respostas HTTP, etc.
*/

/*
    No NodeJs toda porta é automaticamente um stream.
*/


// pipe -> conecta a saída de um stream com a entrada de outro stream;
// process.stdin
//    .pipe(process.stdout);  

import { Readable, Writable } from 'node:stream';

class oneToHundredStream extends Readable {
    index = 1;

    _read(){
        const i = this.index++;

        setTimeout(() => {
            if (i > 100){
                this.push(null);
            }else{
                const buff = Buffer.from(String(i));
                this.push(buff);
            }

        },1000);

    }
}

class MultiplayByTenStream extends Writable {
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString() *10));

        callback();
    }

new oneToHundredStream()
    .pipe(new MultiplayByTenStream());
