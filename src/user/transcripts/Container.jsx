import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Button, useReducerState } from '@nti/web-core';
import { Flyout, Prompt } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import { useStoreValue } from '@nti/lib-store';

import Store from './Store';
import Table from './table/View';
import FilterMenu from './table/filters/FilterMenu';
import AggregateTable from './table/aggregate/View';
import { PropGrabber } from './userawarded/Dialog';

const t = scoped('nti-web-profile.transcripts.View', {
	aggregate: 'Summary',
	detailed: 'Detailed',
	csv: 'CSV',
	pdf: 'PDF',
	download: 'Download Transcript',
	addCredit: 'Add Credit',
	credits: 'Credits',
	confirm: 'Done',
	reset: 'Reset',
	filterHeader: 'Filters',
});

export default Store.compose(TranscriptsContentsContainer);

const TriggerButton = styled(Button).attrs({ plain: true })`
	cursor: pointer;
	font-size: 14px;
	display: inline-block;
	margin-right: 0.5rem;
	height: 40px;
	line-height: 40px;
	border: 1px solid #e2e2e2;
	border-radius: 3px;
	padding: 0 1.5rem;
	color: var(--secondary-grey);
	white-space: nowrap;

	i {
		margin-right: 5px;
	}
`;

const Buttons = styled.div`
	display: flex;
	gap: 5px;

	@media (max-width: 475px) {
		flex-direction: column;
	}
`;

const TitleBar = styled.div`
	padding: 1rem 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;

	& > * {
		flex: 1 1 auto;
		&:not(:first-child) {
			flex: 0 0 auto;
		}
	}

	@media (--respond-to-smallest-handhelds) {
		display: flex;
		flex-direction: column;
		gap: 5px;
		margin-bottom: 10px;
		align-items: stretch;
	}
`;

TranscriptsContentsContainer.propTypes = {
	entity: PropTypes.object,
	showSidePanel: PropTypes.bool,
	showFiltersAsModal: PropTypes.bool,
};

function TranscriptsContentsContainer({
	entity,
	showSidePanel,
	showFiltersAsModal,
}) {
	const { dateFilter, loadTranscript, typeFilter } = useStoreValue();
	const [{ show }, setState] = useReducerState({
		/** @type {null|'flyout'|'prompt'|'editor'} */
		show: null,
	});

	useEffect(() => {
		loadTranscript(entity);
	}, [entity]);

	const empty = useIsEmpty();
	const noData = empty && !dateFilter && !typeFilter;
	const cls = cx('nti-profile-transcripts-container', {
		'has-side-panel': showSidePanel,
	});

	return (
		<>
			<div className={cls}>
				<div className="nti-profile-transcripts">
					<AggregateTable entity={entity} />
					<div className="credit-details">
						<TitleBar className={cx('top-controls')}>
							<div className="section-title">{t('credits')}</div>
							<Buttons>
								{!noData &&
									!showSidePanel &&
									(showFiltersAsModal ? (
										<TriggerButton
											className="filter-trigger"
											onClick={() =>
												setState({
													show: 'prompt',
												})
											}
										>
											Filters
										</TriggerButton>
									) : (
										<Flyout.Triggered
											className="transcript-filter"
											trigger={
												<TriggerButton className="filter-trigger">
													Filters
												</TriggerButton>
											}
											horizontalAlign={
												Flyout.ALIGNMENTS.RIGHT
											}
											verticalAlign={
												Flyout.ALIGNMENTS.BOTTOM
											}
											sizing={Flyout.SIZES.MATCH_SIDE}
										>
											<div>
												<FilterMenu canReset />
											</div>
										</Flyout.Triggered>
									))}
								<DownloadButton />
							</Buttons>
						</TitleBar>
						<Content />
					</div>
				</div>
				{showSidePanel && <FilterMenu canReset />}
			</div>
			{show === 'prompt' && (
				<ModalFilterMenu onDismiss={() => setState({ show: null })} />
			)}
		</>
	);
}

function ModalFilterMenu({ onDismiss }) {
	const { resetTypeFilters, setDateFilter } = useStoreValue();
	const doReset = () => {
		setDateFilter(null);
		resetTypeFilters();
	};

	return (
		<Prompt.Dialog
			className="transcript-filter-modal"
			onBeforeDismiss={onDismiss}
		>
			<PropGrabber>
				{props => (
					<div className="filter-menu-container">
						<div className="controls">
							<Button className="reset" onClick={doReset} plain>
								{t('reset')}
							</Button>
							<div className="header">{t('filterHeader')}</div>
							<Button
								className="confirm"
								onClick={props.onDismiss}
								plain
							>
								{t('confirm')}
							</Button>
						</div>
						<FilterMenu fullScreenDatePicker />
					</div>
				)}
			</PropGrabber>
		</Prompt.Dialog>
	);
}

function useIsEmpty() {
	const { items } = useStoreValue();
	return (items || []).filter(x => !x.isAddRow).length === 0;
}

function useIsFiltered() {
	const { dateFilter, typeFilter } = useStoreValue();
	return Boolean(dateFilter || typeFilter);
}

function Content() {
	const empty = useIsEmpty();
	const filtered = useIsFiltered();
	const { items } = useStoreValue();
	return items?.length > 0 ? (
		<div className="table-container">
			<Table />
			{empty && <EmptyMessage filtered={filtered} />}
		</div>
	) : (
		<EmptyMessage filtered={filtered} />
	);
}

function EmptyMessage({ filtered }) {
	return filtered ? (
		<div className="empty-message">No credits match your filter</div>
	) : (
		<div className="empty-message">No credits received yet</div>
	);
}

const DownloadTrigger = React.forwardRef(({ className, ...props }, ref) => {
	const disabled = useIsEmpty();

	return (
		<TriggerButton
			ref={ref}
			className={cx('download', className)}
			{...{ ...props, disabled }}
		>
			<i className="icon-download" />
			<span>{t('download')}</span>
		</TriggerButton>
	);
});

function DownloadButton() {
	const { pdfLink, csvLink } = useStoreValue();
	return (
		<Flyout.Triggered
			autoDismissOnAction
			className="transcript-download"
			trigger={<DownloadTrigger />}
			horizontalAlign={Flyout.ALIGNMENTS.LEFT}
			sizing={Flyout.SIZES.MATCH_SIDE}
		>
			<div>
				<div
					className={cx('download-option', {
						disabled: !csvLink,
					})}
				>
					<a
						target="_blank"
						rel="noopener noreferrer"
						download
						href={csvLink}
					>
						{t('csv')}
					</a>
				</div>
				<div
					className={cx('download-option', {
						disabled: !pdfLink,
					})}
				>
					<a
						target="_blank"
						rel="noopener noreferrer"
						download
						href={pdfLink}
					>
						{t('pdf')}
					</a>
				</div>
			</div>
		</Flyout.Triggered>
	);
}
