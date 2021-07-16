import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';

function LandingPage() {
	const { Meta } = Card;

	const [Products, setProducts] = useState([]);

	useEffect(() => {
		let body = {};
		axios.post('/api/product/products', body).then((response) => {
			if (response.data.success) {
				setProducts(response.data.productInfo);
			} else {
				alert('상품 목록을 불러올 수 없습니다.');
			}
		});
	}, []);

	const renderCards = Products.map((product, index) => {
		return (
			<Col lg={6} md={8} xs={24} key={index}>
				<Card
					cover={
						<img
							style={{ width: '100%', height: '150px' }}
							src={`http://localhost:5000/${product.images[0]}`}
						/>
					}
				>
					<Meta title={product.price} description={`$${product.price}`} />
				</Card>
			</Col>
		);
	});

	return (
		<div style={{ width: '75%', margin: '3rem auto' }}>
			<div style={{ textAlign: 'center' }}>
				<h2>
					Let's Travel Anywhere <Icon type="rocket" />
				</h2>
			</div>
			<Row gutter={[16, 16]}>{renderCards}</Row>
		</div>
	);
}

export default LandingPage;
