import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './style.css';

export default function ShowNote() {
  const { state } = useLocation();

  return (
    <div className="container">
      <section className="text">
        <div dangerouslySetInnerHTML={{ __html: state.notes.content }} />
      </section>
      <Link to="/viewnotes">
        <button className="btn waves-effect waves-light btn-small ">
          Voltar
        </button>
      </Link>
    </div>
  );
}
