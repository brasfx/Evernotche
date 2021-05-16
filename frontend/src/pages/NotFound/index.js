import React from 'react';
import Lottie from 'react-lottie';
import { useTranslation } from 'react-i18next';
import pageNotFound from '../../assets/sleeping-404.json';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const { t } = useTranslation();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: pageNotFound,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <div className="center" style={{ paddingTop: 30 }}>
        <h3 style={{ paddingBottom: 30, fontFamily: 'Helvetica' }}>
          {t('page_not_found_message')}
        </h3>
        <Lottie options={defaultOptions} height={400} width={400} />
        <Link to="/home">
          <button
            className="waves-effect waves-light btn-small darken-4"
            style={{ marginTop: 70 }}
          >
            {t('back')}
          </button>
        </Link>
      </div>
    </div>
  );
}
