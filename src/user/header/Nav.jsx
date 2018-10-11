import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {List} from '@nti/web-commons';

import {LOCALE_PATHS} from '../constants';

import NavLink from './NavLink';

const t = scoped(LOCALE_PATHS.NAV, {
	about: 'About',
	activity: 'Activity',
	achievements: 'Achievements',
	memberships: 'Memberships',
	transcripts: 'Transcripts'
});


export default class ProfileHeaderNav extends React.Component {
	static propTypes = {
		entity: PropTypes.object.isRequired
	}


	render () {
		const {entity} = this.props;

		return (
			<nav>
				<List.ResponsiveInline className="profile-header-nav">
					<NavLink object={entity} context="about" title={t('about')} exact/>
					<NavLink object={entity} context="activity" title={t('activity')} />
					<NavLink object={entity} context="achievements" title={t('achievements')} />
					<NavLink object={entity} context="memberships" title={t('memberships')} />
					{entity.hasLink('transcript')
						? (<NavLink object={entity} context="transcripts" title={t('transcripts')} />)
						: null
					}
				</List.ResponsiveInline>
			</nav>
		);
	}
}

// import React from 'react';
// import PropTypes from 'prop-types';
// import {scoped} from '@nti/lib-locale';
// import {LinkTo} from '@nti/web-routing';
// import {Layouts} from '@nti/web-commons';

// const {Responsive} = Layouts;

// import {LOCALE_PATHS} from '../constants';
// import {getRoutes} from '../Router';

// import MoreItemsMenu from './MoreItemsMenu';

// const t = scoped(LOCALE_PATHS.NAV, {
// 	about: 'About',
// 	activity: 'Activity',
// 	achievements: 'Achievements',
// 	memberships: 'Memberships',
// 	transcripts: 'Transcripts',
// });

// const visible = ({visible: v}) => v;
// const localeKey = name => name.split('.').slice(-1)[0]; // e.g. 'nti-web-profile.user-profile.NAV.about' => 'about'

// const mobileTabs = ['about', 'activity', 'memberships']; // visible tabs on mobile

// function mobileSort ({name: aName}, {name: bName}) {
// 	const a = localeKey(aName);
// 	const b = localeKey(bName);

// 	return mobileTabs.includes(a) && !mobileTabs.includes(b)
// 		? -1
// 		: mobileTabs.includes(b) && !mobileTabs.includes(a)
// 			? 1
// 			: mobileTabs.indexOf(localeKey(a)) - mobileTabs.indexOf(localeKey(b));
// }

// export default class Nav extends React.Component {

// 	static propTypes = {
// 		entity: PropTypes.object.isRequired
// 	}

// 	isMobile = x => Responsive.isMobile(x)
// 	isDesktop = x => !this.isMobile(x)

// 	getRoutes = () => this.routes = this.routes || getRoutes(this.props.entity).filter(visible);

// 	renderMobile = () => {
// 		const mobileRoutes = this.getRoutes().sort(mobileSort);
// 		const tabs = mobileRoutes.slice(0, mobileTabs.length);
// 		const menuItems = mobileRoutes.slice(mobileTabs.length);
// 		const getLabel = ({name}) => t(localeKey(name));

// 		return (
// 			[...this.renderRoutes(tabs), <MoreItemsMenu key="menu" items={menuItems} getLabel={getLabel} />]
// 		);
// 	}

// 	renderDesktop = () => {
// 		return this.renderRoutes(this.getRoutes());
// 	}

// 	renderRoutes = (routes) => {
// 		return (
// 			routes
// 				.map(({name, path}) => {
// 					const label = t(localeKey(name));
// 					return (
// 						<LinkTo.Name key={path} name={name} data-title={label} activeClassName="active">{label}</LinkTo.Name>
// 					);
// 				})
// 		);
// 	}

// 	render () {
// 		return (
// 			<Responsive.Container tag="nav" className="profile-tabs">
// 				<Responsive.Item query={this.isMobile} render={this.renderMobile}/>
// 				<Responsive.Item query={this.isDesktop} render={this.renderDesktop}/>
// 			</Responsive.Container>
// 		);
// 	}
// }
