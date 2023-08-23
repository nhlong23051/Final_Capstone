import { BrowserRouter, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { createBrowserHistory } from 'history';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import renderRoutes from './router/index';

function App() {
  return (
    <BrowserRouter> 
          <Routes>

            {renderRoutes()}


          </Routes>
        </BrowserRouter>
  );
}

export default App;
