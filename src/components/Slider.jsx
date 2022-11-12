import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

const Slider = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://png.pngtree.com/thumb_back/fw800/background/20190221/ourmid/pngtree-green-fresh-fruit-theme-avocado-image_17597.jpg"
                    alt="First slide"
                />
                <Carousel.Caption style={{background: 'white'}}>
                    <h3 style={{ color: ' black' }}>Trái cây giải nhiệt</h3>
                    <p style={{ color: ' black' }}>Siêu giảm giá lên đến 30%</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-fresh-mango-blue-minimalist-banner-image_183513.jpg"
                    alt="Second slide"
                />
                <Carousel.Caption style={{background: 'white'}}>
                    <h2 style={{ color: ' black' }}>Trái cây giải nhiệt</h2>
                    <p style={{ color: ' black' }}>Siêu giảm giá lên đến 30%</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://tayoka.vn/uploads/Banner/jjj.jpg"
                    alt="Third slide"
                />
                <Carousel.Caption style={{background: 'white'}}>
                    <h3 style={{ color: ' black' }}>Trái cây giải nhiệt</h3>
                    <p style={{ color: ' black' }}>Siêu giảm giá lên đến 30%</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Slider