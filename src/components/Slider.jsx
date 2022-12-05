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
                        <h1 style={{ color: '#2f3394', background: 'linear-gradient(to right, #fa9a46, #d4ead3, #cbfaf1)', borderRadius: '20px' }}>Hải sản tươi sống</h1>
                        <h2 style={{ color: '#2f3394' }}>Tôm hùm Alaska</h2>
                        <h5 style={{ color: 'red' }}>Giá chỉ từ 1.199.000 VNĐ / con</h5><br />
                        <Button style={{ background: '#f7cc00', textDecoration: 'none', color: '#2f3394', padding: '1% 2%', borderRadius: '20px', border: '2px solid #2f3394' }} to='/product/634252c659b54cdfd8e514a1'>Mua ngay</Button>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
            {/* <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://res.cloudinary.com/dkzuyi8fq/image/upload/v1670243151/Untitled-3_qoewb5.jpg"
                    alt="slide 2"
                />
                <Carousel.Caption style={{ background: 'white', width: '200px', margin: '0 auto' }}>
                    <Link style={{ color: ' black', textDecoration: 'none' }}>Mua ngay</Link>
                </Carousel.Caption>
            </Carousel.Item> */}
            {/* <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://scontent.fsgn13-4.fna.fbcdn.net/v/t1.15752-9/315518306_1842183709451623_2481865459714243335_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_ohc=NaIObc7hR9MAX9WlyZ-&_nc_ht=scontent.fsgn13-4.fna&oh=03_AdTLbEFtab7ktU5qoAve7TZXfnXltwcI-iIZC05Byn5U5Q&oe=63A06DF6"
                    alt="Third slide"
                />
                <Carousel.Caption style={{ background: 'white', width: '200px', margin: '0 auto' }}>
                    <Link style={{ color: ' black', textDecoration: 'none' }}>Mua ngay</Link>
                </Carousel.Caption>
            </Carousel.Item> */}
        </Carousel>
    );
}

export default Slider