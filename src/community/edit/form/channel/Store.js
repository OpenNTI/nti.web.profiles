import {Stores} from '@nti/lib-store';

export default class ChannelFieldStore extends Stores.BoundStore {
	load () {
		if (this.binding.register) { this.binding.register(this); }
		if (this.channel && this.binding.channel === this.channel) { return; }

		const channel = this.channel = this.binding.channel;

		this.set({
			pinned: channel.pinned,
			readOnly: !channel.isModifiable,

			title: channel.title,
			titleError: null,
			
			description: channel.description,
			descriptionError: null,
			
			canDelete: channel.canDelete,
			doNotPromptOnDelete: channel.doNotPromptOnDelete,
			deleted: false,
		});
	}

	cleanup () {
		if (this.binding.unregister) { this.binding.unregister(this); }
	}

	setTitle (title) {
		this.setImmediate({title, titleError: null});
	}

	setDescription (description) {
		this.setImmediate({description, descriptionError: null});
	}

	delete () {
		this.setImmediate({
			deleted: true
		});
	}

	async save () {
		const {channel} = this;
		const deleted = this.get('deleted');

		if (deleted) {
			return this.deleteChannel();
		}

		const title = this.get('title');
		const description = this.get('description');

		let toSave = null;

		if (title !== channel.title) {
			toSave = toSave || {};
			toSave.title = title; 
		}

		if (description !== channel.description) {
			toSave = toSave || {};
			toSave.description = description;
		}

		if (!toSave) { return; }

		try {
			await channel.save(toSave);
		} catch (e) {
			if (e.field === 'title') { this.set({titleError: e}); }
			if (e.field === 'description') { this.set({descriptionError: e}); }

			throw e;
		}
	}


	async deleteChannel () {
		const {channel} = this;

		if (channel.wasDeleted) { return; }

		try {
			await channel.delete();
		} catch (e) {
			this.set({titleError: e});
			throw e;
		}
	}
}