import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

const Slider = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://scontent.fsgn10-1.fna.fbcdn.net/v/t1.15752-9/306539332_1495705460841672_6052415495575701737_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_ohc=37DQtMbr-1EAX9HmUFh&_nc_ht=scontent.fsgn10-1.fna&oh=03_AdQmFFWDfaOha_Z3D42VV2JbFahztnjnp9OSEcDqOYlgrQ&oe=636B9722"
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
                    src="https://scontent.fsgn10-1.fna.fbcdn.net/v/t1.15752-9/309907718_1249852619137315_2032329692371238586_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_ohc=CZkHSBe_ItkAX9mE1wc&_nc_ht=scontent.fsgn10-1.fna&oh=03_AdRRvb7ZxHXtZ3NCqJxr1vA-LBcUGr-pI1tIbuloRFLUVQ&oe=636BE261"
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
                    src="https://scontent.fsgn10-1.fna.fbcdn.net/v/t1.15752-9/307112565_635614418073104_8958825575204445034_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=TKVO7JXBtYQAX_aReM8&_nc_ht=scontent.fsgn10-1.fna&oh=03_AdR-5C5JWHEUFSksa9-fRtwK2XZaJtHopCw8RYUhaNoJ_w&oe=636D5348"
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