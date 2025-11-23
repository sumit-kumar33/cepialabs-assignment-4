import { useMemo, useState } from 'react'

const sampleProducts = [
	{ id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299, inStock: true, image: '/laptop.jpg' },
	{ id: 2, name: 'Cotton T-Shirt', category: 'Clothing', price: 29, inStock: false, image: '/tshirt.jpg' },
	{ id: 3, name: 'React Handbook', category: 'Books', price: 39, inStock: true, image: '/book.jpg' },
	{ id: 4, name: 'Noise-Cancel Headphones', category: 'Electronics', price: 199, inStock: true, image: '/headphones.jpg' },
	{ id: 5, name: 'Running Shoes', category: 'Footwear', price: 89, inStock: false, image: '/shoes.jpg' },
]

function ProductCard({ product }) {
	return (
		<article className="product-card" aria-labelledby={`product-${product.id}`}>
			<div className="product-image" role="img" aria-label={product.name}>
				<img src={product.image} alt={product.name} />
			</div>
			<div className="product-body">
				<h3 id={`product-${product.id}`}>{product.name}</h3>
				<p className="muted">{product.category}</p>
				<p className="price">${product.price}</p>
				<p className={`stock ${product.inStock ? 'in' : 'out'}`}>
					{product.inStock ? 'In stock' : 'Out of stock'}
				</p>
			</div>
		</article>
	)
}

export default function ProductCatalog({ products = sampleProducts }) {
	const [query, setQuery] = useState('')
	const [category, setCategory] = useState('All')
	const [onlyInStock, setOnlyInStock] = useState(false)

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase()
		return products.filter((p) => {
			if (onlyInStock && !p.inStock) return false
			if (category !== 'All' && p.category !== category) return false
			if (!q) return true
			return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
		})
	}, [products, query, category, onlyInStock])

	return (
		<section className="product-catalog container">
			<header className="catalog-header">
				<h2>Product Catalog</h2>
				<p className="muted">Browse available products — use search and filters.</p>
			</header>

			<div className="controls" role="region" aria-label="Catalog filters">
				<input
					type="search"
					placeholder="Search products..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					aria-label="Search products"
				/>

				<div className="category-buttons" role="tablist" aria-label="Quick category filters">
					{['All', 'Electronics', 'Clothing', 'Books'].map((c) => (
						<button
							type="button"
							key={c}
							className={`chip ${category === c ? 'active' : ''}`}
							aria-pressed={category === c}
							onClick={() => setCategory(c)}
						>
							{c}
						</button>
					))}
				</div>

				<label className="checkbox">
					<input type="checkbox" checked={onlyInStock} onChange={(e) => setOnlyInStock(e.target.checked)} /> Only in stock
				</label>
			</div>

			<div className="grid" role="list">
				{filtered.length === 0 ? (
					<div className="empty-state" role="status">
						<p>No products match your filters.</p>
						<p className="muted">Try clearing search or changing filters.</p>
					</div>
				) : (
					filtered.map((product) => (
						<div key={product.id} role="listitem">
							<ProductCard product={product} />
						</div>
					))
				)}
			</div>
		</section>
	)
}