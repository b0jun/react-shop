import { Carousel } from 'antd';
import React from 'react';

const ImageSlider = (props) => {
	return (
		<Carousel autoplay>
			{props.images.map((image, index) => (
				<div key={index}>
					<img
						src={`http://localhost:5000/${image}`}
						style={{ width: '100%', maxHeight: '150px' }}
						alt={`img-${index}`}
					/>
				</div>
			))}
		</Carousel>
	);
};

export default ImageSlider;
