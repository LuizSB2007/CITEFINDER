import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import reloadImg from './reload.png'
import copyImg from './writing.png'
import './App.css';

function App() {
  const [result, setResult] = useState("");
  const [ultimoResult, setUltimoResult] = useState(result);
  const [citacao, setCitacao] = useState("");
  const [mostrarMsg, setMostrarMsg] = useState(false)
  const [removeLoading, setRemoveLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setResult(e.target.value);
    setUltimoResult(result)
  }

  const handleClick = () => {
    navigator.clipboard.writeText(citacao);
    setMostrarMsg(true)
  }

  function requisicao(sobre: string = "", modulo: boolean = false) {
    console.log(result)
    setCitacao("")
    setRemoveLoading(false)
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `Citacao famosa sobre ${modulo === true? sobre : result},
         iniciando com letra maiuscula` }],
        temperature: 1.5
      })
    })
      .then(response => response.json())
      .then(data => {
        setCitacao(data.choices[0].message.content)
        setRemoveLoading(true)
      })
      .catch(error => console.error(error))
    setResult("")
  }

  useEffect(() => {
    setResult("como melhorar")
    requisicao()
  }, [])

  if(mostrarMsg){
    setTimeout(()=> setMostrarMsg(false), 2000)
  }

  return (
    <div className="App">
      <div className="citefinder">
        <h1 className='title'>CITEFINDER</h1>
        <form onSubmit={(e)=> {
          e.preventDefault()
          requisicao()
          }}>
          <label htmlFor="search">
            <h3>Digite aqui sobre o tipo de citação você deseja</h3>
            <input
              type="text"
              id="searchInput"
              placeholder="Ex: Fake news"
              autoComplete="off"
              onChange={handleChange}
              value={result}
            />
          </label>
        </form>
        <div className="citacao">
          {!removeLoading && <Loading/>}
          <p>{citacao}</p>
          <div className="footer">
            <button onClick={() => {
              requisicao(ultimoResult, true);
            }}><img src={reloadImg} alt="reload" /></button>
            <button onClick={handleClick}><img src={copyImg} alt="reload" /></button>
          </div>
        </div>
        <p>{mostrarMsg === true ? "Copiado!" : ""}</p>
      </div>
    </div>
  );
}

export default App;