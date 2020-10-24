import React from 'react';

import Header from './components/header';
import Footer from './components/footer';
import Routes from  './routes'

import './styles.scss'

function App() {
  return (
    <>
    <Header />
    <Routes />
    <Footer />
   </>
  );
}

export default App;
