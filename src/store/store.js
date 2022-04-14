import { devToolsEnhancer } from "redux-devtools-extension";
import { createStore } from "redux";

const initialState = {
  logged: false,
  popup: { visibilidad: false, texto: "" },
};

const reductor = (state = initialState, action) => {
  if (action.type === "USER_LOGGED") {
    return {
      ...state,
      logged: true,
    };
  }
  if (action.type === "USER_LOGOUT") {
    return {
      ...state,
      logged: false,
    };
  }
  if (action.type === "VER_POPUP") {
    return {
      ...state,
      popup: { visibilidad: true, texto: action.payload },
    };
  }

  if (action.type === "CERRAR_POPUP") {
    return {
      ...state,
      popup: { visibilidad: false },
    };
  }

  return state;
};

export default createStore(reductor, devToolsEnhancer());
