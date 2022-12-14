import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Form, Card, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import 'react-medium-image-zoom/dist/styles.css'
import Zoom from 'react-medium-image-zoom'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { listProductDetails, updateProduct, listCategory } from '../../actions/productActions'
import { listSupplier } from '../../actions/supplierActions'
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'

const ProductEditScreen = () => {
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    const [nameSupplier, setNameSupllier] = useState('')
    const [importQuantity, setImportQuantity] = useState('')
    const [importPrice, setImportPrice] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [nameCategory, setNameCategory] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [sold, setSold] = useState(0)

    const productId = useParams().id

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const { categories } = useSelector(state => state.categoryList)

    const { suppliers } = useSelector(state => state.supplierList)

    const { error, product } = useSelector(state => state.productDetails)

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    let arrGetCateId = []
    const getCategoryId = () => {
        categories.forEach(cate => {
            if (nameCategory === cate.name) {
                arrGetCateId.push(cate._id)
            }
        })
    }

    getCategoryId()
    let category = arrGetCateId[0]

    let arrGetSupplierId = []
    const getSupplierId = () => {
        suppliers.forEach(supplier => {
            if (nameSupplier === supplier.name) {
                arrGetSupplierId.push(supplier._id)
            }
        })
    }

    getSupplierId()
    let supplier = arrGetSupplierId[0]

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
            window.location.reload()
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
                dispatch(listCategory())
                dispatch(listSupplier())
            } else {
                setPhoto(product.photo)
                setName(product.name)
                setNameSupllier(product.supplier?.id?.name)
                setImportQuantity(product.supplier?.quantityImport)
                setImportPrice(product.supplier?.price)
                setDescription(product.description)
                setPrice(product.price)
                setNameCategory(product.category.name)
                setQuantity(product.quantity)
                setSold(product.sold)
            }
        }
    }, [dispatch, navigate, productId, product, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({ _id: productId, photo, name, supplier: { id: supplier, quantityImport: importQuantity, 
            price: importPrice }, description, price, category, quantity, sold }))
    }

    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px' }} className='px-5'>
            <Link to='/admin/productlist' style={{ textDecoration: 'none' }}>
                <Button variant="outline-success" className='my-3 d-flex justify-content-center align-items-center'>
                    <i className="fas fa-chevron-left"></i>
                    <p className='my-0' style={{marginLeft: '10px'}}>Quay l???i</p>
                </Button>
            </Link>
            <FormContainer>
                <h5 className='d-flex justify-content-center py-3'>Ch???nh s???a th??ng tin s???n ph???m</h5>
                {loadingUpdate ? <Loader /> : errorUpdate ? <Message variant='danger'>{error}</Message> :
                    (
                        <Card className='mb-5'>
                            <Card.Header className='py-0 pt-3'>
                                <Row>
                                    <h6>ID s???n ph???m</h6>
                                    <Row>
                                        <p className='mx-0' style={{ width: 'auto' }}>{product._id}</p>
                                    </Row>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='productimage'>
                                        <Form.Label>H??nh ???nh s???n ph???m</Form.Label>
                                        <Form.Control className='mb-3' type='name' placeholder='???????ng d???n file ???nh' value={photo} onChange={(e) => setPhoto(e.target.value)}></Form.Control>
                                        <Zoom>
                                            <div className='d-flex justify-content-center'>
                                                <img className='p-3 mb-3' style={{ width: '30%', margin: '10px auto', border: '1px solid #f1f1f1', borderRadius: '15px' }} src={photo} alt={name} />
                                            </div>
                                        </Zoom>
                                    </Form.Group>
                                    <Form.Group controlId='productname'>
                                        <Form.Label>T??n s???n ph???m</Form.Label>
                                        <Form.Control className='mb-3' type='name' placeholder='Nh???p t??n s???n ph???m' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='productsupplier'>
                                        <Form.Label>Nh?? cung c???p</Form.Label>
                                        <Form.Select className='mb-3' size="sm" value={nameSupplier} onChange={(e) => setNameSupllier(e.target.value)}>
                                            {suppliers.map(supplier => (
                                                <option>{supplier.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId='productamountsupplier'>
                                        <Form.Label>S??? l?????ng nh???p</Form.Label>
                                        <Form.Control className='mb-3' type='number' min="1" placeholder='Nh???p gi?? s???n ph???m' value={importQuantity} onChange={(e) => setImportQuantity(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='productpricesupplier'>
                                        <Form.Label>Gi?? nh???p</Form.Label>
                                        <Form.Control className='mb-3' type='number' min="1" placeholder='Nh???p gi?? s???n ph???m' value={importPrice} onChange={(e) => setImportPrice(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='productdescription'>
                                        <Form.Label>M?? t??? s???n ph???m</Form.Label>
                                        <Form.Control className='mb-3' as="textarea" rows={5} placeholder="M?? t??? s???n ph???m" value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='productprice'>
                                        <Form.Label>Gi?? s???n ph???m</Form.Label>
                                        <Form.Control className='mb-3' type='number' placeholder='Nh???p gi?? s???n ph???m' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='productcategory'>
                                        <Form.Label>Danh m???c s???n ph???m</Form.Label>
                                        <Form.Select className='mb-3' size="sm" value={nameCategory} onChange={(e) => setNameCategory(e.target.value)}>
                                            {categories.map(cate => (
                                                <option>{cate.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId='productquatity'>
                                        <Form.Label>S??? l?????ng s???n ph???m</Form.Label>
                                        <Form.Control className='mb-3' type='number' placeholder='Nh???p s??? l?????ng s???n ph???m' value={quantity} onChange={(e) => setQuantity(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='productsold'>
                                        <Form.Label>S??? l?????ng s???n ph???m ???? b??n</Form.Label>
                                        <Form.Control className='mb-3' type='number' placeholder='Nh???p s??? l?????ng s???n ph???m ???? b??n' value={sold} onChange={(e) => setSold(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Form.Group className='d-flex justify-content-center py-3'>
                                        <Button type='submit' variant='primary'>C???p nh???t</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    )}
            </FormContainer>
        </div>
    )
}

export default ProductEditScreen
