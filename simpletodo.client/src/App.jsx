//import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppRoutes from  './AppRoutes';
import './App.css';
import Header from './components/Header/Header';

function App() {
    return (
        <div className="app">
        <Header />
            <Routes>
				{AppRoutes.map((route, index) => {
					return <Route key={index} path={route.path} element={<route.element />} />
				})}
            </Routes>
        </div>
    );
}

export default App;