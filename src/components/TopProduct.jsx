import { React, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { featureProduct, listProducts } from '../actions/productActions'

const TopProduct = () => {
    const dispatch = useDispatch()

    const { products } = useSelector(state => state.productList)
    const { feature } = useSelector(state => state.productFeature)

    useEffect(() => {
        dispatch(featureProduct())
        dispatch(listProducts())
    }, [dispatch])

    // Filter Product
    const arrVegetable = []
    const filterVegetable = () => {
        products?.forEach(item => {
            if (item?.category?._id === '6340fd68642d3366418d8d67') {
                arrVegetable.push(item)
            }
        });
    }
    filterVegetable()

    return (
        <div>
            <h4 className="pt-5 pb-3">Rau, củ Đà Lạt <span style={{ color: 'red' }}>NỔI BẬT</span></h4>
            <Row id='productlist' style={{ border: 'solid 2px #f5f5f5', borderRadius: '10px' }}>
                {arrVegetable?.slice(0, 6).map(product => (
                    <Col key={product.id} sm={0} md={0} lg={4} xl={2} className='px-1 pb-2'>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
            {feature?.product?.length > 0 &&
                <div>
                    <h4 className="pt-5 pb-3">Sản phẩm bán chạy <i style={{ color: 'red' }} className='fab fa-hotjar'></i></h4>
                    <Row id='productlist' style={{ border: 'solid 2px #f5f5f5', borderRadius: '10px' }}>
                        {feature?.product?.map(product => (
                            <Col key={product.id} sm={0} md={0} lg={4} xl={2} className='px-1 pb-2'>
                                <Product product={product} />
                                <p style={{ background: '#ff3030', color: '#f5f5f5', borderRadius: '5px' }} className='text-center my-2 mx-0 px-0 py-2'>Đã bán {product.sold}</p>
                            </Col>
                        ))}
                    </Row>
                </div>
            }
            <h4 className="pt-5 pb-3">Sản phẩm <span style={{ color: 'red' }}>MỚI</span></h4>
            <Row id='productlist' style={{ border: 'solid 2px #f5f5f5', borderRadius: '10px' }}>
                {products?.reverse()?.slice(0, 12)?.map(product => (
                    <Col key={product.id} sm={0} md={0} lg={4} xl={2} className='px-1 pb-2'>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default TopProduct