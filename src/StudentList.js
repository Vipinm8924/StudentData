import React, { useState, useRef } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Button, TextField, MenuItem, Grid } from '@mui/material';

// Dummy data with contact number
const dummyStudents = [
  { id: 1, attributes: { name: 'John Doe', email: 'john.doe@gmail.com', dob: '2000-01-01', gender: 'Male', address: '123 Elm Street', contactNumber: '1234567890' } },
  { id: 2, attributes: { name: 'Jane Smith', email: 'jane.smith@gmail.com', dob: '1999-05-15', gender: 'Female', address: '456 Oak Avenue', contactNumber: '9876543210' } },
  { id: 3, attributes: { name: 'Robert Brown', email: 'robert.brown@gmail.com', dob: '1998-11-30', gender: 'Male', address: '789 Pine Road', contactNumber: '5551234567' } },
  { id: 4, attributes: { name: 'Emily Davis', email: 'emily.davis@gmail.com', dob: '2001-03-22', gender: 'Female', address: '321 Maple Drive', contactNumber: '6667778888' } },
  { id: 5, attributes: { name: 'Michael Wilson', email: 'michael.wilson@gmail.com', dob: '1997-07-10', gender: 'Male', address: '654 Cedar Lane', contactNumber: '7778889999' } },
  { id: 6, attributes: { name: 'Sarah Johnson', email: 'sarah.johnson@gmail.com', dob: '1996-12-05', gender: 'Female', address: '987 Birch Boulevard', contactNumber: '8889990000' } },
  { id: 7, attributes: { name: 'David Lee', email: 'david.lee@gmail.com', dob: '2002-08-18', gender: 'Male', address: '135 Willow Way', contactNumber: '9990001111' } },
  { id: 8, attributes: { name: 'Laura Martinez', email: 'laura.martinez@gmail.com', dob: '1995-09-29', gender: 'Female', address: '246 Spruce Street', contactNumber: '0001112222' } },
  { id: 9, attributes: { name: 'James Miller', email: 'james.miller@gmail.com', dob: '2003-04-25', gender: 'Male', address: '357 Fir Avenue', contactNumber: '1112223333' } },
  { id: 10, attributes: { name: 'Nancy Wilson', email: 'nancy.wilson@gmail.com', dob: '1994-06-14', gender: 'Female', address: '468 Redwood Road', contactNumber: '2223334444' } },
];

const StudentList = () => {
  const [students, setStudents] = useState(dummyStudents);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', dob: '', gender: '', address: '', contactNumber: '' });
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const editFormRef = useRef(null);

  // Regular expression for validating Gmail addresses
  const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  // Function to handle search
  const handleSearch = () => {
    const searchLowerCase = searchTerm.toLowerCase();
    return students.filter(student => 
      student.attributes.name.toLowerCase().includes(searchLowerCase) || 
      student.id.toString().includes(searchTerm)
    );
  };

  const handleCreateStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.dob && newStudent.gender && newStudent.address && newStudent.contactNumber) {
      if (!gmailPattern.test(newStudent.email)) {
        setError('Email must be a Gmail address.');
        return;
      }
      if (newStudent.contactNumber.length !== 10 || isNaN(newStudent.contactNumber)) {
        setError('Contact number must be 10 digits.');
        return;
      }
      setError('');
      const newId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
      const createdStudent = { id: newId, attributes: newStudent };
      setStudents([...students, createdStudent]);
      setNewStudent({ name: '', email: '', dob: '', gender: '', address: '', contactNumber: '' });
    } else {
      setError('All fields are required.');
    }
  };

  const handleUpdateStudent = () => {
    if (editingStudent && editingStudent.attributes.name && editingStudent.attributes.email && editingStudent.attributes.dob && editingStudent.attributes.gender && editingStudent.attributes.address && editingStudent.attributes.contactNumber) {
      if (!gmailPattern.test(editingStudent.attributes.email)) {
        setError('Email must be a Gmail address.');
        return;
      }
      if (editingStudent.attributes.contactNumber.length !== 10 || isNaN(editingStudent.attributes.contactNumber)) {
        setError('Contact number must be 10 digits.');
        return;
      }
      setError('');
      const updatedStudents = students.map(student =>
        student.id === editingStudent.id ? { ...editingStudent } : student
      );
      setStudents(updatedStudents);
      setEditingStudent(null);
      if (editFormRef.current) {
        editFormRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setError('All fields are required.');
    }
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    if (editFormRef.current) {
      editFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container component={Paper} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Student List
      </Typography>

      {/* Search Input */}
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Search by Name or ID"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Error Message */}
      {error && (
        <Typography color="error" variant="body1" style={{ marginBottom: '20px' }}>
          {error}
        </Typography>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Contact Number</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {handleSearch().map(student => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.attributes.name}</TableCell>
              <TableCell>{student.attributes.email}</TableCell>
              <TableCell>{student.attributes.dob}</TableCell>
              <TableCell>{student.attributes.gender}</TableCell>
              <TableCell>{student.attributes.address}</TableCell>
              <TableCell>{student.attributes.contactNumber}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditStudent(student)}>Edit</Button>
                <Button onClick={() => handleDeleteStudent(student.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div style={{ marginTop: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Add New Student
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Name"
              value={newStudent.name}
              onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Email"
              value={newStudent.email}
              onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              value={newStudent.dob}
              onChange={e => setNewStudent({ ...newStudent, dob: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Gender"
              select
              value={newStudent.gender}
              onChange={e => setNewStudent({ ...newStudent, gender: e.target.value })}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Address"
              value={newStudent.address}
              onChange={e => setNewStudent({ ...newStudent, address: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Contact Number"
              value={newStudent.contactNumber}
              onChange={e => setNewStudent({ ...newStudent, contactNumber: e.target.value })}
              inputProps={{ pattern: "\\d{10}" }} // Restrict to 10 digits
              helperText="Contact number must be 10 digits"
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleCreateStudent}>
              Add Student
            </Button>
          </Grid>
        </Grid>
      </div>

      {editingStudent && (
        <div ref={editFormRef} style={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Edit Student
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Edit Name"
                value={editingStudent.attributes.name}
                onChange={e => setEditingStudent({ ...editingStudent, attributes: { ...editingStudent.attributes, name: e.target.value } })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Edit Email"
                value={editingStudent.attributes.email}
                onChange={e => setEditingStudent({ ...editingStudent, attributes: { ...editingStudent.attributes, email: e.target.value } })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Edit Date of Birth"
                type="date"
                value={editingStudent.attributes.dob}
                onChange={e => setEditingStudent({ ...editingStudent, attributes: { ...editingStudent.attributes, dob: e.target.value } })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Edit Gender"
                select
                value={editingStudent.attributes.gender}
                onChange={e => setEditingStudent({ ...editingStudent, attributes: { ...editingStudent.attributes, gender: e.target.value } })}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Edit Address"
                value={editingStudent.attributes.address}
                onChange={e => setEditingStudent({ ...editingStudent, attributes: { ...editingStudent.attributes, address: e.target.value } })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Edit Contact Number"
                value={editingStudent.attributes.contactNumber}
                onChange={e => setEditingStudent({ ...editingStudent, attributes: { ...editingStudent.attributes, contactNumber: e.target.value } })}
                inputProps={{ pattern: "\\d{10}" }} // Restrict to 10 digits
                helperText="Contact number must be 10 digits"
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button variant="contained" color="primary" onClick={handleUpdateStudent}>
                Update Student
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
};

export default StudentList;
