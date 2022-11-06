import { React, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Col, Row, Card, Button } from 'react-bootstrap'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { listSuppllierDetails } from '../../actions/supplierActions';
import { CATEGORY_UPDATE_RESET } from '../../constants/productConstants'

const SupplierDetailAdminScreen = () => {
    const [isCopied, setIsCopied] = useState(false);

    const supplierId = useParams().id

    const dispatch = useDispatch()

    const { loading, error, supplier } = useSelector(state => state.supllierDetail)
    console.log('==', supplier)


    useEffect(() => {
        dispatch(listSuppllierDetails(supplierId))
    }, [dispatch, supplierId])

    // Copy Text
    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px' }} className='px-5'>
            <Link to='/admin/supplierlist' style={{ textDecoration: 'none' }}>
                <Button variant="outline-success" className='my-3 d-flex justify-content-center align-items-center'>
                    <i className="fas fa-chevron-left"></i>
                    <p className='my-0' style={{marginLeft: '10px'}}>Quay lại</p>
                </Button>
            </Link>
            <FormContainer>
                <h5 className='d-flex justify-content-center py-3'>Chi tiết thông tin danh mục sản phẩm</h5>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    (
                        <Card className='mb-5'>
                            <Card.Header className='py-0 pt-3'>
                                <Row>
                                    <h6>ID danh mục</h6>
                                    <Row>
                                        <p className='mx-0' style={{ width: 'auto' }}>{supplier._id}</p>
                                        <CopyToClipboard text={supplier._id} onCopy={onCopyText}>
                                            <span className='px-0' style={{ width: 'auto', cursor: 'pointer' }}>{isCopied ? "Copied!" : <i className="fas fa-copy"></i>}</span>
                                        </CopyToClipboard>
                                    </Row>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <div>
                                    <Row>
                                        <h6>Tên nhà cung cấp</h6>
                                        <p>{supplier.name}</p>
                                    </Row>
                                    {/* <Row>
                                        <Col>
                                            <h6>Ngày tạo</h6>
                                            <Row>
                                                <Col xl={4}>
                                                    <p>{category.createdAt?.slice(0, 10)}</p>
                                                </Col>
                                                <Col>
                                                    <p>{category.createdAt?.slice(11, 19)}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <h6>Cập nhật lần cuối</h6>
                                            <Row>
                                                <Col xl={4}>
                                                    <p>{category.updatedAt?.slice(0, 10)}</p>
                                                </Col>
                                                <Col>
                                                    <p>{category.updatedAt?.slice(11, 19)}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row> */}
                                </div>
                            </Card.Body>
                        </Card>
                    )}
            </FormContainer>
        </div>
    )
}

export default SupplierDetailAdminScreen