import { React, useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '../actions/orderActions'

const MyOrder = () => {

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList
    console.log('==', orders);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrder())
    }, [dispatch])

    

    return (
        <div>
            <h1>Lịch sử đơn hàng</h1>
            <ListGroup>
                <ListGroup.Item>

                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default MyOrder