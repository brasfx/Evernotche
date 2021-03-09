import React from 'react';
import './style.css';

export default function ButtonClose(props) {
  const { icon, setModalClose } = props;
  return (
    <div
      className="button-close"
      onClick={setModalClose}
      className="waves-effect waves-light btn-small red darken-4"
    >
      <i className="material-icons center">{icon}</i>
    </div>
  );
}
