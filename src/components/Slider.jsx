import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

const Slider = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://res.cloudinary.com/disyupqea/image/upload/v1669380530/samples/314080531_650185179927291_7635782716441580856_n_iky47m.jpg?fbclid=IwAR0RlAuP4-NsmUeM2Pbk6k-tQzYCkJ4F23ZAoWB6tOTeihVDnSszDXZHO7g"
                    alt="slider 1"
                />
                {/* <Carousel.Caption style={{ background: 'white', width: '200px', margin: '0 auto' }}>
                    <Link to='/product' style={{ color: ' black', textDecoration: 'none' }}>Mua ngay</Link>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://res.cloudinary.com/disyupqea/image/upload/v1669380520/samples/312603814_439453235046097_7890864319024743328_n_frvp39.jpg?fbclid=IwAR0zifybEciGEv90STWNSZTk1de7BiLLF_3SGKjwDTGIRgBDHrk2p6LU8Ew"
                    alt="slide 2"
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