import React, { Component, createContext, useState } from 'react';
const { Provider, Consumer } = createContext();

const ContextProvider = (props) => {
  const [ theme, toggleTheme ] = useState(true);
  const [ unit, toggleUnit ] = useState(true);

  return(
    <Provider value={{
      unit,
      theme,
      toggleUnit,
      toggleTheme
    }}>
      {props.children}
    </Provider>
  );

}

export { ContextProvider };
export default Consumer;
