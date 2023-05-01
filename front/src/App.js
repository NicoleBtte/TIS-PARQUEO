import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import PrivateRoutes from './privateRoutes';
import { ContextProvider } from './contexts/ContextProvider';
import DefaultLayout from './layouts/DefaultLayout';
import ConvocatoriaPage from './components/convocatoriaPage';
import HomePage from './components/homePage';
import LoginPage from './components/loginPage';
import ParqueoPage from './components/parqueoPage';
import NotFound from './components/notFoundPage';
import GuestLayout from './layouts/GuestLayout';
import AsignacionPage from './components/asignacionPage';
import SitiosDisponibles from './components/admin-asig/sitiosDisp';
import PagosPage from './components/pagosPage';
import PqrPage from './components/pqrPage';
import IngresosPage from './components/ingresosPage';
import MisitioPage from './components/misitioPage';
import MensajesPage from './components/mensajesPage';
import RedactarPage from './components/redactarPage';
import FormularioRegistro from './components/formularioRegistro';
import ResponderForm from './components/operador-mensajes/responderForm';
import ResponseForm from './components/cliente-mensajes/responseForm';

function App() {
  return (
    <ContextProvider>
      <div className='App'>
        <div className='loading'>
          <Routes>
            
            {/* Rutas para el admin */}
            <Route
              path='/admin'
              element={
                <PrivateRoutes theRol={'admin'}>
                  <DefaultLayout />
                </PrivateRoutes>
              }
            >
              <Route index element={<ConvocatoriaPage />} />
              <Route path='/admin/convocatoria' element={<ConvocatoriaPage />} />
              <Route path='/admin/parqueo' element={<ParqueoPage />} />
              <Route path='/admin/asignacion' element={<AsignacionPage />} />
              <Route path='/admin/asignacion/id/:id/nc/:nc/p/:p/z/:z/s/:s' element={<SitiosDisponibles />} />
            </Route>
            {/* Rutas para el operador */}
            <Route
              path='/operador'
              element={
                <PrivateRoutes theRol={'operador'}>
                  <DefaultLayout />
                </PrivateRoutes>
              }
            >
              <Route index element={<PagosPage />} />
              <Route path='/operador/pagos' element={<PagosPage />} />
              <Route path='/operador/pqr' element={<PqrPage />} />
              <Route path='/operador/pqr/responder/id/:id/name/:name' element={<ResponderForm />} />
            </Route>
            {/* Rutas para el guardia */}
            <Route
              path='/guardia'
              element={
                <PrivateRoutes theRol={'guardia'}>
                  <DefaultLayout />
                </PrivateRoutes>
              }
            >
              <Route index element={<IngresosPage />} />
              <Route path='/guardia/ingresos' element={<IngresosPage />} />
            </Route>
            {/* Rutas para el cliente */}
            <Route
              path='/cliente'
              element={
                <PrivateRoutes theRol={'cliente'}>
                  <DefaultLayout />
                </PrivateRoutes>
              }
            >
              <Route index element={<MisitioPage />} />
              <Route path='/cliente/misitio' element={<MisitioPage />} />
              <Route path='/cliente/redactar' element={<RedactarPage />} />
              <Route path='/cliente/mensajes' element={<MensajesPage />} />
              <Route path='/cliente/mensajes/responder/id/:id/name/:name' element={<ResponseForm />} />
            </Route>

            {/* Rutas para el guest */}
            <Route
              path='/'
              element={
                  <GuestLayout />
              }
            >
              <Route index element={<HomePage />} />
              <Route path='/register' element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
            </Route>
            <Route path='*' element={<NotFound />} />
            

          </Routes>
        </div>
      </div>
    </ContextProvider>
  );
}

export default App;
