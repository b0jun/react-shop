import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';

const { Panel } = Collapse;

const RadioBox = (props) => {
	const [Value, setValue] = useState('0');

	const renderRadioBoxLists = () =>
		props.list?.map((value) => (
			<Radio key={value._id} value={`${value._id}`}>
				{value.name}
			</Radio>
		));

	const onChangeRadio = (event) => {
		setValue(event.target.value);
		props.onFilters(event.target.value);
	};

	return (
		<Collapse defaultActiveKey={['0']}>
			<Panel header="price" key="1">
				<Radio.Group onChange={onChangeRadio} value={Value}>
					{renderRadioBoxLists()}
				</Radio.Group>
			</Panel>
		</Collapse>
	);
};

export default RadioBox;
