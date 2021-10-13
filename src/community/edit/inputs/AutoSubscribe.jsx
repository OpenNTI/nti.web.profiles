import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { Models } from '@nti/lib-interfaces';
import { scoped } from '@nti/lib-locale';
import { Input, Text, Errors } from '@nti/web-commons';

import Styles from './AutoSubscribe.css';

const CommunityModel = Models.entities.Community;

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.edit.inputs.AutoSubscribe', {
	label: 'Auto-Join New Users',
	description:
		'When a new user creates an account, automatically add them to this community.',
});

CommunityAutoSubscribeInput.propTypes = {
	className: PropTypes.string,
	value: PropTypes.object,
	onChange: PropTypes.func,
	error: PropTypes.any,
};
export default function CommunityAutoSubscribeInput({
	className,
	value,
	onChange,
	error,
}) {
	const setSiteAutoSubscribe = checked => {
		onChange(checked ? CommunityModel.SiteAutoSubscribe : null);
	};

	return (
		<label className={cx('auto-subscribe', className)}>
			<div className={cx('field')}>
				<div className={cx('message')}>
					<Text.Base className={cx('label')}>{t('label')}</Text.Base>
					<Text.Base className={cx('description')}>
						{t('description')}
					</Text.Base>
				</div>
				<Input.Toggle
					value={Boolean(value)}
					onChange={setSiteAutoSubscribe}
				/>
			</div>
			{error && <Errors.Message error={error} />}
		</label>
	);
}
