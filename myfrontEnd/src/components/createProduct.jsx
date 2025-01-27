import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { postData } from '../service/apiservice';


function CreateProduct() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startingPrice: '',
        biddingEndTime: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postData('products/', formData)  // Adjust the endpoint as per your backend
            .then((data) => {
                console.log('Product created:', data);
                alert('Product created successfully');
            })
            .catch((error) => {
                console.error('Error creating product:', error);
                alert('Error creating product');
            });
    };

    return (
        <Container className="mt-5">
            <h2>Create New Product</h2>
            <Form onSubmit={handleSubmit}>
                {/* Product Name */}
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Enter product description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Starting Price */}
                <Form.Group className="mb-3" controlId="startingPrice">
                    <Form.Label>Starting Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="startingPrice"
                        placeholder="Enter starting price"
                        value={formData.startingPrice}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Bidding End Time */}
                <Form.Group className="mb-3" controlId="biddingEndTime">
                    <Form.Label>Bidding End Time</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        name="biddingEndTime"
                        value={formData.biddingEndTime}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Submit Button */}
                <Button variant="primary" type="submit">
                    Create Product
                </Button>
            </Form>
        </Container>
    );
}

export default CreateProduct;
