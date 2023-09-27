const rootContainer = document.getElementById('root-element')
const root = ReactDOM.createRoot(rootContainer)

function App () {
  const name = "hello"
  return <div className="container">
    <h1>Cash Register</h1>
  </div>
}

root.render(<App />)