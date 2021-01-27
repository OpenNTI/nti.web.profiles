import React, { useEffect, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Hooks, Prompt } from '@nti/web-commons';
import { Create } from '@nti/web-discussions';

import ChannelSelect from './ChannelSelect';
import List from './List';

const TopControls = styled.div`
	background: white;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	margin: -20px -20px 20px;
`;

function reducer ({selected = new Set(), ...state}, {selected: selection,...action}) {
	if (selection) {
		selected = new Set(selected);
		if (selected.has(selection)) {
			selected.delete(selection);
		}
		else {
			if (!action.multiSelect) {
				selected.clear();
			}
			selected.add(selection);
		}
	}
	return {
		selected,
		...state,
		...action
	};
}

const DiscussionPicker = React.forwardRef(({course, onSelect}, ref) => {
	const community = course.getCommunity();
	Hooks.useChanges(community);
	const [firstChannel] = community;
	const [{create, newTopic, selected, selectedChannel = firstChannel, sort = 'createdTime'}, dispatch] = useReducer(reducer, {});

	const list = useMemo(() => create ? null : selectedChannel?.getIterable({SortOn: sort}), [selectedChannel, create]);
	Hooks.useChanges(list);

	moveNewTopicIntoSelection(dispatch, newTopic, list);
	fireOnSelect(selected, onSelect);

	return(
		<>
			<TopControls data-testid="discussion-selection-top-controls">
				<ChannelSelect onChange={x => dispatch({selectedChannel: x})} selected={selectedChannel} community={community}/>
			</TopControls>

			{list && (
				<List
					items={list}
					selected={selected}
					onSelect={x => dispatch({selected: x})}
					onCreate={() => dispatch({create: true})}
				/>
			)}

			{create && (
				<>
					<HideLegacyPrompt/>
					<Prompt.Dialog>
						<Create
							dialog
							initialContainer={[community, selectedChannel]}

							onClose={() => dispatch({create: false})}
							afterSave={(topic) => {
								dispatch({create: false, newTopic: topic});
							}}
						/>
					</Prompt.Dialog>
				</>
			)}
		</>
	);

});

DiscussionPicker.displayName = 'DiscussionPicker';
DiscussionPicker.propTypes = {
	course: PropTypes.object,
	onSelect: PropTypes.func
};

export default DiscussionPicker;


function HideLegacyPrompt () {
	useEffect(() => {
		const prompt = document.querySelector('.prompt-container');
		prompt?.classList.add('x-hidden');
		return () => {
			prompt?.classList.remove('x-hidden');
		};
	});
	return null;
}


function fireOnSelect (selected, onSelect) {
	useEffect(() => {
		if (selected) {
			onSelect([...selected]);
		}
	}, [selected]);
}


function moveNewTopicIntoSelection (dispatch, newTopic, items) {
	useEffect(() => {
		if (newTopic && items) {
			const select = Array.from(items).find(x => x.getID() === newTopic.getID());
			if (select) {
				dispatch({newTopic: null, selected: select});
			}
		}
	}); // always run
}
