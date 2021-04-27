import { User } from '@nti/web-commons';

export const Container = styled.div`
	cursor: pointer;
	width: 70px;
	height: 70px;
	display: flex;
	align-items: center;
	justify-content: center;

	img,
	svg {
		width: 100%;
	}

	&:global(.flyout-open) {
		background-color: white;
		box-shadow: -1px 0 0 0 #dcdcdc;
		transition: background-color 0.3s, box-shadow 0.3s;
	}
`;

export const Box = styled.div`
	position: relative;
	width: 42px;
	height: 42px;
`;

export const Dot = styled(User.Presence).attrs({ me: true })`
	position: absolute;
	right: 2px;
	bottom: 2px;
`;
