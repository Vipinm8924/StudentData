import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

const StudentRow = ({ student, onDelete, onEdit }) => {
  const { id, attributes } = student;
  const { name, email } = attributes;

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>
        <Button variant="contained" color="secondary" onClick={() => onDelete(id)}>
          Delete
        </Button>
        <Button variant="contained" color="primary" onClick={() => onEdit(student)} style={{ marginLeft: '10px' }}>
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default StudentRow;
