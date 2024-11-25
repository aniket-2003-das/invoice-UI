import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import InvoiceList from './components/InvoiceList';
import InvoiceForm from './components/InvoiceForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<InvoiceList />} />
          <Route path="/create" element={<InvoiceForm />} />
          <Route path="/edit/:id" element={<InvoiceForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;