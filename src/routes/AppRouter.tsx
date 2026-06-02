import { Route, Routes } from 'react-router-dom';

import ProductDetail from '../pages/List';
import ProductList from '../pages/DetailPage';

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
    )
}