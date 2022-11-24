import React from 'react'
import { Spinner, Button } from 'react-bootstrap'

const Loader = () => {
    return (
        <div className='d-flex'>
            <Button variant="dark" style={{margin: '50px auto'}} disabled>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    style={{marginRight: '10px'}}
                />
                Đang tải...
            </Button>
        </div>
    )
}

export default Loader
