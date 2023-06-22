import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosCliente from "../../axios-client.js";
import '../../styles/formStyle.css';

const EditGuardia = () => {
  const { id } = useParams();
  const [guardia, setguardia] = useState({
    idguardia: "",
    nombre_guardia: "",
    telefono_guardia: "",
    email_guardia: "",
    parqueo_idparqueo: ""
  });
  const [error, setError] = useState({
    idguardia: "",
    nombre_guardia: "",
    telefono_guardia: "",
    email_guardia: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getguardia();
  },[])

  const getguardia = () => {
    const payload = {
        carnet: id,
    }

    axiosCliente.get('/getGuardia', {params:payload})
    .then(({ data }) => {
      setguardia(JSON.parse(data))
      console.log(JSON.parse(data))
    })
    .catch(() => {
      console.log('Algo salio mal');
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar el campo nombre_guardia
    if (name === 'nombre_guardia') {
      if (!value || /^\s+$/.test(value)) {
        setError((prevError) => ({ ...prevError, nombre_guardia: 'El campo nombre no puede estar vacío' }));
      } else if (!/^[a-zA-ZáÁéÉíÍóÓúÚñÑ\s-]+$/.test(value)) {
        setError((prevError) => ({ ...prevError, nombre_guardia: 'El formato del nombre no es válido' }));
      } else {
        setError((prevError) => ({ ...prevError, nombre_guardia: '' }));
      }
    }    

    // Validar el campo ci
    if (name === 'idguardia') {
      if (!value || /^\s+$/.test(value)) {
        setError((prevError) => ({ ...prevError, idguardia: 'El número de C.I. no puede estar vacío' }));
      } else if (isNaN(value)) {
        setError((prevError) => ({ ...prevError, idguardia: 'El número de C.I. solo puede contener números' }));
      } else {
        setError((prevError) => ({ ...prevError, idguardia: '' }));
      }
    }

    // Validar el campo telefono_guardia
    if (name === 'telefono_guardia') {
      if (!value || /^\s+$/.test(value)) {
        setError((prevError) => ({ ...prevError, telefono_guardia: 'El campo teléfono no puede estar vacío' }));
      } else if (isNaN(value)) {
        setError((prevError) => ({ ...prevError, telefono_guardia: 'El teléfono solo puede contener números' }));
      } else {
        setError((prevError) => ({ ...prevError, telefono_guardia: '' }));
      }
    }

    setguardia((prevguardia) => ({
      ...prevguardia,
      [name]: value
    }));
  };

  const guardar = async (guardia) => {
    if(error.nombre_guardia!=='' || error.idguardia!==''||  error.telefono_guardia!==''){
      alert('Los datos no son válidos');
      return;
    }else if(guardia.nombre_guardia==="" || guardia.idguardia==="" || guardia.telefono_guardia === ""){
        alert('Por favor complete los campos vacios');
        return;
    }
    console.log(guardia);
    const payload = {
      nombre_guardia_guardia: guardia.nombre_guardia,
      ci: guardia.idguardia,
      telefono_guardia: guardia.telefono_guardia,
    }
    console.log(payload);

    /*axiosCliente.post('/crearguardia', payload)
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
          })*/
  
    //navigate('/admin/guardiaes');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(guardia);
    guardar(guardia);
  };
  

  return (
    <div className='bigestContainerTurno'>
        <div className="formContainer">
        <h4>Editar datos del guardia</h4>
        <form className="formulario" onSubmit={handleSubmit}>

            <div className="myform-group">
                <label htmlFor="nombre_guardia">Nombre:</label>
                <input
                    type="text"
                    id="nombre_guardia"
                    name="nombre_guardia"
                    value={guardia.nombre_guardia}
                    onChange={handleChange}
                />
            {error.nombre_guardia && <div className="error">{error.nombre_guardia}</div>}
            </div>

            <div className="myform-group">
                <label htmlFor="idguardia">Número de C.I.:</label>
                <input
                    type="text"
                    id="idguardia"
                    name="idguardia"
                    value={guardia.idguardia}
                    onChange={handleChange}
                />
            {error.idguardia && <div className="error">{error.idguardia}</div>}
            </div>

            <div className="myform-group">
                <label htmlFor="telefono_guardia">Teléfono:</label>
                <input
                    type="text"
                    id="telefono_guardia"
                    name="telefono_guardia"
                    value={guardia.telefono_guardia}
                    onChange={handleChange}
                />
            {error.telefono_guardia && <div className="error">{error.telefono_guardia}</div>}
            </div>

        <div className="boton-container">
          <button type="submit">Guardar</button>
        </div>

        </form>
        </div>
    </div>
  );
};

export default EditGuardia;
