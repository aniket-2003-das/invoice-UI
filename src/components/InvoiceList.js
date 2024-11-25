import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from '@mui/material';


function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, [page, search]);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`/api/invoices/?page=${page}&search=${search}`);
      setInvoices(response.data.results);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/invoices/${id}/`);
      fetchInvoices();
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  return (
    <div>
      <h1>Invoices</h1>
      <TextField 
        label="Search" 
        variant="outlined" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <Link to="/create">
        <Button variant="contained" color="primary">Create New Invoice</Button>
      </Link>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.invoice_number}</TableCell>
                <TableCell>{invoice.customer_name}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>
                  <Link to={`/edit/${invoice.id}`}>
                    <Button variant="contained" color="primary">Edit</Button>
                  </Link>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(invoice.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Button>
      <Button onClick={() => setPage(page + 1)}>Next</Button>
    </div>
  );
}

export default InvoiceList;