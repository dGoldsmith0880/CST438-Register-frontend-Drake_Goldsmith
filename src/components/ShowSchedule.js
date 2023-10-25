import React, { useState, useEffect } from 'react';
import AddCourse from './AddCourse';
import { SERVER_URL, SEMESTERS } from '../constants';

const ShowSchedule = () => {
    const params = new URLSearchParams(window.location.search);
    const termId = params.get('termId');
    const [courses, setCourses] = useState([]); // List of courses
    const [message, setMessage] = useState(''); // Status message

    useEffect(() => {
        // Called once after initial render
        fetchCourses(termId);
    }, [termId]);

    // GET enrolled courses for the given term
    const fetchCourses = (termId) => {
        const { year, semester } = SEMESTERS[termId];
        console.log('fetchCourses ' + year + ' ' + semester);
        
        // Get the JWT token from sessionStorage
        const token = sessionStorage.getItem('jwt');

        fetch(`${SERVER_URL}/schedule?year=${year}&semester=${semester}`, {
            headers: {
                'Authorization': token, // Add the Authorization header with the JWT token
            },
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setCourses(data);
        })
        .catch((err) => {
            console.log('exception fetchCourses ' + err);
            setMessage('Exception. ' + err);
        });
    }

    // Add course
    const addCourse = (course_id) => {
        setMessage('');
        console.log('start addCourse');
        
        // Get the JWT token from sessionStorage
        const token = sessionStorage.getItem('jwt');

        fetch(`${SERVER_URL}/schedule/course/${course_id}`, {
            method: 'POST',
            headers: {
                'Authorization': token, // Add the Authorization header with the JWT token
            },
        })
        .then(res => {
            if (res.ok) {
                console.log('addCourse ok');
                setMessage('Course added.');
                fetchCourses(termId);
            } else {
                console.log('error addCourse ' + res.status);
                setMessage('Error. ' + res.status);
            }
        })
        .catch(err => {
            console.error('exception addCourse ' + err);
            setMessage('Exception. ' + err);
        });
    }

    // Drop course
    const dropCourse = (event) => {
        setMessage('');
        const row_id = event.target.parentNode.parentNode.rowIndex - 1;
        console.log('drop course ' + row_id);
        const enrollment_id = courses[row_id].id;

        if (window.confirm('Are you sure you want to drop the course?')) {
            
            // Get the JWT token from sessionStorage
            const token = sessionStorage.getItem('jwt');

            fetch(`${SERVER_URL}/schedule/${enrollment_id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token, // Add the Authorization header with the JWT token
                },
            })
            .then(res => {
                if (res.ok) {
                    console.log('drop ok');
                    setMessage('Course dropped.');
                    fetchCourses(termId);
                } else {
                    console.log('drop error');
                    setMessage('Error dropCourse. ' + res.status);
                }
            })
            .catch(err => {
                console.log('exception dropCourse ' + err);
                setMessage('Exception. ' + err);
            });
        }
    }

    const headers = ['Course', 'Section', 'Title', 'Times', 'Building', 'Room', 'Grade', ' '];
    const { semester, year } = SEMESTERS[termId];

    if (courses.length === 0) {
        return (
            <div>
                <h3>No Enrolled Courses {semester} {year}</h3>
                <h4>{message}</h4>
                <AddCourse addCourse={addCourse} />
            </div>
        );
    } else {
        return (
            <div margin="auto">
                <h3>Enrolled Courses {semester} {year}</h3>
                <h4>{message}</h4>
                <table className="Center">
                    <thead>
                        <tr>
                            {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((row, idx) => (
                            <tr key={idx}>
                                <td>{row.courseId}</td>
                                <td>{row.section}</td>
                                <td>{row.title}</td>
                                <td>{row.times}</td>
                                <td>{row.building}</td>
                                <td>{row.room}</td>
                                <td>{row.grade}</td>
                                <td><button type="button" margin="auto" onClick={dropCourse}>Drop</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <AddCourse addCourse={addCourse} />
            </div>
        );
    }
}

export default ShowSchedule;
