import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

const Slider = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://scontent.fsgn8-4.fna.fbcdn.net/v/t1.15752-9/314080531_650185179927291_7635782716441580856_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_ohc=OVXH_GaXxVQAX8uLBR4&_nc_ht=scontent.fsgn8-4.fna&oh=03_AdSze6z0-zRil8gOYv11nFNe_nGoVcrzS1tkEbdN37Txkw&oe=63A06322" alt="slider 1"
                />
                {/* <Carousel.Caption style={{ background: 'white', width: '200px', margin: '0 auto' }}>
                    <Link to='/product' style={{ color: ' black', textDecoration: 'none' }}>Mua ngay</Link>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://scontent.fsgn13-2.fna.fbcdn.net/v/t1.15752-9/312603814_439453235046097_7890864319024743328_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=VAWknaE6LiYAX_n_JG2&_nc_ht=scontent.fsgn13-2.fna&oh=03_AdT87VVBZFIfIs4dhtY5etitcdYyAB4Yh4ADzJFogJYO7A&oe=63A060A7"
                    alt="Second slide"
                />
                {/* <Carousel.Caption style={{ background: 'white', width: '200px', margin: '0 auto' }}>
                    <Link style={{ color: ' black', textDecoration: 'none' }}>Mua ngay</Link>
                </Carousel.Caption> */}
            </Carousel.Item>
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