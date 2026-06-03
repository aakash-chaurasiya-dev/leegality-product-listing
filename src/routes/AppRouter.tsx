import { Route, Routes } from 'react-router-dom';

import ProductDetail from '../pages/DetailPage';
import ProductList from '../pages/List';

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
    )
}