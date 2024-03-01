import './App.css'
import TodoItem from './components/TodoItem';
import Header from './components/header';

import React from 'react';


function App() {

  return (
    <div className='main'>
      <Header />
      <TodoItem />
    </div>
  )


}
export default App;
