import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import { Button } from "@nti/web-core";

import Styles from './EditAssetButton.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.edit.inputs.EditAssetButton', {
	edit: 'Edit',
});

EditAssetButton.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func,
};
export default function EditAssetButton({ className, onClick }) {
	return (
		<Button
			className={cx('edit-asset-button', className)}
			onClick={onClick}
		>
			<i className={cx('icon-image', 'icon')} />
			<Text.Base className={cx('change')}>{t('edit')}</Text.Base>
		</Button>
	);
}
