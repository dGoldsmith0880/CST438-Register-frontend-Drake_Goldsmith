import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const EditStudent = (props) => {
    const [open, setOpen] = useState(false);
    const [student, setStudent] = useState({
        // Initialize a student object with editable fields
        name: '',
        email: '',
        status: '',
        statusCode: '',
    });

    useEffect(() => {
        // Update the student state with the initialStudent prop data
        setStudent({ ...props.initialStudent });
    }, [props.initialStudent]);

    // Function to open the dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Function to close the dialog
    const handleClose = () => {
        setOpen(false);
    };

    // Function to handle changes in input fields
    const handleChange = (event) => {
        // Get the name and value of the changed input field
        const { name, value } = event.target;
        setStudent({
            ...student,
            [name]: value, // Update the specific field using its name
        });
    };

    // Function to handle the edit action
    const handleEdit = () => {
        props.editStudent(student);
        // Close the dialog
        handleClose();
    };

    return (
        <div>
            <Button variant="outlined" color="primary" style={{ margin: 10 }} onClick={handleClickOpen}>
                Edit Student
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Student</DialogTitle>
                <DialogContent style={{ paddingTop: 20 }}>
                    <TextField fullWidth label="Name" name="name" value={student.name} onChange={handleChange} />
                    <TextField fullWidth label="Email" name="email" value={student.email} onChange={handleChange} />
                    <TextField fullWidth label="Status" name="status" value={student.status || ''} onChange={handleChange} />
                    <TextField fullWidth label="Status Code" name="statusCode" value={student.statusCode} onChange={handleChange} />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleEdit}>
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

EditStudent.propTypes = {
    editStudent: PropTypes.func.isRequired,
};

export default EditStudent;
