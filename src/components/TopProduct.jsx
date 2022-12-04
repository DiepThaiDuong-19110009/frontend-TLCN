import { React, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'

const TopProduct = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { products } = productList
    console.log('===', products)

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    // Filter Product
    const arrVegetable = []
    const filterVegetable = () => {
        products.forEach(item => {
            if(item?.category?._id === '6340fd68642d3366418d8d67'){
                arrVegetable.push(item)
            }
        });
    }
    filterVegetable()

    return (
        <div>
            <h4 className="pt-5 pb-3">Rau, củ Đà Lạt</h4>
            <Row id='productlist' style={{ border: 'solid 2px #f5f5f5', borderRadius: '10px' }} className="">
                {arrVegetable.slice(0, 6).map(product => (
                    <Col key={product.id} sm={0} md={0} lg={4} xl={2} className='px-1 pb-2'>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
            <h4 className="pt-5 pb-3">Sản phẩm <span style={{color: 'red'}}>MỚI</span></h4>
            <Row id='productlist' style={{ border: 'solid 2px #f5f5f5', borderRadius: '10px' }} className="">
                {products?.reverse()?.slice(0, 12).map(product => (
                    <Col key={product.id} sm={0} md={0} lg={4} xl={2} className='px-1 pb-2'>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default TopProduct