import reactLogo from '../../../assets/react.svg'
import workusLogo from '../../../assets/workUs.png'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <img src={workusLogo} className="logo" alt="React logo" />
      <div className="card">
        <p>
          WorkUs
        </p>
      </div>
    </>
  )
}

export default App
