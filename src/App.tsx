import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import {RecoilRoot} from "recoil";

import './App.css';

import ProductDetails from "./Product/ProductDetails";
import ProductListing from "./Product/ProductListing";
import Layout from "./Layout";
import CartView from "./CartView";

function App() {
    return (
        <RecoilRoot>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<ProductListing />} />
                        <Route path="/cart" element={<CartView />} />
                        <Route path="/products/:category" element={<ProductListing />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                    </Route>
                </Routes>
            </Router>
        </RecoilRoot>
    );
}

export default App;
