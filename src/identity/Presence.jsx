import { User, useToggle } from '@nti/web-commons';

import { ensureStates } from './utils';
import { MenuSeparator } from './menus';
import {
	Check,
	Dot,
	Edit,
	Header,
	Item,
	Label,
	LabelEditor,
} from './Presence.parts';

export function PresenceSelect(props) {
	const [pref] = User.usePreference('ChatPresence');
	const { Active, Available, Away, DND, Offline } = ensureStates(pref);

	return (
		<>
			<>
				<Header>My Status</Header>
				{[Available, Away, DND].map((state, i) => (
					<PresenceState
						key={i}
						state={state}
						selected={Active.show === state.show}
					/>
				))}
				<PresenceState state={Offline} editable={false} />
			</>
			<MenuSeparator />
		</>
	);
}

function PresenceState({ selected, state, editable = true }) {
	const [editing, edit] = useToggle();

	function setStatus(v) {
		state.status = v;
		edit(false);
	}

	return (
		<Item selected={selected} active={editing}>
			<Check />
			{editing ? (
				<LabelEditor
					defaultValue={state.defaultLabel}
					value={state.status || state.defaultLabel}
					onCancel={edit}
					onSave={setStatus}
				/>
			) : (
				<>
					<Label>{state.status}</Label>
					{editable && <Edit onClick={edit} />}
					<Dot presence={state.presence} />
				</>
			)}
		</Item>
	);
}
