import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PagosPage() {
	const [pagos, setPagos] = useState([
		{ id: 1, fecha: '10/22/33', cliente: 'Cliente Name Last Name', monto: 165 },
	]);

	function descargarComprobante(id) {
		console.log('Downloading image', id);
	}

	function eliminarPago(id) {
		setPagos(pagos.filter((pago) => pago.id !== id));
	}

	useEffect(() => {
		fetch('http://127.0.0.1:8000/pagos')
			.then((response) => response.json()) //loconvierto un json el json
			.then((result) => setPagos(result)) //aqui uso json
			.catch((error) => console.log('error', error));
	}, []);

	return (
		<div className='container'>
			<div className='d-flex-between my-4'>
				<h1 className='my-0 fs-2'>Pagos</h1>
				<div>
					<Link className='link-none-styles btn-personal py-2' to='/operador/formulario-pago'>
						Agregar Pago
					</Link>
				</div>
			</div>
			<div>
				<table className='table'>
					<thead className='bg-c-primary'>
						<tr>
							<th className='fw-medium'>Fecha</th>
							<th className='fw-medium'>Cliente</th>
							<th className='fw-medium'>Monto</th>
							<th className='fw-medium'>Comprobante</th>
							<th className='fw-medium'>Acciones</th>
						</tr>
					</thead>
					<tbody className='bg-c-secondary'>
						{pagos.map((pago) => (
							<tr key={pago.id}>
								<td>{pago.fecha}</td>
								<td>{pago.cliente}</td>
								<td>{pago.monto}</td>
								<td>
									<button className='btn-none-style' onClick={() => descargarComprobante(pago.id)}>
										<i className='bx bxs-cloud-download bx-icon'></i>
									</button>
								</td>
								<td>
									<button className='btn-none-style'>
										<Link to={`pago/${pago.id}/edit`} className='link-none-styles'>
											<i className='bx bxs-edit-alt primary-color'></i>
										</Link>
									</button>
									<button className='btn-none-style' onClick={() => eliminarPago(pago.id)}>
										<i className='bx bxs-trash-alt primary-color'></i>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default PagosPage;
