import classnames from 'classnames/bind';

import Styles from './Styles.css';
import Actions from './Actions';
import Label from './Label';
import Search from './Search';

const cx = classnames.bind(Styles);

export default function CommunityMembersHeader() {
	return (
		<div className={cx('community-members-header')}>
			<Label />
			<Actions />
			<Search />
		</div>
	);
}
