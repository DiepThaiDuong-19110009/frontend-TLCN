import { React, useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button } from 'react-bootstrap'
import { listProducts } from '../actions/productActions';

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

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listProducts())
    }, [])

    const navigate = useNavigate()

    getDataSearch(products)

    const [selectedOptions, setSelectedOptions] = useState('');

    const handleSubmit = () => {
        // console.log('==', selectedOptions);
        products.find(prod => {
            if (prod.name === selectedOptions) {
                navigate(`/product/${prod._id}`)
            }
        })
    }

    return (
        <>
            <div className='d-flex align-items-center py-0 px-3 shadow-sm  bg-white rounded' style={{ background: '#ffffff', borderRadius: '10px', border: 'solid 1px #3CB371' }}>
                <div className='w-100'>
                    <Autocomplete disablePortal options={myOptions.sort()} onChange={(event, value) => setSelectedOptions(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputProps={{ ...params.InputProps, disableUnderline: true }}
                                placeholder='Nhập tên sản phẩm cần tìm, ví dụ: Cà chua'
                            />
                        )}
                    />
                </div>
                <div>
                    <Button onClick={handleSubmit} style={{ background: 'transparent', border: 'none' }}>
                        <i style={{ color: 'green' }} class="fas fa-search py-2"></i>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Search