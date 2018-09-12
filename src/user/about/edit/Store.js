import {Stores} from '@nti/lib-store';

export default class Store extends Stores.BoundStore {

	static deriveBindingFromProps = ({entity, user}) => entity || user

	set = (name, value) => {
		super.setImmediate(name, value);
	}

	clear () {
		super.clear(true);
	}

	load = async () => {
		this.clear();
	}
}
