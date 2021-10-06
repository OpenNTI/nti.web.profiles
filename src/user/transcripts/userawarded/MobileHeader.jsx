import { Button as _button } from '@nti/web-core';

import t from './strings';

const TitleBar = styled.div`
	height: 50px;
	font-weight: normal;
	background-color: white;
	border-bottom: solid 1px #ddd;
	display: flex;
	align-items: center;
	justify-content: space-between;

	& > :is(:first-child, :last-child) {
		flex: 0 1 70px;
	}
`;

const Title = styled.div`
	color: var(--primary-grey);
	font: 300 26px var(--legacy-header-font-family);
	margin-bottom: 0.5rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	@media (max-width: 600px) {
		font-size: 1.125rem;
		font-weight: bold;
	}
`;

const Button = styled(_button).attrs({ plain: true })`
	color: var(--primary-grey);
	&.confirm {
		color: var(--primary-blue);
	}
`;

export function MobileHeader({ onCancel, onSave }) {
	return (
		<div
			className="short-header"
			css={css`
				display: none;
				@media (max-width: 600px) {
					display: block;
				}
			`}
		>
			<TitleBar>
				<Button className="cancel" onClick={onCancel}>
					{t('cancel')}
				</Button>
				<Title>{t('awardCredit')}</Title>
				<Button className="save" onClick={onSave} confirm>
					{t('save')}
				</Button>
			</TitleBar>
		</div>
	);
}
