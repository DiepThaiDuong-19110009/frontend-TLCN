import { React, useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button, Row } from 'react-bootstrap'
import { listProducts } from '../actions/productActions';

const Search = () => {

    const productList = useSelector(state => state.productList)
    const { products } = productList

    const myOptions = [];
    const getDataSearch = (product) => {
        product.forEach(prod => {
            myOptions.push(prod.name)
        })
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listProducts())
        //eslint-disable-next-line 
    }, [])

    const navigate = useNavigate()

    getDataSearch(products)

    const [selectedOptions, setSelectedOptions] = useState('');

    const handleSubmit = () => {
        products?.forEach(prod => {
            if (prod.name === selectedOptions) {
                navigate(`/product/${prod._id}`)
            }
        })
    }

    return (
        <Row className='mx-1'>
            <div className='d-flex align-items-center py-0 px-0 shadow-sm bg-white' style={{ background: '#ffffff', border: 'solid 1px green', borderRadius: '0px' }}>
                <div className='w-100'>
                    <Autocomplete disablePortal options={myOptions.sort()} onChange={(event, value) => setSelectedOptions(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputProps={{ ...params.InputProps, disableUnderline: true }}
                                placeholder='Nhập tên sản phẩm cần tìm, ví dụ: Cà chua'
                                style={{paddingLeft: '20px'}}
                            />
                        )}
                    />
                </div>
                <div style={{background: 'green'}}>
                    <Button className='my-0 mx-0' onClick={handleSubmit} style={{ background: 'green', border: 'solid 1px green', borderRadius: '0px' }}>
                        <i style={{ color: 'white' }} className="fas fa-search py-2"></i>
                    </Button>
                </div>
            </div>
        </Row>
    )
}

export default Search
