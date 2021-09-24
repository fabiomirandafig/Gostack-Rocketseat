import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import './App.css';
// import backgroundImage from './assets/background.jpeg';
import api from './services/api';

// function App() {
//     return (
//         <> 
//             <Header title = "Homepage">
//                 <ul>
//                     <li>Homepage</li>
//                     <li>Projects</li>
//                 </ul>
//             </Header>
//             <Header title = "Projects">
//                 <ul>
//                     <li>Home</li>
//                     <li>Projetos</li>
//                     <li>Login</li>
//                 </ul>
//             </Header>
//         </>
//     );
// }

/**
 * Componente
 * Propriedade
 * Estado e Imutabilidade
 */

//useState retorna um array com 2 posições
//
// 1.Variável com o seu valor inicial
// 2.Função para atualizarmos esse valor

// function App() {
//     const [projects, setProjects] = useState(['Desenvolvimento de App', 'Front-end web']);
    
//     function handleAddProject(){
//         //projects.push(`Novo projeto ${Date.now()}`); // está utilizando mutabilidade, o que não ocorre no react.
//         setProjects([...projects, `Novo projeto ${Date.now()}`]);//utilizando o conceito de imutabilidade
//         console.log(projects);
//     }
    
//     return (
//         <> 
//             <Header title = "Projects" />

//             <img width={400} src = {backgroundImage} />
//                 <ul>
//                     {projects.map(project => <li key={project}>{project}</li>)}
//                 </ul>

//                 <button type = "button" onClick={handleAddProject}>Adicionar projeto</button>
//         </>
//     );
// }

function App() {
    const [projects, setProjects] = useState([]);
    
    useEffect(() => {
        api.get('projects').then(response => {
            // console.log(response);
            setProjects(response.data);
        });
    }, []); //Primeiro argumento: qual função se refere. Segundo argumento:qual variavel, vai ter mudança quando alterar qual variavel?

    async function handleAddProject(){
        //setProjects([...projects, `Novo projeto ${Date.now()}`]);//utilizando o conceito de imutabilidade
        const response = await api.post('projects',{
            title:`Novo projeto ${Date.now()}`,
            owner:"Fábio Miranda"
        });

        const project = response.data;

        setProjects([...projects,project]);
    }
    
    return (
        <> 
        <Header title = "Projects" />
        <ul>
            {projects.map(project => <li key={project.id}>{project.title}</li>)}
        </ul>
        <button type = "button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    );
}

export default App;