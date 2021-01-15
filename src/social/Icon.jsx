import { Theme } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

const Icon = styled.div`
	padding: 23px;

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

	&.theme-light::after {
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
			{visible && (
				<Icon onClick={onClick} theme={theme}/>
			)}

			{child}
		</>
	);
}
