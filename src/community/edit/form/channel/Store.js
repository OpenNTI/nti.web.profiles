import {Stores} from '@nti/lib-store';

export default class ChannelFieldStore extends Stores.BoundStore {
	load () {
		if (this.binding.register) { this.binding.register(this); }

		const {channel} = this.binding;

		this.set({
			pinned: channel.pinned,
			readOnly: !channel.isModifiable,

			title: channel.title,
			titleError: null,
			
			description: channel.description,
			descriptionError: null,
			
			canDelete: channel.canDelete,
			deleted: false,
		});
	}

	cleanup () {
		if (this.binding.unregister) { this.binding.unregister(this); }
	}

	setTitle (title) {
		this.setImmediate({title, tittleError: null});
	}

	setDescription (description) {
		this.setImmediate({description, descriptionError: null});
	}

	delete () {
		this.set({
			deleted: true
		});
	}

	save () {}
}