import React from 'react';
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <div>
      <h3 style={{ color: 'red' }}>{t("page_not_found_message")}</h3>
    </div>
  );
}
