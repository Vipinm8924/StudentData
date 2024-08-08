import React from 'react';
import StudentList from './StudentList';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <StudentList />
    </>
  );
}

export default App;



// import React, { useState } from 'react';
// import StudentForm from './StudentForm';

// const App = () => {
//   const [students, setStudents] = useState([]);
//   const [editingStudent, setEditingStudent] = useState(null);

//   const handleCreateStudent = (newStudent) => {
//     setStudents([...students, newStudent]);
//     setEditingStudent(null); // Clear editing state
//   };

//   const handleUpdateStudent = (updatedStudent) => {
//     setStudents(students.map(student => 
//       student.id === updatedStudent.id ? updatedStudent : student
//     ));
//     setEditingStudent(null); // Clear editing state
//   };

//   return (
//     <div>
//       <h1>Student Management System</h1>
//       <StudentForm 
//         handleCreateStudent={handleCreateStudent} 
//         handleUpdateStudent={handleUpdateStudent}
//         editingStudent={editingStudent}
//         setEditingStudent={setEditingStudent}
//       />
//     </div>
//   );
// };

// export default App;
