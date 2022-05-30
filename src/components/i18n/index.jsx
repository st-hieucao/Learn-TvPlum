import i18next from 'i18next';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Language = () => {
  const { t } = useTranslation('demo');

  useEffect(() => {
    i18next.changeLanguage('vn');
  }, [])

  return (
    <div>{t('name.title')}</div>
  )
}

export default Language