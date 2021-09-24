/**
 * Para criar usuario é necessario nome, email e senha.
 */

//tipagens comuns(primitivas): string, number, boolean, object, Array. 
//interface(formas de definir tipagem de conjunto de dados, principalmente objetos em javascript)

//Primeira Opção
// export default function CreateUser (name = '', email: string, password: string) {
//     const user = {
//         name,
//         email,
//         password,
//     }

//     return user;
// }

//Segunda Opção

interface TechObject {
    title: string;
    experience: number;
}

interface CreateUserData {
    name?:string;//? significa opcional
    email:string;
    password:string;
    //techs: string[];//formato para quando o tipo do array é unico.
    techs: Array<string | TechObject>; //formato para quand o tipo array for variável.
}

export default function CreateUser ({name = '', email, password, techs}:CreateUserData) {
    const user = {
        name,
        email,
        password,
    }
    return user;
}