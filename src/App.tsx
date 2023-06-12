import Gauge from './components/Gauge'
import './App.css'

function App() {
  return (
    <div>
      <h1>Geckoboard Gauge - Frontend Tech Test</h1>
      {/* @ts-expect-error Server Component */}
      <Gauge />
    </div>
  )
}

export default App
