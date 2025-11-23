import ProductCatalog from './ProductCatalog'
import './index.css'

function App() {
  return (
    <main>
      <header className="app-header container">
        <h1>Storefront</h1>
        <p className="muted">A small catalog demonstrating list rendering and filters.</p>
      </header>

      <ProductCatalog />
    </main>
  )
}

export default App
