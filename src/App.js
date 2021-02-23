import React, {useState, useEffect} from 'react';
import Header from './components/Header'

import api from './services/api'

import './App.css'

function App(){
    const [projects, setProjects] = useState([])

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data)
        })
    }, [])

    //useState retorna um array com 2 posiçoes
    //1° Variavel com o seu valor inicial
    //2° função para atualizarmos esse valor

    async function handleAddProject(){
        //setProjects([...projects, `Novo projeto ${Date.now()}`])
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Luis Filipe'
        })

        const project = response.data

        setProjects([...projects, project])
    }

    return(
        <div>
            
            <Header title="Projects" />

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Add Project</button>

        </div>
    )
}

export default App