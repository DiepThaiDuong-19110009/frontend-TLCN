import React from 'react'
import Pagination from 'react-bootstrap/Pagination';

const Paginations = () => {
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }
    // console.log('==', items)
    return (
        <div className='d-flex justify-content-center'>
            <Pagination>{items}</Pagination>
        </div>
    )
}

export default Paginations