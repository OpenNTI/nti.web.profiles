import React, { useEffect, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Hooks, Prompt } from '@nti/web-commons';
import { Create } from '@nti/web-discussions';

import {composeLayoutProvider} from './parts';
import List from './List';
import Toolbar from './Toolbar';

const RecessedList = styled(List)`
	overflow: auto;
	max-height: 400px;
	margin: -20px;
	padding: 20px;

	/* prevent scrollbar from pushing to two columns.
	The gap variable is from fallout of having to
	support safari and its lack of support of flex-gap */
	padding-right: calc(17px - var(--gap));
`;

const RecessedToolbar = styled(Toolbar)`
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

// Fake page that indicates it has more data so that our loading placeholder shows while we are typing.
const LOADING = Object.assign([], {hasMore: true});

function DiscussionPicker ({course, onSelect}) {
	const community = course.getCommunity();
	Hooks.useChanges(community);
	const [firstChannel] = community;
	const [{
		create,
		newTopic,
		selected,
		selectedChannel = firstChannel,
		search,
	}, dispatch] = useReducer(reducer, {});

	const {searchChanging, searchTerm} = useSearching(search);

	const list = useMemo(
		() => create ? null : searchChanging ? LOADING : selectedChannel?.getIterable({
			sortOn: 'createdTime',
			sortOrder: 'descending',
			searchTerm
		}),
		[
			create,
			selectedChannel,
			searchChanging,
			searchTerm,
		]
	);

	Hooks.useChanges(list);

	moveNewTopicIntoSelection(dispatch, newTopic, list);
	fireOnSelect(selected, onSelect);

	return(
		<>
			<RecessedToolbar
				community={community}
				currentChannel={selectedChannel}
				onChangeChannel={x => dispatch({selectedChannel: x})}
				onSearch={x => dispatch({search: x})}
			/>

			{list && (
				<RecessedList
					items={list}
					selected={selected}
					searchTerm={searchTerm}
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

}

DiscussionPicker.propTypes = {
	course: PropTypes.object,
	onSelect: PropTypes.func
};

export default composeLayoutProvider(DiscussionPicker);


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


function useSearching (searchInput) {
	const searchTerm = Hooks.useDebounce(searchInput);
	return {
		searchTerm,
		searchChanging: searchTerm !== searchInput
	};
}
