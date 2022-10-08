import { React, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Row, Col, Button } from 'react-bootstrap'

const Search = () => {

    const productList = useSelector(state => state.productList)
    const { products } = productList

    // Search
    const myOptions = [];
    const getDataSearch = (product) => {
        product.forEach(prod => {
            myOptions.push(prod.name)
        })
    }

    const navigate = useNavigate()

    getDataSearch(products)

    const [selectedOptions, setSelectedOptions] = useState('');

    const handleSubmit = () => {
        //console.log('==', selectedOptions);
        products.find(prod => {
            if(prod.name == selectedOptions){
                navigate(`/product/${prod._id}`)
            }
        })
    }

    return (
        <Row style={{ border: '1px solid #ccc', borderRadius: '10px' }} className='d-flex justify-content-between p-3 mb-5'>
            <Col xl={10} lg={10} md={10} sm={9}>
                <Autocomplete options={myOptions} onChange={(event, value) => setSelectedOptions(value)}
                    renderInput={(params) => (
                        <TextField {...params} variant="standard" label="Tìm kiếm sản phẩm" />
                    )}
                />
            </Col>
            <Col xl={2} lg={2} md={2} sm={3}>
                <Button className='w-100 h-100' onClick={handleSubmit} variant="success">Tìm kiếm</Button>
            </Col>
        </Row>
    )
}

export default Search