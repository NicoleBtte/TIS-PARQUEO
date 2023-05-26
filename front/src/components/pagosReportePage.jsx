import { useEffect, useRef, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import axiosClient from "../axios-client.js";
import "../styles/estilos.css";
import "../styles/tableStyle.css";
import "../styles/botonesStyle.css";
import "../styles/tablePageStyle.css";
import Chart from "chart.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PagosReportePage = () => {
  const [fechaInicioConvocatoria, setFechaInicioConvocatoria] = useState(null);
  const [fechaFinConvocatoria, setFechaFinConvocatoria] = useState(null);
  const [registroTabla, setRegistroTabla] = useState([]);
  const [numberValue, setNumberValue] = useState(null);
  const [numberRValue, setNumberRValue] = useState(null);
  const [fechaDe, setFechaDe] = useState("");
  const [hastaFecha, setHastaFecha] = useState("");
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);
  const [sumaMontos, setSumaMontos] = useState(0);
  const [sumaDevoluciones, setSumaDevoluciones] = useState(0);

  useEffect(() => {
    axiosClient
      .get("/convocatoriaActual")
      .then((response) => {
        const convocatoria = JSON.parse(response.data);
        console.log(convocatoria);
        if (convocatoria && convocatoria.fecha_inicio) {
          setFechaInicioConvocatoria(
            new Date(convocatoria.fecha_inicio_gestion)
          );
          setFechaFinConvocatoria(new Date(convocatoria.fecha_fin_gestion));
        }
      })
      .catch((error) => {
        console.error(error);
      });

    axiosClient
      .get("/totalIngresos")
      .then((response) => {
        const number = response.data;
        console.log(number);
        setNumberValue(number);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (chartData && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          // Puedes personalizar otras opciones del gráfico aquí
        },
      });
    }
  }, [chartData]);

  const generarReporte = () => {
    if (fechaDe && hastaFecha) {
      axiosClient
        .post("/reportePagos", { fecha_de: fechaDe, hasta_fecha: hastaFecha })
        .then((response) => {
          const data = response.data;
          console.log(data);
          if (Array.isArray(data) && data.length >= 2) {
            const registros = JSON.parse(data[0]);

            // Generar los días dentro del rango seleccionado
            const fechaInicio = new Date(fechaDe);
            const fechaFin = new Date(hastaFecha);
            const dias = [];
            const sumaMontos = {};
            let totalMontos = 0;
            let totalDevoluciones = 0;

            while (fechaInicio <= fechaFin) {
              const fechaISO = fechaInicio.toISOString().split("T")[0];
              dias.push(fechaISO);
              sumaMontos[fechaISO] = 0;
              fechaInicio.setDate(fechaInicio.getDate() + 1);
            }

            // Calcular la suma de los montos por día
            registros.forEach((registro) => {
              const fechaPago = registro.fechaPago;
              if (sumaMontos.hasOwnProperty(fechaPago)) {
                sumaMontos[fechaPago] += registro.monto - registro.devolucion;
                totalMontos += registro.monto;
                totalDevoluciones += registro.devolucion;
              }
            });

            setRegistroTabla(registros);
            setNumberRValue(JSON.parse(data[1]));
            setSumaMontos(totalMontos);
            setSumaDevoluciones(totalDevoluciones);

            // Crear los datos para el gráfico
            const chartLabels = dias;
            const chartValues = dias.map((fecha) => sumaMontos[fecha]);

            const chartData = {
              labels: chartLabels,
              datasets: [
                {
                  label: "Ingresos",
                  data: chartValues,
                },
              ],
            };

            setChartData(chartData);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("Ingrese las fechas de inicio y fin");
    }
  };

  /*const enviarReporte = () => {
    axiosClient
      .post("/guardarReportePagos", { registroTabla, numberRValue })
      .then((response) => {
        console.log("desdequiii");
        console.log(registroTabla);
        console.log(numberRValue);
        console.log("hastaaaquiii");
        console.log("Reporte enviado exitosamente");
        // Realizar cualquier acción adicional después de enviar el reporte
      })
      .catch((error) => {
        console.error("Error al enviar el reporte", error);
      });
  };*/

  const generarPDF = () => {
    if (fechaDe && hastaFecha) {
      const doc = new jsPDF();
      const title = `${fechaDe} - ${hastaFecha}`;
      const reporteTitulo = "Reporte de pagos";

      doc.setDocumentProperties({ title: title });
      // Agregar el título del reporte al documento
      doc.setFontSize(18);
      doc.text(reporteTitulo + ": " + title, 10, 20);

      // Agregar los datos del reporte a una matriz
      const data = registroTabla.map((registro) => [
        registro.fechaPago,
        registro.monto,
        registro.devolucion,
      ]);

      // Obtener las sumas totales
      const totalData = ["Total:", sumaMontos, sumaDevoluciones];

      // Agregar la tabla al documento
      doc.autoTable({
        head: [["Fecha", "Monto", "Devolución"]],
        body: data,
        foot: [totalData],
        startY: 30,
      });

      // Generar una imagen del gráfico con opciones personalizadas
      const chartImage = chartRef.current.toDataURL("image/png", 3.0);
      const x = 10; // Posición horizontal del gráfico en el documento PDF
      const y = doc.previousAutoTable.finalY + 10; //debajo de la tabla
      const width = 100; // Ancho del gráfico en el documento PDF
      const height = 80; // Altura del gráfico en el documento PDF

      // Configurar las opciones personalizadas del gráfico
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: false, // No mostrar el título del gráfico
          },
        },
        elements: {
          point: {
            radius: 0, // Eliminar los puntos del gráfico
          },
          line: {
            borderColor: "blue",
            borderWidth: 1, // Ancho del borde de las líneas del gráfico
            fill: false, // No rellenar el área bajo las líneas del gráfico
          },
        },
      };

      // Agregar la imagen del gráfico al documento con las opciones personalizadas
      doc.addImage(
        chartImage,
        "JPEG",
        x,
        y,
        width,
        height,
        null,
        "SLOW",
        0,
        chartOptions
      );

      // Guardar el documento como un archivo PDF
      const fileName = `reporte_${fechaDe}_al_${hastaFecha}.pdf`;
      doc.save(fileName);
    }
  };

  return (
    <Container className="tablePageContainer">
      <div className="titleBottonContainer">
        <h2 className="tittleContainer">Reporte de pagos</h2>
        <div>
          <Button
            className="link-none-styles btn-personal py-2"
            onClick={generarReporte}
          >
            Generar reporte
          </Button>
        </div>
      </div>
      <div className="containerDescargarBoton">
        <button className="descargarBoton" onClick={generarPDF}>
          Descargar reporte
        </button>
      </div>
      <div className="row-reporte">
        <div className="col-reporte1" id="firts">
          <div className="number">{numberValue}</div>
          <div className="text">Ingreso total</div>
        </div>
        <div className="col-reporte1" id="second">
          <div className="number">{numberRValue}</div>
          <div className="text">Ingreso de las fechas seleccionadas</div>
        </div>
        <div className="col-reporte">
          <label htmlFor="fecha_de">Fecha de:</label>
          {fechaInicioConvocatoria && (
            <input
              name="fecha_de"
              type="date"
              className="form-control"
              id="fecha_de"
              placeholder="Fecha de"
              min={fechaInicioConvocatoria.toISOString().split("T")[0]}
              max={fechaFinConvocatoria.toISOString().split("T")[0]}
              value={fechaDe} // Agregar este atributo para establecer el valor del estado
              onChange={(e) => setFechaDe(e.target.value)}
            ></input>
          )}
        </div>
        {fechaInicioConvocatoria && fechaFinConvocatoria && (
          <div className="col-reporte">
            <label htmlFor="hasta_fecha">Hasta fecha:</label>
            <input
              name="hasta_fecha"
              type="date"
              className="form-control"
              id="hasta_fecha"
              placeholder="Fecha fin"
              min={fechaInicioConvocatoria.toISOString().split("T")[0]}
              max={fechaFinConvocatoria.toISOString().split("T")[0]}
              value={hastaFecha} // Agregar este atributo para establecer el valor del estado
              onChange={(e) => setHastaFecha(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="containerr">
        <div className="chartContainer">
          <canvas id="chart" width="400" height="400" ref={chartRef}></canvas>
        </div>
        <div className="tableContainerr">
          <Table className="mytabler">
            <thead className="tableHeader">
              <tr>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Devolucion</th>
              </tr>
            </thead>
            <tbody>
              {registroTabla.map((registro, index) => (
                <tr className="misFilas" key={index}>
                  <td className="miTd">{registro.fechaPago}</td>
                  <td className="miTd">{registro.monto}</td>
                  <td className="miTd">{registro.devolucion}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="tableFoot">
              <tr>
                <th className="miTd">Total:</th>
                <th className="miTd">{sumaMontos}</th>
                <th className="miTd">{sumaDevoluciones}</th>
                <th className="miTd"></th>
              </tr>
            </tfoot>
          </Table>
        </div>
      </div>
      {/* ... */}
    </Container>
  );
};

export default PagosReportePage;
