import { React, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Col, Row, Card, Image, Accordion } from 'react-bootstrap'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { listProductDetails } from '../../actions/productActions'
import { CATEGORY_UPDATE_RESET } from '../../constants/productConstants'

const ProductDetailAdminScreen = () => {
    const [isCopied, setIsCopied] = useState(false);

    const productId = useParams().id

    const dispatch = useDispatch()

    const { loading, error, product } = useSelector(state => state.productDetails)
    console.log('==', product)


    useEffect(() => {
        dispatch(listProductDetails(productId))
    }, [dispatch, productId])

    // Copy Text
    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px' }} className='px-5'>
            <Link to='/admin/productlist' className='btn btn-light mt-3'>Quay lại</Link>
            <FormContainer>
                <h5 className='d-flex justify-content-center py-3'>Chi tiết thông tin danh mục sản phẩm</h5>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    (
                        <Card className='mb-5'>
                            <Card.Header>
                                <Row>
                                    <h6>ID danh mục</h6>
                                    <Row>
                                        <p className='mx-0' style={{ width: 'auto' }}>{product._id}</p>
                                        <CopyToClipboard text={product._id} onCopy={onCopyText}>
                                            <span className='px-0' style={{ width: 'auto', cursor: 'pointer' }}>{isCopied ? "Copied!" : <i className="fas fa-copy"></i>}</span>
                                        </CopyToClipboard>
                                    </Row>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <div>
                                    <Row>
                                        <Col>
                                            <h6>Tên sản phẩm</h6>
                                            <p>{product.name}</p>
                                        </Col>
                                        <Col>
                                            <h6>Danh mục</h6>
                                            <p>{product.category?.name}</p>
                                        </Col>
                                        <Col>
                                            <h6>Nhà cung cấp</h6>
                                            <p>{product.supplier?.id?.name}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <h6>Hình ảnh sản phẩm</h6>
                                        <Image style={{ width: '30%', margin: '10px auto', border: '1px solid #f1f1f1', borderRadius: '15px' }} src={product.photo}></Image>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h6>Số lượng nhập</h6>
                                            <p>{product.supplier?.quantityImport}</p>
                                        </Col>
                                        <Col>
                                            <h6>Số lượng đã bán</h6>
                                            <p>{product.sold}</p>
                                        </Col>
                                        <Col>
                                            <h6>Số lượng tồn kho</h6>
                                            <p>{product.supplier?.quantityImport - product.sold}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h6>Giá nhập</h6>
                                            <p>{product.supplier?.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                        </Col>
                                        <Col>
                                            <h6>Giá bán</h6>
                                            <p>{product.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <h6>Mô tả chi tiết</h6>
                                        <p>{product.description}</p>
                                    </Row>
                                    <Row>
                                        <h6>Đánh giá</h6>
                                        <p>{product.rating} sao</p>
                                    </Row>
                                    <Row>
                                        <h6>Lượt đánh giá</h6>
                                        <p>{product.reviews?.length} lượt</p>
                                    </Row>
                                    <Row>
                                        <h6>Chi tiết đánh giá</h6>
                                        <Accordion defaultActiveKey="0">
                                            <Accordion.Item eventKey="1" className='p-0 mb-3 mt-1'>
                                                <Accordion.Header className='p-0'>Xem chi tiết</Accordion.Header>
                                                <Accordion.Body>
                                                    {
                                                        product.reviews?.map(review => (
                                                            <Row>
                                                                <Col>
                                                                    <h6>Tên người đánh giá</h6>
                                                                    <Row>
                                                                        <p className='mx-0' style={{ width: 'auto' }}>{review.user?._id}</p>
                                                                        <CopyToClipboard text={product._id} onCopy={onCopyText}>
                                                                            <span className='px-0' style={{ width: 'auto', cursor: 'pointer' }}>{isCopied ? "Copied!" : <i className="fas fa-copy"></i>}</span>
                                                                        </CopyToClipboard>
                                                                    </Row>
                                                                    <p>{review.user?.name}</p>
                                                                </Col>
                                                                <Col>
                                                                    <h6>Nội dung đánh giá</h6>
                                                                    <p>{review.comment}</p>
                                                                </Col>
                                                                <Col>
                                                                    <h6>Số sao đánh giá</h6>
                                                                    <p>{review.rating}</p>
                                                                </Col>
                                                            </Row>
                                                        ))
                                                    }
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h6>Ngày tạo</h6>
                                            <Row>
                                                <Col xl={5}>
                                                    <p>Ngày: {product.createdAt?.slice(0, 10)}</p>
                                                </Col>
                                                <Col>
                                                    <p>Vào lúc: {product.createdAt?.slice(11, 19)}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <h6>Cập nhật lần cuối</h6>
                                            <Row>
                                                <Col xl={5}>
                                                    <p>Ngày: {product.updatedAt?.slice(0, 10)}</p>
                                                </Col>
                                                <Col>
                                                    <p>Vào lúc: {product.updatedAt?.slice(11, 19)}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
            </FormContainer>
        </div>
    )
}

export default ProductDetailAdminScreen