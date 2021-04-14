import { Menu } from '../menus.jsx';
import { PresenceSelect } from '../Presence';

const styles = stylesheet`
	.wrapper {
		max-width: 300px;
	}
`;

export default {
	title: 'Presence Selection',
	component: PresenceSelect,
};

export function Test() {
	return (
		<Menu className={styles.wrapper}>
			<PresenceSelect />
		</Menu>
	);
}
