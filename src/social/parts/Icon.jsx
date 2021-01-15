import { Theme } from '@nti/web-commons';

export default styled('div').attrs(( props ) => ({
	...props,
	theme: Theme.useThemeProperty('icon'),
})
)`
	padding: 23px;

	&::after {
		content: "";
		display: block;
		background-position: center;
		width: 21px;
		height: 24px;
		opacity: 1;
		background-image: url("../assets/icon-dark.svg");
	}

	&:focus {
		outline: 0;
	}

	&.theme-light::after {
		background-image: url("../assets/icon-white.svg");
	}
`;
