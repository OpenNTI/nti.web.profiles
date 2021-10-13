import classnames from 'classnames/bind';

import { AutoSubscribe } from '../../inputs';

import Store from './Store';
import Styles from './Style.css';

const cx = classnames.bind(Styles);

export default function CommunityEditAutoSubscribe({ className, ...props }) {
	const {
		autoSubscribeRule: value,
		setAutoSubscribeRule: onChange,
		autoSubscribeRuleError: error,
	} = Store.useValue();
	return (
		<AutoSubscribe
			{...props}
			className={cx('community-edit-auto-subscribe', className)}
			error={error}
			value={value}
			onChange={onChange}
		/>
	);
}
