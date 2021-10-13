import PropTypes from 'prop-types';

import { Flyout, Icons, Text } from '@nti/web-commons';
import { Button } from "@nti/web-core";
import { scoped } from '@nti/lib-locale';

const t = scoped('nti.web.discussion-selection.ChannelSelect', {
	label: 'Channel',
});

const T = Text.Translator(t);

const TriggerLabel = styled(T.Label).attrs({ localeKey: 'label' })`
	display: block;
	color: var(--secondary-grey);
`;

const Trigger = styled.div`
	height: 3.125rem;
	border: 1px solid var(--border-grey);
	border-width: 0 1px 0 0;
	color: var(--tertiary-grey);
	width: 270px;
	padding: 0 0 0 20px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	position: relative;
	cursor: pointer;
`;

const Arrow = styled(Icons.DisclosureArrow)`
	position: absolute;
	right: 20px;
	top: 50%;
	transform: translateY(-50%);
`;

const List = styled('ul').attrs(
	({ dismissFlyout, onDismiss, ...props }) => props
)`
	width: 280px;
	padding: 10px;
	margin: 0;
	overflow: auto;
	max-height: calc(90vh - var(--flyout-top));
`;

const ListItem = styled(Button).attrs({ as: 'li', plain: true })`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	min-height: 2.75rem;
	padding: 10px;
	margin: 0;
	font-size: 0.875rem;
	font-weight: 600;
	letter-spacing: 0;
	line-height: 1.1875;

	&:not(:last-child) {
		box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
	}
`;

const SubLabel = styled(Text.Label)`
	padding-top: 0.1em;
	color: var(--tertiary-grey);
`;

ChannelSelect.propTypes = {
	onChange: PropTypes.func,
	selected: PropTypes.object,
	community: PropTypes.any,
};

export default function ChannelSelect({ onChange, selected, community }) {
	const trigger = (
		<Trigger>
			<TriggerLabel />
			{selected?.title || 'Loading...'}
			<Arrow />
		</Trigger>
	);

	return (
		<Flyout.Triggered
			autoDismissOnAction
			trigger={trigger}
			horizontalAlign={Flyout.ALIGNMENTS.LEFT}
		>
			<List>
				{[...community].map(channel => (
					<Channel
						channel={channel}
						key={channel.getID()}
						onClick={() => onChange?.(channel)}
					/>
				))}
			</List>
		</Flyout.Triggered>
	);
}

function Channel({ channel, ...props }) {
	return (
		<ListItem {...props}>
			<Text.Base>{channel.title}</Text.Base>
			{channel.section && <SubLabel>{channel.section}</SubLabel>}
		</ListItem>
	);
}
