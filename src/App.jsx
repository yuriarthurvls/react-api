
import { useState, useEffect } from 'react';
import './App.css';

function ItemFilme({ filme }) {
  return (
    <div className="filme">
      <h2>{filme.nome}</h2>
      <p>Ano de lançamento: {filme.ano}</p>
    </div>
  );
}

function App() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function buscarFilmes() {
      try {
        const resposta = await fetch('/api/filmes');

        if (!resposta.ok) {
          throw new Error('Não foi possível consultar os filmes.');
        }

        const dados = await resposta.json();
        setFilmes(dados);
      } catch (erro) {
        setErro(erro.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarFilmes();
  }, []);

  return (
    <main className="container">
      <h1>Minha Lista de Filmes</h1>

      <p className="subtitulo">
        Filmes consultados através de uma API.
      </p>

      {carregando && <p>Carregando filmes...</p>}

      {erro && <p className="erro">Erro: {erro}</p>}

      {!carregando && !erro && filmes.length === 0 && (
        <p>Nenhum filme encontrado.</p>
      )}

      <section className="lista-filmes">
        {filmes.map((filme) => (
          <ItemFilme key={filme.id} filme={filme} />
        ))}
      </section>
    </main>
  );
}

export default App;
