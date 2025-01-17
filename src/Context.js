import { createContext, useCallback, useReducer, useEffect } from "react";
import { useRouter } from 'next/router';

// Create Context
const CavaniContext = createContext();

// Type
const type = {
  NAV: "NAV",
  ANIMATION: "ANIMATION",
};
const { NAV, ANIMATION } = type;

// Initial Value
const initialState = {
  nav: "home",
  animation: "fadeInDown",
};

// Reducer
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case NAV:
      return {
        ...state, 
        nav: payload,
      };
    case ANIMATION:
      return {
        ...state,
        animation: payload,
      };
    default:
      return state;
  }
};

// Watson State
const CavaniState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  useEffect(() => {
    const hash = router.asPath.split('#')[1]
    if (hash) {
      dispatch({
        type: NAV,
        payload: hash,
      });
    }
  }, []);

  const navChange = useCallback((value) => {
    dispatch({
      type: NAV,
      payload: value,
    });
  }, []);

  const animationChnage = useCallback((value) => {
    dispatch({
      type: ANIMATION,
      payload: value,
    });
  }, []);

  const { nav, animation } = state;
  return (
    <CavaniContext.Provider
      value={{ nav, navChange, animation, animationChnage }}
    >
      {children}
    </CavaniContext.Provider>
  );
};

export default CavaniState;
export { CavaniContext };
