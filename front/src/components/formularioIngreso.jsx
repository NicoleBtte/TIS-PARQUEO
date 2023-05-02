import { useState } from 'react';

function IngresosForm() {
	const [formValue, setFormValue] = useState({
		idClient: '',
		placa: 1,
	});

	const handleCreate = (e) => {
		e.preventDefault();
		console.log({ formValue });
	};
	const handleSubmit = (idClient, placa) => {
		console.log(idClient, placa);
		alert(`datos formularios:::, ${idClient}, ${placa}, `);
		setTimeout(() => {}, 3000);
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValue({ ...formValue, [name]: value });
	};

	return (
		<div className='container'>
			<form className='pago-form box mx-auto my-4' onSubmit={handleCreate}>
				<fieldset>
					<legend className='text-center  fw-medium primary-color'>Registrar Ingreso</legend>
					<div className='mb-3'>
						<label className='form-label  fw-medium primary-color' htmlFor='idClient'>
							ID Cliente
						</label>
						<input
							className='form-control'
							name='idClient'
							id='idClient'
							type='text'
							onChange={handleInputChange}
							defaultValue={formValue.idClient}
						/>
					</div>
					<div className='mb-3'>
						<label className='form-label fw-medium primary-color' htmlFor='placa'>
							Placa
						</label>
						<input
							className='form-control'
							id='placa'
							type='text'
							name='placa'
							onChange={handleInputChange}
							defaultValue={formValue.placa}
						/>
					</div>
				</fieldset>
				<div className='text-center'>
					<input className='btn btn-personal' type='submit' value='Registrar' />
				</div>
			</form>
		</div>
	);
}

export default IngresosForm;