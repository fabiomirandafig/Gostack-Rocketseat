import { Request, Response} from 'express';
import createUser from './services/CreateUser';

export function helloWorld (request: Request,response: Response) {
    //const user = createUser('Fábio','fabiomirandafig@gmail', '123456'); //Para a opção 1 de CreateUser, que espera 3 argumentos.
    const user = createUser({ //nome é opcional
        email: 'fabiomirandafig@gmail.com',
        password : '123456',
        techs: [
            'Node.js',
            'React.js',
            'React Native',
            {title: 'Javascript', experience: 100},
        ],
    }); //Para a opção 2 de CreateUser, que espera um argumento(um objeto) que possui 3 dados: nome, email e password.
    
    console.log(user.email); console.log(user.password);
    
    return response.json({ message: 'Hello World'});
}