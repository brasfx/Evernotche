import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './style.css';

export default function ShowNote({ note, dispatch }) {
  const { state } = useLocation();

  return (
    <div className="container">
      <section className="text">
        <div dangerouslySetInnerHTML={{ __html: state.notes.content }} />
      </section>

      <section className="buttons">
        <Link
          to={{
            pathname: '/editnote/' + state.notes.id,
          }}
        >
          <button className="edit, waves-effect waves-light btn-small green darken-2 ">
            Editar
          </button>
        </Link>

        <Link to="/viewnotes">
          <button className="btn waves-effect waves-light btn-small ">
            Voltar
          </button>
        </Link>
      </section>
    </div>
  );
}
