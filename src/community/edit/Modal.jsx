import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';

import Styles from './Modal.css';
import Editor from './View';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.edit.modal', {
	header: 'Edit Community',
});

CommunityEditModal.propTypes = {
	onCancel: PropTypes.func,
};
export default function CommunityEditModal(props) {
	const { onCancel } = props;

	return (
		<div className={cx('community-edit-modal')}>
			<div className={cx('modal-header-bar')}>
				<Text.Base className={cx('modal-header')}>
					{t('header')}
				</Text.Base>
				{onCancel && (
					<a
						role="button"
						className={cx('modal-close')}
						onClick={onCancel}
					>
						<i className="icon-light-x" />
					</a>
				)}
			</div>
			<Editor {...props} />
		</div>
	);
}
