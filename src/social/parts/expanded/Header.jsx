import PropTypes from 'prop-types';

import { Text } from '@nti/web-commons';

const Header = styled.div`
		border-bottom: 1px solid var(--primary-grey);
		padding: 5px 10px;
		position: relative;
	`,
	Title = styled(Text)`
		color: #fff;
		font-size: 14px;
		font-weight: 200;
	`,
	Close = styled.div`
		position: absolute !important;
		right: 20px;
		top: 7px;
		cursor: pointer;
		color: var(--tertiary-grey);
	`;

PanelHeader.propTypes = {
	onCollapseClick: PropTypes.func.isRequired,
};

export default function PanelHeader({ onCollapseClick }) {
	return (
		<Header>
			<Title>Messenger</Title>
			<Close data-testid="collapse-button" onClick={onCollapseClick}>
				<i className="icon-light-x" />
			</Close>
		</Header>
	);
}
