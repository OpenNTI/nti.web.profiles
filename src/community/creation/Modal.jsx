import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { decorate } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { Text, Loading, EmptyState, Errors } from '@nti/web-commons';

import Styles from './Modal.css';
import Store from './Store';
import Form from './form';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.creation.Modal', {
	header: 'Create a Community',
	unavailable: 'Unable to create communities at this time.',
	saving: 'Saving...',
});

class CommunityCreationModal extends React.Component {
	static deriveBindingFromProps(props) {
		return {
			onCancel: props.onCancel,
			afterSave: props.afterSave,
		};
	}

	static propTypes = {
		className: PropTypes.string,
		onCancel: PropTypes.func,
		afterSave: PropTypes.func,

		loading: PropTypes.bool,
		available: PropTypes.bool,
		saving: PropTypes.bool,
		error: PropTypes.any,
		cancel: PropTypes.func,
	};

	cancel = e => {
		const { cancel } = this.props;

		e.stopPropagation();
		e.preventDefault();

		if (cancel) {
			cancel();
		}
	};

	render() {
		const { loading, available } = this.props;

		return (
			<Loading.Placeholder
				loading={loading}
				fallback={<Loading.Spinner.Large />}
			>
				{available && this.renderForm()}
				{!available && this.renderUnavailable()}
			</Loading.Placeholder>
		);
	}

	renderUnavailable() {
		return <EmptyState subHeader={t('unavailable')} />;
	}

	renderForm() {
		const { saving, error } = this.props;

		return (
			<div className={cx('community-creation-modal')}>
				<a
					href="#"
					role="button"
					className={cx('close')}
					onClick={this.cancel}
					title="close"
				>
					<i className={cx('icon-bold-x', 'close-icon')} />
				</a>
				<Text.Base as="h1" className={cx('heading')}>
					{t('header')}
				</Text.Base>
				{error && (
					<Errors.Message error={error} className={cx('error')} />
				)}
				<Form />
				{saving && (
					<div className={cx('saving-mask')}>
						<Text.Base className={cx('message')}>
							{t('saving')}
						</Text.Base>
						<Loading.Spinner />
					</div>
				)}
			</div>
		);
	}
}

export default decorate(CommunityCreationModal, [
	Store.connect(['loading', 'available', 'cancel', 'saving', 'error']),
]);
