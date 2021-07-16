import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import axios from 'axios';

import FileUpload from '../../utils/FileUpload';

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
	{ key: 1, value: 'Africa' },
	{ key: 2, value: 'Europe' },
	{ key: 3, value: 'Asia' },
	{ key: 4, value: 'North America' },
	{ key: 5, value: 'South America' },
	{ key: 6, value: 'Australia' },
	{ key: 7, value: 'Antarctica' },
];

const UploadProductPage = (props) => {
	const [TitleValue, setTitleValue] = useState('');
	const [DescriptionValue, setDescriptionValue] = useState('');
	const [PriceValue, setPriceValue] = useState(0);
	const [ContinentValue, setContinentValue] = useState(1);
	const [Images, setImages] = useState([]);

	const onTitleChange = (event) => {
		setTitleValue(event.currentTarget.value);
	};

	const onDescriptionChange = (event) => {
		setDescriptionValue(event.currentTarget.value);
	};

	const onPriceChange = (event) => {
		setPriceValue(event.currentTarget.value);
	};

	const onContinentsSelectChange = (event) => {
		setContinentValue(event.currentTarget.value);
	};

	const updateImages = (newImages) => {
		setImages(newImages);
	};

	const onSubmit = (event) => {
		event.preventDefault();

		if (!TitleValue || !DescriptionValue || !PriceValue || !ContinentValue || !Images) {
			return alert('모든 값을 넣어주셔야 합니다.');
		}

		const body = {
			writer: props.user.userData._id, // 로그인 된 사람의 아이디
			title: TitleValue,
			description: DescriptionValue,
			price: PriceValue,
			images: Images,
			continents: ContinentValue,
		};

		axios.post('/api/product', body).then((response) => {
			if (response.data.success) {
				alert('상품 업로드에 성공했습니다.');
				props.history.push('/');
			} else {
				alert('상품 업로드에 실패했습니다.');
			}
		});
	};

	return (
		<div style={{ maxWidth: '700px', margin: '2rem auto' }}>
			<div style={{ textAlign: 'center', marginBottom: '2rem' }}>
				<Title level={2}>여행 상품 업로드</Title>
			</div>
			<Form onSubmit={onSubmit}>
				<FileUpload refreshFunction={updateImages} />
				<br />
				<br />
				<label>이름</label>
				<Input onChange={onTitleChange} value={TitleValue} />
				<br />
				<br />
				<label>설명</label>
				<TextArea onChange={onDescriptionChange} value={DescriptionValue} />
				<br />
				<br />
				<label>가격($)</label>
				<Input onChange={onPriceChange} value={PriceValue} type="number" />
				<br />
				<br />
				<select onChange={onContinentsSelectChange} value={ContinentValue}>
					{Continents.map((item) => (
						<option key={item.key} value={item.key}>
							{item.value}
						</option>
					))}
				</select>
				<br />
				<br />
				<Button onClick={onSubmit}>확인</Button>
			</Form>
		</div>
	);
};

export default UploadProductPage;
