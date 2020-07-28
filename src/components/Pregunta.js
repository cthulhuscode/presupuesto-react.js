import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

// Components
import Error from "./Error";

const Pregunta = ({ setPresupuesto, setRestante, setPregunta }) => {
  // Definir State presupuesto
  const [cantidad, setCantidad] = useState(0);

  // State Error
  const [error, setError] = useState(false);

  // Función para definir presupuesto
  const definirPresupuesto = (e) => {
    setCantidad(parseInt(e.target.value, 10));
  };

  // Submit para definir el presupuesto
  const agregarPresupuesto = (e) => {
    e.preventDefault();

    // Validar
    if (cantidad <= 1 || isNaN(cantidad)) {
      setError(true);
      return;
    }

    //Si no error
    setError(false);
    setPresupuesto(cantidad);
    setRestante(cantidad);
    setPregunta(false);
  };

  return (
    <Fragment>
      <h2>Coloca tu presupuesto</h2>

      {error ? <Error msg="El presupuesto es incorrecto" /> : null}

      <form onSubmit={agregarPresupuesto}>
        <input
          type="number"
          className="u-full-width"
          placeholder="Digita tu presupuesto"
          onChange={definirPresupuesto}
        />
        <input
          type="submit"
          className="u-full-width button-primary"
          value="Definir presupuesto"
        />
      </form>
    </Fragment>
  );
};

// PropTypes
Pregunta.propTypes = {
  setPresupuesto: PropTypes.func.isRequired,
  setRestante: PropTypes.func.isRequired,
  setPregunta: PropTypes.func.isRequired,
};

export default Pregunta;
