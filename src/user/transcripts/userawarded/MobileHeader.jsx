import { Button } from '@nti/web-core';

import t from './strings';

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
			<div
				className="controls"
				css={css`
					height: 50px;
					line-height: 50px;
					font-weight: 300;
					position: relative;
					text-align: center;
					background-color: white;
					border-bottom: solid 1px #ddd;
					display: flex;
				`}
			>
				<Button className="cancel" onClick={onCancel} plain>
					{t('cancel')}
				</Button>
				<div
					className="header"
					css={css`
						border-bottom: solid 1px #ddd;
						border: none;
						color: var(--primary-grey);
						font-family: var(--legacy-header-font-family);
						font-size: 26px;
						font-weight: 300;
						line-height: 2.8125rem;
						margin-bottom: 0.5rem;
						overflow: hidden;
						position: relative;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 50%;
						@media (max-width: 600px) {
							font-size: 1.125rem;
							font-weight: bold;
							margin: 0 auto;
						}
					`}
				>
					{t('awardCredit')}
				</div>
				<Button className="save" onClick={onSave} plain>
					{t('save')}
				</Button>
			</div>
		</div>
	);
}
