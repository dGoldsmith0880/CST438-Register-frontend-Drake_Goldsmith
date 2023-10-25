import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import { SERVER_URL } from '../constants';

const AdminHome = () => {
    const [students, setStudents] = useState([]); // State variable to store the list of students
    const [message, setMessage] = useState(''); // State variable for status messages

    useEffect(() => {
        fetchStudents(); // Fetch the list of students when the component mounts
    }, []);

    // Function to fetch the list of students from the server
    const fetchStudents = () => {
        const token = sessionStorage.getItem('jwt'); // Get the JWT token from sessionStorage

        fetch(`${SERVER_URL}/student`, {
            headers: {
                'Authorization': token, // Add the Authorization header with the JWT token
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch students (${response.status})`);
                }
                return response.json();
            })
            .then((data) => {
                // Update the 'students' state with the fetched data
                setStudents(data);
            })
            .catch((error) => {
                console.error(`Error fetching students: ${error}`);
                setMessage('Error fetching students. Please try again.');
            });
    };

    // Function to add a new student
    const addStudent = (student) => {
        const token = sessionStorage.getItem('jwt'); // Get the JWT token from sessionStorage
        setMessage('');
        console.log('start addStudent');

        fetch(`${SERVER_URL}/student`, {
            method: 'POST', // HTTP POST request to add a new student
            headers: {
                'Authorization': token, // Add the Authorization header with the JWT token
                'Content-Type': 'application/json', // Specify JSON data in the request body
            },
            body: JSON.stringify(student), // Send the student data in the request body as JSON
        })
            .then((res) => {
                if (res.ok) {
                    console.log('addStudent ok');
                    setMessage('Student added.');
                    fetchStudents(); // Refresh the student list after adding
                } else {
                    console.log('error addStudent ' + res.status);
                    setMessage('Error. ' + res.status);
                }
            })
            .catch((err) => {
                console.error('exception addStudent ' + err);
                setMessage('Exception. ' + err);
            });
    };

    // Function to edit an existing student
    const editStudent = (updatedStudent) => {
        const token = sessionStorage.getItem('jwt'); // Get the JWT token from sessionStorage
        setMessage('');
        const student_id = students[0].studentId; // Assuming you're editing the first student
        console.log('start editStudent');

        fetch(`${SERVER_URL}/student/${student_id}`, {
            method: 'PUT', // HTTP PUT request to update the student
            headers: {
                'Authorization': token, // Add the Authorization header with the JWT token
                'Content-Type': 'application/json', // Specify JSON data in the request body
            },
            body: JSON.stringify(updatedStudent), // Send the updated student data as JSON
        })
            .then((res) => {
                if (res.ok) {
                    console.log('editStudent ok');
                    setMessage('Student edited.');
                    fetchStudents(); // Refresh the student list after editing
                } else {
                    console.log('error editStudent ' + res.status);
                    setMessage('Error. ' + res.status);
                }
            })
            .catch((err) => {
                console.error('exception editStudent ' + err);
                setMessage('Exception. ' + err);
            });
    };

    // Function to delete a student
    const deleteStudent = (event) => {
        const token = sessionStorage.getItem('jwt'); // Get the JWT token from sessionStorage
        setMessage('');
        const row_id = event.target.parentNode.parentNode.rowIndex - 1;
        console.log("drop course " + row_id);
        const student_id = students[row_id].studentId;

        if (window.confirm('Are you sure you want to delete the student?')) {
            fetch(`${SERVER_URL}/student/${student_id}?force=true`, {
                method: 'DELETE', // HTTP DELETE request to delete the student
                headers: {
                    'Authorization': token, // Add the Authorization header with the JWT token
                },
            })
                .then((res) => {
                    if (res.ok) {
                        console.log('delete ok');
                        setMessage('Student deleted.');
                        fetchStudents(); // Refresh the student list after deletion
                    } else {
                        console.log('delete error');
                        setMessage('Error deleteStudent. ' + res.status);
                    }
                })
                .catch((err) => {
                    console.log('exception deleteStudent ' + err);
                    setMessage('Exception. ' + err);
                });
        }
    };

    const headers = ['Student_Id', 'Name', 'email', 'Status', 'Status Code', ' ', ' '];

    return (
        <div margin="auto">
            <h3>Students List</h3>
            <h4 id="message">{message}</h4>
            <table className="Center">
                <thead>
                    <tr>
                        {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {students.map((row, idx) => (
                        <tr key={idx}>
                            <td>{row.studentId}</td>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>{row.status}</td>
                            <td>{row.statusCode}</td>
                            <td>
                                <EditStudent id="editStudent" initialStudent={row} editStudent={editStudent} />
                            </td>
                            <td>
                                <button id="deleteStudent" type="button" margin="auto" onClick={deleteStudent}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AddStudent id="addStudent" addStudent={addStudent} />
        </div>
    );
}

export default AdminHome;
