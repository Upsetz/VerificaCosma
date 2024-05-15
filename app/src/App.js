import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const [partita, setPartita] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numeroTentato, setNumeroTentato] = useState()
  const [indovinato, setIndovinato] = useState(false)

  const [risposta, setRisposta] = useState();
  const [id, setId] = useState();
  const [rispostaTentativi, setTentativi] = useState();

  async function inizio(){
    setPartita(true);
    const response = await fetch("http://localhost:8080/partita", {method: "POST"});
    const r = await response.json();
    setPartita(false);
    setId(r.id);
    setNumeroTentato(r.numero)
  }

  async function invio(){
    setLoading(true);
    const response = await fetch("http://localhost:8080/partita", 
        {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"numero" : numeroTentato})
        });;
    const r = await response.json();
    setLoading(false);
    setTentativi(r.numero);
    setRisposta(r.numero);
  }

  function gestisciNumero(e){
    setNumeroTentato(e.target.value);
  }

  function addTentativi(){
    setTentativi(rispostaTentativi + 1)
  }

  return (
    <div className="App">
      
      <h1>INDOVINA NUMERO</h1>
      <div><button onClick={(inizio)}>nuova partita</button></div>
      
      { partita &&

        <div> in caricamento</div>
      }
      { !partita && 

        <div> 

          <p>ID: {id}</p>
          <p>Tentativi: {rispostaTentativi}</p>
          <p>numero: {numeroTentato}</p>

          
        {indovinato &&
          <>
          <p>indovinato</p>
          </>
        }
        {!indovinato &&
          <>
          <p>riprova</p>
          </>
        }

          <p>Inserisci un numero da 0 a 100</p>
          <input type='number' value = {numeroTentato} onClick={invio} onInput={gestisciNumero}></input>
          <input type='submit' onClick={addTentativi}></input>

        </div>


      } 
    </div>
  );
}

export default App;
