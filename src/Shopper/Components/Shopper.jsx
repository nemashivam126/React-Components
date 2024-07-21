/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";

export default function Shopper() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([{ id: 0, title: '', image: '', price: 0, category: '', description: '', rating: { rate: 0, count: 0 } }]);
    const [cartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [showToggle, setShowToggle] = useState({ 'display': 'none' });
    const [totalPrice, setTotalPrice] = useState(0);

    function GetCategories() {
        axios.get("http://fakestoreapi.com/products/categories")
            .then(response => {
                response.data.unshift("all");
                setCategories(response.data);
            });
    }

    function GetProducts(url) {
        axios.get(url)
            .then(response => {
                setProducts(response.data);
            })
    }

    function GetCartCount() {
        setCartCount(cartItems.length);
        calculateTotalPrice();
    }

    useEffect(() => {
        GetCategories();
        GetProducts("http://fakestoreapi.com/products");
        GetCartCount();
    },[]);

    function handleCategoryChange(e) {
        if (e.target.value === "all") {
            GetProducts("http://fakestoreapi.com/products");
        } else {
            GetProducts(`http://fakestoreapi.com/products/category/${e.target.value}`);
        }
    }

    function handleAddToCartClick(e) {
        axios.get(`http://fakestoreapi.com/products/${e.target.value}`)
            .then(response => {
                cartItems.push(response.data);
                alert(`${response.data.title}\nAdded to Cart`);
                GetCartCount();
            })

    }

    function handleCartToggleClick() {
        // setShowToggle({ 'display': 'block' });
        setShowToggle((prevState) => {
            if (prevState.display === 'none') {
              return { display: 'block' };
            } else {
              return { display: 'none' };
            }
          });
    }

    function handleRemoveClick(e) {
        if (window.confirm(`Do you really want to delete "${cartItems[e.currentTarget.value].title}" from the cart?`)) {
            cartItems.splice(e.currentTarget.value, 1);
        }
        GetCartCount();
    }

    function calculateTotalPrice() {
        let sum = 0;
        cartItems.forEach((item) => {
            sum += item.price;
        });
        setTotalPrice(sum);
    }

    function handleNavClick(category) {
        if (category === "all") {
            GetProducts("http://fakestoreapi.com/products");
        } else {
            GetProducts(`http://fakestoreapi.com/products/category/${category}`);
        }
    }

    return (
        <div style={{ overflow: "hidden" }}>
            <header className="d-flex justify-content-between align-items-center p-2 bg-dark text-white">
                <div className="h3">Shopper.</div>
                <div>
                    <span style={{ cursor: "pointer" }} className="me-4" onClick={() => handleNavClick("all")}>Home</span>
                    <span style={{ cursor: "pointer" }} className="me-4" onClick={() => handleNavClick("electronics")}>Electronics</span>
                    <span style={{ cursor: "pointer" }} className="me-4" onClick={() => handleNavClick("jewelery")}>Jewelery</span>
                    <span style={{ cursor: "pointer" }} className="me-4" onClick={() => handleNavClick("men's clothing")}>{"Men's Clothing"}</span>
                    <span style={{ cursor: "pointer" }} className="me-4" onClick={() => handleNavClick("women's clothing")}>{"Women's Clothing"}</span>
                </div>
                <div>
                    <button title="Cart" onClick={handleCartToggleClick} className="btn text-light position-relative">
                        {/* Cart */}
                        <span className="bi bi-cart4 h4"></span>
                        <span className="badge position-absolute top-0 end-0 bg-danger rounded rounded-circle">{cartCount}</span>
                    </button>
                </div>
            </header>
            <section className="mt-3 row px-3">
                <nav className="col-2">
                    <div>
                        <label className="form-label fw-bold">Select Category</label>
                        <div>
                            <select onChange={handleCategoryChange} className="form-select">
                                {
                                    categories.map(category =>
                                        <option value={category} key={category}>{category.toUpperCase()}</option>
                                    )
                                }
                            </select>
                        </div>

                    </div>
                </nav>
                <main className="col-8 d-flex flex-wrap overflow-auto" style={{ height: '85vh' }}>
                    {
                        products.map(product =>
                            <div key={product.id} className="card p-2 m-2" style={{ width: '200px' }}>
                                <img src={product.image} className="card-img-top" height="140" alt="Images" />
                                <div className="card-header overflow-auto" style={{ height: '130px' }}>
                                    <p>{product.title}</p>
                                </div>
                                <div className="card-body">
                                    <dl>
                                        <dt>Price</dt>
                                        <dd>{product.price}</dd>
                                        <dt>Rating</dt>
                                        <dd>
                                            {product.rating.rate}
                                            <span className="bi bi-star-fill text-success"></span>
                                            [{product.rating.count}]
                                        </dd>
                                    </dl>
                                </div>
                                <div className="card-footer">
                                    <button value={product.id} onClick={handleAddToCartClick} className="btn btn-danger w-100">
                                        <span className="bi bi-cart4"></span> Add to Cart
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </main>
                <aside className="col-2">
                    <div style={showToggle}>
                        <label className="fw-bold">Your Cart </label>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Preview</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItems.map((item, i) =>
                                        <tr key={item.id}>
                                            <td><img src={item.image} width="50" height="50" alt="images" /></td>
                                            <td>{item.price}</td>
                                            <td>
                                                <button onClick={handleRemoveClick} value={i} className="btn btn-danger">
                                                    <span className="bi bi-trash-fill"></span>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <div style={{display:'flex', justifyContent:'space-around', marginRight:'85px'}}>
                            <dt>Total Price</dt>
                            <dd>{totalPrice.toFixed(2)}</dd>
                        </div>
                    </div>
                </aside>
            </section>
        </div>
    )
}