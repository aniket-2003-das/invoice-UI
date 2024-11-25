import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import InvoiceList from './InvoiceList';

test('renders invoice list', () => {
  render(
    <Router>
      <InvoiceList />
    </Router>
  );
  const linkElement = screen.getByText(/Invoices/i);
  expect(linkElement).toBeInTheDocument();
});