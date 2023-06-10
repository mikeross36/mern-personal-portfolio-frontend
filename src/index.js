import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/scss/bootstrap.scss";
import "./styles/main.scss";
import { store } from "./app/store";
import { Provider } from "react-redux";
import ChatProvider from "./context/ChatProvider";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChatProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChatProvider>
    </Provider>
  </React.StrictMode>
);
