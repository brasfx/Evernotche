import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./redux/configureStore";

import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'

import 'materialize-css/dist/css/materialize.min.css';
import './index.css';
//import './test.json' as translation_file
import enTranslation from './test.json'

import App from './App';

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'pt'],
    fallbackLng: "en",
    debug: true,
/*     resources: {
      "pt": {
          "translation": {
              "title": "页面标题",
                  "placeholder_1": "输入您的名字",
                  "value_1": "值"
          }
      },
      "en": {
        "translation": {
            enTranslation.toString()
        }
      }
    }, */

    //Options for language detection
    detection: {
      order: ['cookie', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie'],

    },
    react: { useSuspense: false},
    
/*     backend: {
      //loadPath: './public/locales/{{lng}}/translation.json',
      loadPath: './test.json',
      
    },   */  
    
  })

  //i18next.loadResources(enTranslation)
  i18next.changeLanguage('pt')
  console.log(enTranslation)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
  
);
