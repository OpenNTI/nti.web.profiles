import { User, useToggle, useService, Button } from '@nti/web-commons';

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
	const service = useService();

	const { Active, Available, Away, DND, Offline } = ensureStates(pref);

	function select(state) {
		console.log(state);
	}

	return !service.capabilities.canChat ? null : (
		<>
			<>
				<Header>My Status</Header>
				{[Available, Away, DND, Offline].map((state, i) => (
					<PresenceState
						key={i}
						state={state}
						selected={pref && Active.status === state.status}
						editable={state.editable}
						onClick={select}
					/>
				))}
			</>
			<MenuSeparator />
		</>
	);
}

function PresenceState({ selected, state, editable = true, onClick }) {
	const [editing, edit] = useToggle();
	const label = state.status || state.defaultLabel;

	function setStatus(v) {
		state.status = v;
		edit(false);
	}

	return (
		<Button
			plain
			as={Item}
			selected={selected}
			active={editing}
			onClick={() => onClick?.(state)}
		>
			<Check />
			{editing ? (
				<LabelEditor
					defaultValue={state.defaultLabel}
					value={label}
					onCancel={edit}
					onSave={setStatus}
				/>
			) : (
				<>
					<Label>{label}</Label>
					{editable && <Edit onClick={edit} />}
					<Dot presence={state.presence} />
				</>
			)}
		</Button>
	);
}
