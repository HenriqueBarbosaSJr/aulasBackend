/* 
    O node tem um sistema interno de propriedades e métodos privados, que são precedidos do caractere #.
    Isso significa que essas propriedades e métodos não podem ser acessados fora da classe, apenas dentro dela.
*/

import fs from 'node:fs/promises';

const databasePath = new URL('db.json', import.meta.url);
console.log(databasePath);

export class Database {
    #database = {}

    constructor(){
        fs.readFile(databasePath, 'utf8').then(data =>{
            this.#database = JSON.parse(data);
        })
        .catch(()=>{
            this.#persist();
        });
    }


    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }
  

    select(table){
        const data = this.#database[table] ?? [];

        return data;
    }


    insert(table, data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }

        this.#persist();

        return data;
    }

}