import { Theme } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';


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
};

export default function ChatIcon ( { onClick } ) {
	const theme = Theme.useThemeProperty('icon');

	return (
		<div className={styles.container} ref={ref}>
			<div className={cx(styles.icon, styles[theme])} onClick={onClick}/>
		</div>
	);
}
