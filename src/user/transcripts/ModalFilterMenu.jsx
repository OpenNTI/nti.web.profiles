
import { Button as _button } from '@nti/web-core';
import { Prompt } from '@nti/web-commons';
import { useStoreValue } from '@nti/lib-store';

import FilterMenu from './table/filters/FilterMenu';
import { PropGrabber } from './userawarded/Dialog';
import { t } from './Container';

//#region paint
const Button = styled(_button).attrs({ plain: true })`
	color: var(--primary-grey);
	&.confirm {
		color: var(--primary-blue);
	}
`;

const Container = styled.div`
	height: 100%;
	background-color: white;
`;

const TitleBar = styled.div`
	height: 50px;
	font-weight: normal;
	border-bottom: solid 1px #ddd;
	display: flex;
	align-items: center;
	justify-content: space-between;

	& > :is(:first-child, :last-child) {
		flex: 0 1 70px;
	}
`;

const Title = styled.div`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: var(--primary-grey);
	font: bold 1.125rem var(--legacy-header-font-family);
`;
//#endregion

export function ModalFilterMenu({ onDismiss }) {
	const { resetTypeFilters, setDateFilter } = useStoreValue();
	const doReset = () => {
		setDateFilter(null);
		resetTypeFilters();
	};

	return (
		<Prompt.Dialog
			className="transcript-filter-modal"
			onBeforeDismiss={onDismiss}
			css={css`
				dialog {
					width: 100%;
					height: 100%;
				}
			`}
		>
			<PropGrabber>
				{props => (
					<Container className="filter-menu-container">
						<TitleBar>
							<Button className="reset" onClick={doReset}>
								{t('reset')}
							</Button>
							<Title>{t('filterHeader')}</Title>
							<Button
								confirm
								className="confirm"
								onClick={props.onDismiss}
							>
								{t('confirm')}
							</Button>
						</TitleBar>
						<FilterMenu
							fullScreenDatePicker
							css={css`
								width: 100%;
								height: calc(100% - 40px);
							`}
						/>
					</Container>
				)}
			</PropGrabber>
		</Prompt.Dialog>
	);
}
