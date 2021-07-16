import { Checkbox, Collapse } from 'antd';
import React, { useState } from 'react';
const { Panel } = Collapse;

const CheckBox = (props) => {
	const [Checked, setChecked] = useState([]);

	const onToggle = (value) => {
		// 누른 것의 Index를 구하고
		const currentIndex = Checked.indexOf(value);

		// 전체 Checked된 State에서 현재 누른 Checkbox가 이미 있다면
		const newChecked = [...Checked];

		if (currentIndex === -1) {
			newChecked.push(value);
			// 빼주고
		} else {
			newChecked.splice(currentIndex, 1);
		}

		// State 넣어준다.
		setChecked(newChecked);
		props.onFilters(newChecked);
	};

	const renderCheckboxLists = () =>
		props.list?.map((value, index) => (
			<div style={{ marginRight: 10, display: 'inline' }} key={index}>
				<Checkbox
					onChange={() => onToggle(value._id)}
					checked={Checked.indexOf(value._id) === -1 ? false : true}
				/>
				<>{value.name}</>
			</div>
		));

	return (
		<Collapse defaultActiveKey={['0']}>
			<Panel header="Continents" key="1">
				{renderCheckboxLists()}
			</Panel>
		</Collapse>
	);
};

export default CheckBox;
