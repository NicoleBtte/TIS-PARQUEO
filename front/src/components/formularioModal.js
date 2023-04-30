import React, { useState } from "react";

import { Container } from "react-bootstrap";

function FormularioModal() {
  const [formData, setFormData] = useState({
    nombre: "",
    nSitios: 1,
    techo: false,
    arbolesCerca: false,
    tipoDePiso: "Pavimentado",
    otros: null,
  });

  const { nombre, nSitios, techo, arbolesCerca, tipoDePiso, otros } = formData;

  const handleOnchange = (e) => {
    console.log([e.target.name], e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (
    nombre,
    nSitios,
    techo,
    arbolesCerca,
    tipoDePiso,
    otros
  ) => {
    fetch("", {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "iPhone Galaxy +1",
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  };
  React.useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then(console.log);
  }, []);

  return (
    <Container>
      <div className="container-form">
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                name="nSitos"
                type="number"
                id="nSitios"
                className="form-control"
                min="1"
                max="50"
                placeholder="Cantidad de sitios"
              />
            </div>
            <div className="form-group col-md-6">
              <div class="form-check form-check-inline">
                <h4>Techo</h4>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="option1"
                />
                <label class="form-check-label" for="inlineRadio1">
                  Si
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="option2"
                />
                <label class="form-check-label" for="inlineRadio1">
                  No
                </label>
              </div>
            </div>

            <div className="form-group col-md-6">
              <div class="form-check form-check-inline">
                <h4>Arboles cerca</h4>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="option1"
                />
                <label class="form-check-label" for="inlineRadio2">
                  Si
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="option2"
                />
                <label class="form-check-label" for="inlineRadio2">
                  No
                </label>
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="form-group col-md-4">
                <label for="estado">Tipo de piso</label>
                <select id="estado" className="form-control">
                  <option selected>Pavimentado</option>
                  <option>Empedrado</option>
                  <option>Tierra</option>
                </select>
              </div>
            </div>
            <div className="form-group col-md-6">
              <input
                name="otros"
                type="text"
                className="form-control"
                id="otros"
                placeholder="Otros"
              ></input>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Actualizar
          </button>
        </form>
      </div>
    </Container>
  );
}

export default FormularioModal;
