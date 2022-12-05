import React from 'react'
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

const Slider = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <Link style={{ textDecoration: 'none' }} to='/product/634252c659b54cdfd8e514a1'>
                    <img
                        className="d-block w-100"
                        src="https://res.cloudinary.com/dkzuyi8fq/image/upload/v1670245610/Untitled-3_qepqos.jpg"
                        alt="slider 1"
                    />
                    <Carousel.Caption style={{ marginBottom: '1%', width: '30%', margin: '0 auto' }}>
                        <h2 style={{ color: '#2f3394' }}>Tôm hùm Alaska</h2>
                        <h5 style={{ color: 'red' }}>Giá chỉ từ 1.199.000 VNĐ / con</h5><br />
                        <Button style={{ background: '#f7cc00', textDecoration: 'none', color: '#2f3394', padding: '1% 2%', borderRadius: '20px', border: '2px solid #2f3394' }} to='/product/634252c659b54cdfd8e514a1'>Mua ngay</Button>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
            <Carousel.Item>
                <Link style={{ textDecoration: 'none' }} to='/product/634252c659b54cdfd8e514a1'>
                    <img
                        className="d-block w-100"
                        src="https://res.cloudinary.com/dkzuyi8fq/image/upload/v1670245610/Untitled-3_qepqos.jpg"
                        alt="slider 1"
                    />
                    <Carousel.Caption style={{ marginBottom: '1%', width: '30%', margin: '0 auto' }}>
                        <h2 style={{ color: '#2f3394' }}>Tôm hùm Alaska</h2>
                        <h5 style={{ color: 'red' }}>Giá chỉ từ 1.199.000 VNĐ / con</h5><br />
                        <Button style={{ background: '#f7cc00', textDecoration: 'none', color: '#2f3394', padding: '1% 2%', borderRadius: '20px', border: '2px solid #2f3394' }} to='/product/634252c659b54cdfd8e514a1'>Mua ngay</Button>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
            <Carousel.Item>
                <Link style={{ textDecoration: 'none' }} to='/product/63424f2359b54cdfd8e5144b'>
                    <img
                        className="d-block w-100"
                        src="https://res.cloudinary.com/dkzuyi8fq/image/upload/v1670248076/d%C3%A2u_wkjdqg.jpg"
                        alt="slider 2"
                    />
                </Link>
            </Carousel.Item>
        </Carousel>
    );
}

export default Slider