import React from 'react';
import { Icons, Input } from '@nti/web-commons';

const SearchIcon = styled('div').attrs({children: <Icons.Search/>})`
	width: 35px;
	border-style: inherit;
	border-color: inherit;
	border-width: 0 0 0 1px;
	border-radius: 0 3px 3px 0;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--tertiary-grey);
	flex: 0 0 auto;

	& > svg {
		transform: translate(1px, 0);
	}
`;

const SearchContainer = styled.div`
	background-color: var(--panel-background-alt);
	border: 1px solid var(--border-grey-light);
	border-radius: 3px;
	display: flex;
	width: 200px;
`;

const SearchInput = styled(Input.Text)`
	border: 0;
	flex: 1 1 auto;
	width: auto;
	min-width: 0;
`;

export default function Search ({placeholder = 'Search', ...props}) {

	return (
		<SearchContainer>
			<SearchInput {...props} placeholder={placeholder} />
			<SearchIcon/>
		</SearchContainer>
	);
}
