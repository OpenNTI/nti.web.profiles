import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Styles from './Card.css';

const cx = classnames.bind(Styles);

Card.propTypes = {
	className: PropTypes.string,
	as: PropTypes.string,
};
export default function Card({ className, as: tag, ...otherProps }) {
	const Cmp = tag || 'div';

	return <Cmp className={cx(className, 'community-card')} {...otherProps} />;
}
