import './MaybeEmpty.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Uses CSS :empty to show a message if the provided child element is empty.
// The empty message is hidden via CSS by default and displayed via selector:
// .maybe-empty:empty + maybe-empty-message
export default class MaybeEmpty extends React.Component {
	static propTypes = {
		children: PropTypes.element.isRequired,
		message: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
			.isRequired,
	};

	render() {
		const { message, children } = this.props;
		const child = React.Children.only(children);
		const Child = React.cloneElement(child, {
			className: cx('maybe-empty', child.props.className),
		});
		return (
			<>
				{Child}
				<div className="maybe-empty-message">{message}</div>
			</>
		);
	}
}
