import { BrowserRouter, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { createBrowserHistory } from 'history';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import renderRoutes from './router/index';

export const history: any = createBrowserHistory()

function App() {
  return (
    <>
      <Suspense>
        <BrowserRouter >
          <Routes>

            {renderRoutes()}

          </Routes>
        </BrowserRouter>
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );

}


export default App;
