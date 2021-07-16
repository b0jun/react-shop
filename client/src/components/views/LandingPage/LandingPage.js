import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import { continents } from './Sections/Datas';

const { Meta } = Card;

function LandingPage() {
	const [Products, setProducts] = useState([]);
	const [Skip, setSkip] = useState(0);
	const [Limit, setLimit] = useState(8);
	const [PostSize, setPostSize] = useState();
	const [Filters, setFilters] = useState({ continents: [], price: [] });

	useEffect(() => {
		let body = { skip: Skip, limit: Limit };
		getProducts(body);
	}, []);

	const renderCards = Products.map((product, index) => {
		return (
			<Col lg={6} md={8} xs={24} key={index}>
				<Card cover={<ImageSlider images={product.images} />}>
					<Meta title={product.price} description={`$${product.price}`} />
				</Card>
			</Col>
		);
	});

	const getProducts = (body) => {
		axios.post('/api/product/products', body).then((response) => {
			if (response.data.success) {
				if (body.loadMore) {
					setProducts([...Products, ...response.data.productInfo]);
				} else {
					setProducts(response.data.productInfo);
				}
				setPostSize(response.data.postSize);
			} else {
				alert('상품 목록을 불러올 수 없습니다.');
			}
		});
	};

	const onLoadMore = () => {
		let skip = Skip + Limit;
		//           0  +   8
		//           8  +   8
		let body = { skip, limit: Limit, loadMore: true };
		getProducts(body);
		setSkip(skip);
	};

	const showFilteredResults = (filters) => {
		let body = { skip: 0, limit: Limit, filters };
		getProducts(body);
		setSkip(0);
	};

	const onFilters = (filters, category) => {
		const newFilters = { ...Filters };
		newFilters[category] = filters;
		showFilteredResults(newFilters);
	};

	return (
		<div style={{ width: '75%', margin: '3rem auto' }}>
			<div style={{ textAlign: 'center' }}>
				<h2>
					Let's Travel Anywhere <Icon type="rocket" />
				</h2>
			</div>
			<CheckBox list={continents} onFilters={(filters) => onFilters(filters, 'continents')} />
			<Row gutter={[16, 16]}>{renderCards}</Row>
			<br />
			{PostSize >= Limit && (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<button onClick={onLoadMore}>더보기</button>
				</div>
			)}
		</div>
	);
}

export default LandingPage;
