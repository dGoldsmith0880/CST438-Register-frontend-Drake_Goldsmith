import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function AddStudent(props) {

    const [open, setOpen] = useState(false);
    const [studentInfo, setStudentInfo] = useState({
        id: 0,
        name: '',
        email: '',
        statusCode: '',
        status: '',
    });

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
        setStudentInfo({
            ...studentInfo,
            [name]: value, // Update the specific field using its name
        });
    }

    // Function to handle the add action
    const handleAdd = () => {
        // Call the addStudent function with the studentInfo data
        props.addStudent(studentInfo);

        handleClose();
    }

    return (
        <div>
            {/* Button to open the dialog */}
            <Button id="addStudent" variant="outlined" color="primary" style={{ margin: 10 }} onClick={handleClickOpen}>
                Add Student
            </Button>
            {/* Dialog component */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent style={{ paddingTop: 20 }} >
                    {/* Input fields for adding student information */}
                    <TextField autoFocus fullWidth label="Student Id" name="id" onChange={handleChange} />
                    <TextField fullWidth label="Name" name="name" onChange={handleChange} />
                    <TextField fullWidth label="Email" name="email" onChange={handleChange} />
                    <TextField fullWidth label="Status Code" name="statusCode" onChange={handleChange} />
                    <TextField fullWidth label="Status" name="status" onChange={handleChange} />
                </DialogContent>
                <DialogActions>
                    {/* Button to cancel the add action */}
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    {/* Button to confirm and perform the add action */}
                    <Button id="add" color="primary" onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

AddStudent.propTypes = {
    addStudent: PropTypes.func.isRequired,
};

export default AddStudent;
