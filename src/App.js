import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      url: "https://github.com/Rocketseat/umbriel",
      title: "Umbriel",
      techs: ["Node", "Express", "TypeScript"]
    });

    setRepositories([
      ...repositories,
      response.data
    ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    const newRepositories = [...repositories];

    if (repositoryIndex !== -1)
      newRepositories.splice(repositoryIndex, 1);

    setRepositories(newRepositories);
  }

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
