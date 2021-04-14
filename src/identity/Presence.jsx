import { User, useToggle } from '@nti/web-commons';

import { MenuSeparator } from './menus';
import {
	Check,
	Dot,
	Edit,
	Header,
	Item,
	Label,
	TextInput,
} from './Presence.parts';

export function PresenceSelect(props) {
	const [pref] = User.usePreference('ChatPresence');
	console.log(pref);
	return (
		<>
			<>
				<Header>My Status</Header>
				<PresenceState presence="available" selected />
				<PresenceState presence="away" />
				<PresenceState presence="dnd" />
				<PresenceState presence="offline" editable={false} />
			</>
			<MenuSeparator />
		</>
	);
}

function PresenceState({ selected, presence, editable = true }) {
	const [editing, edit] = useToggle();

	return (
		<Item selected={selected} active={editing}>
			<Check />
			{editing ? (
				<TextInput
					defaultValue={presence}
					onCancel={edit}
					onSave={edit}
				/>
			) : (
				<>
					<Label>{presence}</Label>
					{editable && <Edit onClick={edit} />}
					<Dot presence={presence} />
				</>
			)}
		</Item>
	);
}
