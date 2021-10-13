import classnames from 'classnames/bind';

import { MembersPreview } from '../../../common';

import Styles from './Sidebar.css';
import Card from './Card';
import ChannelList from './channel-list';
import Identity from './Identity';
import MembersLink from './MembersLink';

const cx = classnames.bind(Styles);

export default function CommunitySidebar(props) {
	return (
		<Card className={cx('community-sidebar')}>
			<Identity {...props} className={cx('side-bar-identity')} />
			<MembersPreview.InlineList
				{...props}
				className={cx('side-bar-members')}
				max={9}
			/>
			<MembersLink {...props} />
			<ChannelList {...props} className={cx('side-bar-channel-list')} />
		</Card>
	);
}
