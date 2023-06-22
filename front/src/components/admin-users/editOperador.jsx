import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosCliente from "../../axios-client.js";
import '../../styles/formStyle.css';

const EditOperador = () => {
  const { id, p } = useParams();
  const [operador, setOperador] = useState({
    idactual: "",
    idoperador: "",
    nombre_operador: "",
    telf_operador: "",
    email_operador: "",
    parqueo_idparqueo: ""
  });
  const [error, setError] = useState({
    idoperador: "",
    nombre_operador: "",
    telf_operador: "",
    email_operador: "",
  });
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(p);
  const navigate = useNavigate();

  useEffect(() => {
    getoptions();
    getOperador();
  },[])

  const handleOptionChange = (event) => {
    /*console.log("eeeeeeeeeeeeeeeeeeee",event.target.value);
    console.log("cambia de", selectedOption)
    setSelectedOption(event.target.value);
    console.log("a ", selectedOption)*/
    setOperador((prevoperador) => ({
      ...prevoperador,
      parqueo_idparqueo: event.target.value
    }));
  }

  const getoptions = () => {
    axiosCliente.get('/parqueos')
    .then(({ data }) => {
      setOptions(JSON.parse(data))
      console.log("Las opciones son:", options)
    })
    .catch(() => {
      console.log('Algo salio mal');
    })
  }

  const getOperador = () => {
    const payload = {
        carnet: id,
    }

    axiosCliente.get('/getOperador', {params:payload})
    .then(({ data }) => {
      setOperador(JSON.parse(data))
      console.log(JSON.parse(data))
      setSelectedOption(operador.parqueo_idparqueo);
      console.log(selectedOption)
    })
    .catch(() => {
      console.log('Algo salio mal');
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validoperadorar el campo nombre_operador
    if (name === 'nombre_operador') {
      if (!value || /^\s+$/.test(value)) {
        setError((prevError) => ({ ...prevError, nombre_operador: 'El campo nombre no puede estar vacío' }));
      } else if (!/^[a-zA-ZáÁéÉíÍóÓúÚñÑ\s-]+$/.test(value)) {
        setError((prevError) => ({ ...prevError, nombre_operador: 'El formato del nombre no es válido' }));
      } else {
        setError((prevError) => ({ ...prevError, nombre_operador: '' }));
      }
    }    

    // Validoperadorar el campo ci
    if (name === 'idoperador') {
      if (!value || /^\s+$/.test(value)) {
        setError((prevError) => ({ ...prevError, idoperador: 'El número de C.I. no puede estar vacío' }));
      } else if (isNaN(value)) {
        setError((prevError) => ({ ...prevError, idoperador: 'El número de C.I. solo puede contener números' }));
      } else {
        setError((prevError) => ({ ...prevError, idoperador: '' }));
      }
    }

    // Validoperadorar el campo telf_operador
    if (name === 'telf_operador') {
      if (!value || /^\s+$/.test(value)) {
        setError((prevError) => ({ ...prevError, telf_operador: 'El campo teléfono no puede estar vacío' }));
      } else if (isNaN(value)) {
        setError((prevError) => ({ ...prevError, telf_operador: 'El teléfono solo puede contener números' }));
      } else {
        setError((prevError) => ({ ...prevError, telf_operador: '' }));
      }
    }

    // Validoperadorar el campo email_operador
    if (name === 'email_operador') {
      if (!value || /^\s+$/.test(value)) {
        setError((prevError) => ({ ...prevError, email_operador: 'El campo email no puede estar vacío' }));
      } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
        setError((prevError) => ({ ...prevError, email_operador: 'La dirección del email no es válido' }));
      } else {
        setError((prevError) => ({ ...prevError, email_operador: '' }));
      }
    }

    setOperador((prevoperador) => ({
      ...prevoperador,
      [name]: value
    }));
  };

  const guardar = async (operador) => {
    if(operador.parqueo_idparqueo==="" && options.length>0){
      alert('Por favor seleccione una opción');
      return;
    }
    if(error.nombre_operador!=='' || error.idoperador!==''|| error.email_operador!=='' || error.telf_operador!==''){
      alert('Los datos no son válidos');
      return;
    }else if(operador.nombre_operador==="" || operador.idoperador==="" || operador.email_operador==="" || operador.telf_operador === ""){
        alert('Por favor complete los campos vacios');
        return;
    }
    console.log(operador);
    const payload = {
      idoperador: id,
      nombre_operador: operador.nombre_operador,
      ci: operador.idoperador,
      email_operador: operador.email_operador,
      telf_operador: operador.telf_operador,
      parqueo_idparqueo: operador.parqueo_idparqueo,
    }
    console.log(payload);

    axiosCliente.post('/editarOperador', payload)
        .then(({data}) => {    
          //que hacer despues      
          console.log(data)
        })
        .catch(err => {
          const response = err.response;
          console.log(response.data.message)
          if (response && response.status === 422) {
            console.log(response.data.errors)
          }
          })
  
    navigate('/admin/operadores');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(operador);
    guardar(operador);
  };
  

  return (
    <div className='bigestContainerTurno'>
        <div className="formContainer">
        <h4>Editar datos del operador</h4>
        <form className="formulario" onSubmit={handleSubmit}>

        <div>
          <label className="speciallabel" htmlFor="option">Parqueo:</label>
          {options.length > 0 ? (
            <select className="combobox" id="option" name="option" onChange={handleOptionChange}>
              {options.map((opcion) => (
                <option key={opcion.idParqueo} value={opcion.idParqueo} selected={opcion.idParqueo === operador.parqueo_idparqueo}>
                  {opcion.nombre_parqueo}
                </option>
              ))}
            </select>
          ) : (
            <select className="combobox" id="option" name="option" disabled>
              <option>No hay opciones disponibles</option>
            </select>
          )}
        </div>

            <div className="myform-group">
                <label htmlFor="nombre_operador">Nombre:</label>
                <input
                    type="text"
                    id="nombre_operador"
                    name="nombre_operador"
                    value={operador.nombre_operador}
                    onChange={handleChange}
                />
            {error.nombre_operador && <div className="error">{error.nombre_operador}</div>}
            </div>

            <div className="myform-group">
                <label htmlFor="idoperador">Número de C.I.:</label>
                <input
                    type="text"
                    id="idoperador"
                    name="idoperador"
                    value={operador.idoperador}
                    onChange={handleChange}
                />
            {error.idoperador && <div className="error">{error.idoperador}</div>}
            </div>

            <div className="myform-group">
                <label htmlFor="telf_operador">Teléfono:</label>
                <input
                    type="text"
                    id="telf_operador"
                    name="telf_operador"
                    value={operador.telf_operador}
                    onChange={handleChange}
                />
            {error.telf_operador && <div className="error">{error.telf_operador}</div>}
            </div>

            <div className="myform-group">
                <label htmlFor="email_operador">Correo electrónico:</label>
                <input
                    type="text"
                    id="email_operador"
                    name="email_operador"
                    value={operador.email_operador}
                    onChange={handleChange}
                />
            {error.email_operador && <div className="error">{error.email_operador}</div>}
            </div>

        <div className="boton-container">
          <button type="submit">Guardar</button>
        </div>

        </form>
        </div>
    </div>
  );
};

export default EditOperador;
