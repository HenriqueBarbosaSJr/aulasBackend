/* 
    O node tem um sistema interno de propriedades e métodos privados, que são precedidos do caractere #.
    Isso significa que essas propriedades e métodos não podem ser acessados fora da classe, apenas dentro dela.
*/

export class Database {
    #database = {}

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

        return data; 
    }

}