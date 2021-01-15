import { Theme } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

const styles = css`
	.container {
		padding: 23px;
	}

	.icon {
		&::after {
			content: "";
			display: block;
			background-position: center;
			width: 21px;
			height: 24px;
			opacity: 1;
			background-image: url("./assets/icon-dark.svg");
		}

		&:focus {
			outline: 0;
		}
	}

	.light::after {
		background-image: url("./assets/icon-white.svg");
	}
`;

ChatIcon.propTypes = {
	onClick: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
};

export default function ChatIcon ( { onClick, visible, children } ) {
	const child = React.Children.only(children);

	const theme = Theme.useThemeProperty('icon');

	return (
		<>
			{visible &&
			<div className={styles.container}>
				<div className={cx(styles.icon, styles[theme])} onClick={onClick}/>
			</div>}

			{child}
		</>
	);
}
