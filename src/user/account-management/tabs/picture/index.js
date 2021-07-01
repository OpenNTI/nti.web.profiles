import { useState } from 'react';

import VIEWS from './Views';

const Container = styled.div`
	margin: 10px 20px;
`;

export default function PictureTab () {
	const [view, setView] = useState(0);
	const [props, setProps] = useState({});

	const View = VIEWS[view];

	const handleViewChange = (view, props) => {
		setView(view);
		props ?? setProps(props);
	};

	return (
		<Container>
			<View changeView={handleViewChange}  {...props}/>
		</Container>
	);
}
