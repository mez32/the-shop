import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import { listProducts } from '../actions/productActions.js'
import Product from '../components/Product'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import Paginate from '../components/Paginate.js'
import ProductCarousel from '../components/ProductCarousel.js'
import Meta from '../components/Meta.js'

const HomeScreen = () => {
	const match = useParams()
	const dispatch = useDispatch()

	const keyword = match.keyword
	const pageNumber = match.pagenumber || 1

	const productList = useSelector((state) => state.productList)
	const { loading, error, products, pages, page } = productList

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber))
	}, [dispatch, keyword, pageNumber])

	return (
		<>
			<Meta title='Welcome to TheShop | Home' />
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to='/' className='btn btn-light'>
					Go Back
				</Link>
			)}
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
				</>
			)}
		</>
	)
}

export default HomeScreen
