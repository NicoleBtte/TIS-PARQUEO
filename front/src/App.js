import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./privateRoutes";
import { ContextProvider } from "./contexts/ContextProvider";
import DefaultLayout from "./layouts/DefaultLayout";
import ConvocatoriaPage from "./components/convocatoriaPage";
import HomePage from "./components/homePage";
import LoginPage from "./components/loginPage";
import ParqueoPage from "./components/parqueoPage";
import NotFound from "./components/notFoundPage";
import GuestLayout from "./layouts/GuestLayout";
import AsignacionPage from "./components/asignacionPage";
import PagosPage from "./components/pagosPage";
import PqrPage from "./components/pqrPage";
import IngresosPage from "./components/ingresosPage";
import MensajesPage from "./components/mensajesPage";
import RedactarPage from "./components/redactarPage";
import FormularioConvocatoria from "./components/formularioConvocatoria";
import ConvocatoriaEditar from "./components/convocatoriaEditar";
import FormularioParqueo from "./components/formularioParqueo";
import ParqueoEditar from "./components/parqueoEditar";
import ZonaParqueo from "./components/zonasParqueo";
import PagosClientes from "./components/pagosClientes";
import FormularioPago from "./components/formularioPago";
import MisPagosPage from "./components/misPagosPage";
import SitiosDisponibles from "./components/admin-asig/sitiosDisp";
import FormularioRegistro from "./components/formularioRegistro";
import ResponderForm from "./components/operador-mensajes/responderForm";
import ResponseForm from "./components/cliente-mensajes/responseForm";
import QrPage from "./components/qrPage";
import IngresosForm from "./components/formularioIngreso";
import Operadores from "./components/admin-users/operadores";
import FormularioOperador from "./components/admin-users/operadorForm";
import Guardias from "./components/admin-users/guardias";
import FormularioGuardia from "./components/admin-users/guardiaForm";
import MensajesEnviadosPage from "./components/cliente-mensajes/historialEnviados";
import PagoEditar from "./components/pagoEditar";
import Clientes from "./components/guardia-clientes/clientes";
import PagosReportePage from "./components/pagosReportePage";
import TurnosPage from "./components/admin-turnos/turnosPage";
import GuardiaTurnos from "./components/admin-turnos/guardiaTurnos";
import TurnoForm from "./components/admin-turnos/turnoForm";
import TurnoEdit from "./components/admin-turnos/turnoEditar";
import AsignarTurno from "./components/admin-turnos/asignarTurno";
import RedactarAdmin from "./components/admin-notif/redactarAdmin";
import AdminMensajes from "./components/admin-notif/adminMensajes";
import NotifIndv from "./components/admin-notif/notifIndiv";
import NotificacionesGuardia from "./components/guardia-notif/notificacionesGuardia";
import NotificacionesOperador from "./components/operador-notif/notificacionesOperador";
import Vehiculos from "./components/guardia-clientes/vehiculos";

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <div className="loading">
          <Routes>
            {/* Rutas para el admin */}

            <Route
              path="/admin"
              element={
                <PrivateRoutes theRol={"admin"}>
                  <DefaultLayout />
                </PrivateRoutes>
              }
            >
              <Route index element={<ConvocatoriaPage />} />
              <Route
                path="/admin/convocatoria"
                element={<ConvocatoriaPage />}
              />
              <Route
                path="/admin/formulario-convocatoria"
                element={<FormularioConvocatoria />}
              />
              <Route path="/admin/parqueo" element={<ParqueoPage />} />
              <Route path="/admin/asignacion" element={<AsignacionPage />} />
              <Route
                path="/admin/formulario-convocatoria/:id/editar"
                element={<ConvocatoriaEditar />}
              />
              <Route
                path="/admin/formulario-parqueo"
                element={<FormularioParqueo />}
              />
              <Route
                path="/admin/parqueo/:id/editar"
                element={<ParqueoEditar />}
              />
              <Route
                path="/admin/parqueo/:id/detalle"
                element={<ZonaParqueo />}
              />
              <Route
                path="/admin/asignacion/id/:id/nc/:nc/p/:p/z/:z/s/:s"
                element={<SitiosDisponibles />}
              />
              <Route path="/admin/operadores" element={<Operadores />} />
              <Route
                path="/admin/operadores/new"
                element={<FormularioOperador />}
              />
              <Route path="/admin/guardias" element={<Guardias />} />
              <Route
                path="/admin/guardias/new"
                element={<FormularioGuardia />}
              />
              <Route path="/admin/turnos" element={<TurnosPage />}/>
              <Route path="/admin/turnoForm" element={<TurnoForm />}/>
              <Route path="/admin/turnoEdit/id/:id/t/:t/hi/:hi/hf/:hf/d/:d" element={<TurnoEdit />}/>
              <Route path="/admin/guardiasTurnos" element={<GuardiaTurnos />}/>
              <Route path="/admin/asigTurno/id/:id/t/:t" element={<AsignarTurno />}/>
              <Route path="/admin/mensajes" element={<AdminMensajes />}/>
              <Route path="/admin/redactar" element={<RedactarAdmin />}/>
              <Route path="/admin/redactarindv" element={<NotifIndv />}/>
            </Route>
            {/* Rutas para el operador */}
            <Route
              path="/operador"
              element={
                <PrivateRoutes theRol={"operador"}>
                  <DefaultLayout />
                </PrivateRoutes>
              }
            >
              <Route index element={<PagosPage />} />
              <Route path="/operador/pagos" element={<PagosPage />} />
              <Route
                path="/operador/pagos-clientes"
                element={<PagosClientes />}
              />
              <Route
                path="/operador/formulario-pago"
                element={<FormularioPago />}
              />
              <Route
                path="/operador/formulario-pago/:id/editar"
                element={<PagoEditar />}
              />
              <Route path="/operador/pqr" element={<PqrPage />} />
              <Route
                path="/operador/reporte-pagos"
                element={<PagosReportePage />}
              />
              <Route
                path="/operador/pqr/responder/id/:id/name/:name"
                element={<ResponderForm />}
              />
              <Route
                path="/operador/enviados"
                element={<MensajesEnviadosPage />}
              />
              <Route path="/operador/infoClientes" element={<Clientes />} />
              <Route path="/operador/notificaciones" element={<NotificacionesOperador />} />
            </Route>
            {/* Rutas para el guardia */}
            <Route
              path="/guardia"
              element={
                <PrivateRoutes theRol={"guardia"}>
                  <DefaultLayout />
                </PrivateRoutes>
              }
            >
              <Route index element={<IngresosPage />} />
              <Route path="/guardia/ingresos" element={<IngresosPage />} />
              <Route
                path="/guardia/ingresos/registrar"
                element={<IngresosForm />}
              />
              <Route path="/guardia/infoClientes" element={<Clientes />} />
              <Route path="/guardia/notificaciones" element={<NotificacionesGuardia />} />
              <Route path="/guardia/infoVehiculo" element={<Vehiculos />} />
            </Route>
            {/* Rutas para el cliente */}
            <Route
              path="/cliente"
              element={
                <PrivateRoutes theRol={"cliente"}>
                  <DefaultLayout />
                </PrivateRoutes>
              }
            >
              <Route index element={<MisPagosPage />} />
              <Route path="/cliente/redactar" element={<RedactarPage />} />
              <Route path="/cliente/mensajes" element={<MensajesPage />} />
              <Route path="/cliente/mis-pagos" element={<MisPagosPage />} />
              <Route path="/cliente/pagos-qr" element={<QrPage />} />
              <Route
                path="/cliente/mensajes/responder/id/:id/name/:name"
                element={<ResponseForm />}
              />
              <Route
                path="/cliente/enviados"
                element={<MensajesEnviadosPage />}
              />
            </Route>

            {/* Rutas para el guest */}
            <Route path="/" element={<GuestLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/register" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </ContextProvider>
  );
}

export default App;
