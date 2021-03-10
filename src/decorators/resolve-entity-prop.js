import React from 'react';
import PropTypes from 'prop-types';

import { HOC } from '@nti/lib-commons';
import { User } from '@nti/web-client';

function getUnresolvedUsername(seed) {
	return 'Anonymous User'; //Do we need to show identifying numbers after Anonymous User?
}

class ResolveEntityProp extends React.Component {
	static propTypes = {
		children: PropTypes.any,

		in: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
			.isRequired,
		out: PropTypes.string,
	};

	state = {};

	componentDidMount() {
		this.fillIn();
	}

	componentDidUpdate(prevProps) {
		if (this.props.in !== prevProps.in) {
			this.fillIn();
		}
	}

	componentWillUnmount() {
		this.unmounted = true;
		this.setState = () => {};
	}

	async fillIn(props = this.props) {
		const task = (this.task = new Date());
		const set = x => task === this.task && this.setState(x);

		const getId = x => (x && x.getID ? x.getID() : x);
		const current = getId(this.state.entity);

		try {
			if (current !== getId(props.in)) {
				const entity = await User.resolve({ entity: props.in });
				set({ entity });
			}
		} catch (e) {
			const unresolvedName = getUnresolvedUsername(
				props.in.username || props.in
			);

			set({
				error: e,
				entity: {
					displayName: unresolvedName,
					username: unresolvedName,
					getID: () => '__unresolvedUser__',
				},
			});
		}
	}

	render() {
		const { entity } = this.state;

		if (!entity) {
			return null;
		}

		const { children, out } = this.props;
		const child = React.Children.only(children);

		return React.cloneElement(child, { [out]: entity });
	}
}

export default function resolveEntityProp(prop = 'entity', propToPass) {
	return Component => {
		const ResolveEntityWrapper = (props, ref) => {
			return (
				<ResolveEntityProp
					{...props}
					in={props[prop]}
					out={propToPass || prop}
				>
					<Component ref={ref} {...props} />
				</ResolveEntityProp>
			);
		};
		const cmp = React.forwardRef(ResolveEntityWrapper);

		const typeName = Component
			? Component.displayName || Component.name
			: '';
		const name = `ResolveEntityProp(${typeName})`;

		HOC.hoistStatics(cmp, Component, name);

		return cmp;
	};
}
