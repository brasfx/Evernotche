import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './style.css';
import { useTranslation } from 'react-i18next'

export default function ShowNote() {
  const { state } = useLocation();
  const { t } = useTranslation()

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
            {t("edit")}
          </button>
        </Link>

        <Link to="/viewnotes">
          <button className="btn waves-effect waves-light btn-small ">
            {t("back")}
          </button>
        </Link>
      </section>
    </div>
  );
}
