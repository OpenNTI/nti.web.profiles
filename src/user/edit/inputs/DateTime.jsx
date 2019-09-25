import React from 'react';
import {Input} from '@nti/web-commons';

export default class DateTimeInput extends React.PureComponent {
	static handles = ({type}) => type === 'datetime'

	render () {		
		return (
			<Input.Date precision={Input.Date.Precision.month} {...this.props} />
		);
	}
}