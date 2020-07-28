import React, { useState } from "react";
import PropTypes from "prop-types";

import shortId from "shortid";

// Components
import Error from "./Error";

const Formulario = ({ setGasto, setWasGastoDone, restante }) => {
  // States
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [error, setError] = useState(false);

  //func Agregar gasto
  const agregarGasto = (e) => {
    e.preventDefault();

    //Validar
    if (nombre.trim() === "" || cantidad < 1 || isNaN(cantidad)) {
      setError(true);
      return;
    }
    if (cantidad > restante) {
      setError(true);
      return;
    }
    setError(false);

    //Construir el gasto
    const gasto = {
      nombre,
      cantidad,
      id: shortId.generate(),
    };

    //Mandar gasto al componente principal
    setGasto(gasto);
    setWasGastoDone(true);

    //Resetear el form
    setNombre("");
    setCantidad(0);
  };

  return (
    <form onSubmit={agregarGasto}>
      <h2>Agrega tus gastos aquí</h2>

      {error ? <Error msg="Datos inválidos" /> : null}

      <div className="campo">
        <label>Nombre gasto</label>
        <input
          type="text"
          className="u-full-width"
          placeholder="Ej. Transporte"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label>Cantidad gasto</label>
        <input
          type="number"
          className="u-full-width"
          placeholder="Ej. 300"
          value={cantidad}
          onChange={(e) => setCantidad(parseFloat(e.target.value))}
        />
      </div>
      <input
        type="submit"
        className="button-primary u-full-width"
        value="Agregar gasto"
      />
    </form>
  );
};

Formulario.propTypes = {
  setGasto: PropTypes.func.isRequired,
  setWasGastoDone: PropTypes.func.isRequired,
  restante: PropTypes.number.isRequired,
};

export default Formulario;
