import cx from 'classnames';

import { scoped } from '@nti/lib-locale';

const Links = styled.ul`
	display: flex;

	> * {
		flex: 0 0 auto;
	}
`;

const Link = styled.a`
	width: 42px;
	height: 42px;
	display: block;
	margin: 0 5px;
	opacity: 0.5;
	text-indent: 100%;
	overflow: hidden;
	white-space: nowrap;
	background-size: contain;
	transition: opacity 0.2s;

	@media (--respond-to-handhelds) {
		width: 2rem;
		height: 2rem;
	}

	&:hover {
		opacity: 1;
	}

	&.twitter {
		background-image: url('./assets/social-twitter.png');
	}

	&.facebook {
		background-image: url('./assets/social-facebook.png');
	}

	&.googleplus {
		background-image: url('./assets/social-google.png');
	}

	&.linkedIn {
		background-image: url('./assets/social-linkedin.png');
	}

	&.instagram {
		background-image: url('./assets/social-instagram.png');
	}
`;

const t = scoped('profile.about.social', {
	facebook: 'Facebook',
	linkedIn: 'LinkedIn',
	twitter: 'Twitter',
	googlePlus: 'Google+',
	instagram: 'Instagram',
});

const socialPropNames = [
	'facebook',
	'linkedIn',
	'twitter',
	'googlePlus',
	'instagram',
];

export default function Social({ className, entity }) {
	const items = socialPropNames
		.map(prop =>
			!entity[prop] ? null : (
				<li key={prop}>
					<Link
						rel="noopener noreferrer"
						target="_blank"
						{...{
							[prop]: true,
							className: cx('social', prop.toLowerCase()),
							href: entity[prop],
						}}
					>
						<span>{t(prop)}</span>
					</Link>
				</li>
			)
		)
		.filter(x => x);

	return (
		items.length > 0 && (
			<Links className={cx('social-links', className)}>{items}</Links>
		)
	);
}
