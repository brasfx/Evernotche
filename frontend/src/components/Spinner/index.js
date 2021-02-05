import React from 'react';
import Loader from 'react-loader-spinner';
import './style.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function Spinner({ description }) {
  return (
    <div className="divPrincipal">
      <Loader type="TailSpin" color="#3498db" height={50} width={50} />
      <div className="textSpinner">{description}</div>
    </div>
  );
}
