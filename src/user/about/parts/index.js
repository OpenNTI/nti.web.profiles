import About from './About';
import Community from './Community';
import District from './District';
import Education from './Education';
import Empty from './Empty';
import Personality from './Personality';
import Professional from './Professional';
import Interests from './Interests';

const PARTS = [
	About,
	Community,
	District,
	Personality,
	Education,
	Professional,
	Interests
];

export default function getPartsFor (user) {
	if (isProfileEmpty(user)) { return [Empty]; }

	return PARTS.filter((part) => !part.shouldShow || part.shouldShow(user));
}

function isProfileEmpty (user) {
	return false;
}
