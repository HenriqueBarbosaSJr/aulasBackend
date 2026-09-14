/* 
   Buffer é uma representação de uma sequência de bytes, ou seja, é um espaço de memória 
   que armazena dados binários. Usados para transitar dados de uma maneira muito rápida e eficiente. 
   É uma maneira de salvar e ler da memória de uma maneira muito performática. 

   É guardado na memória RAM de maneira binária. 

*/


const buffer = Buffer.from('OK');

console.log(buffer); // OK


// Converte o buffer JSON exibindo no console um array em formato decimal. 
console.log(buffer.toJSON()); // OK




