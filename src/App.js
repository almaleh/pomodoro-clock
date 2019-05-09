import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './Redux';
import { Container } from './Pomodoro';

const App = () => {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}

export default App;
