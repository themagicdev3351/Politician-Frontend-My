/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/reducer";
import { I18nextProvider } from 'react-i18next';
import i18n from "i18n";
const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>

      <Provider store={store}>
        <PersistGate loading={"loading..."} persistor={persistor}>
          <MaterialUIControllerProvider>
            <App />
          </MaterialUIControllerProvider>
        </PersistGate>
      </Provider>
    </I18nextProvider>
  </BrowserRouter>
);
