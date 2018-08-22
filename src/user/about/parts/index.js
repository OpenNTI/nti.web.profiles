import About from './About';
import Education from './Education';
import Empty from './Empty';
import Professional from './Professional';
import Interests from './Interests';

export default function getPartsFor (user) {
	return isProfileEmpty(user)
		? [Empty]
		: [
			About,
			Education,
			Professional,
			Interests
		];
}

function isProfileEmpty (user) {
	return false;
}
