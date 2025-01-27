import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { postData } from '../service/apiservice';

function AddUserForm({ isAdmin }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let endpoint = 'users/create-user/';
        if (isAdmin) {
            endpoint = 'users/create-admin/';
        }
        postData(endpoint, formData)
            .then((data) => {
                console.log('User added:', data);
            })
            .catch((error) => {
                console.error('Error adding user:', error);
            });
    };

    return (

        <Form onSubmit={handleSubmit}>
            {/* First Name */}
            <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            {/* Last Name */}
            <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            {/* Username */}
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit">
                Add User
            </Button>
        </Form>

    );
}

export default AddUserForm;
