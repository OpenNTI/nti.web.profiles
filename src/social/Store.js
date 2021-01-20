import { Stores } from '@nti/lib-store';
import { getService } from '@nti/web-client';

import { subscribeToIncomingMessage, subscribeToPresenceChange } from './Socket';

const MESSAGE_INBOX = 'RUGDByOthersThatIMightBeInterestedIn';
const CONTENT_ROOT = 'tag:nextthought.com,2011-10:Root';

const BATCH_SIZE = 10;

export default class Store extends Stores.SimpleStore {
	static Singleton = true;

	static setActiveUsers (activeUsers) {
		this.activeUsers = normalizeActiveUsers(activeUsers);
	}

	static updatePresence (username, presence) {
		if (!presence || !username) {return;}

		this.activeUsers[username] = presence.getName();

		this.set({activeUsers: this.activeUsers});
	}

	static removeContact (user) {
		delete this.activeUsers[user.get('Username')];

		this.set({activeUsers: this.activeUsers});
	}

	static selectUser (user) {
		this.set({selectedUser: user.get('Username')});
	}

	static deselectUser () {
		this.set({selectedUser: null});
	}

	static clearUnreadCount (user) {
		this.unreadCounts[user.get('Username')] = 0;

		this.set({unreadCounts: this.unreadCounts});
	}

	static handleWindowNotify (username) {
		this.unreadCounts[username]++;

		this.set({unreadCounts: this.unreadCounts});
	}

	async load () {
		if (this.initialLoad) {return;}
		this.initialLoad = true;

		// Subscribe to incoming messages
		subscribeToIncomingMessage((sender, message) => this.onIncomingMessage(sender, message));

		// Subscribe to presence change
		subscribeToPresenceChange((user, presenceInfo) => this.onPresenceChanged(user, presenceInfo));

		this.set({Loading: true});

		try {
			this.set({activeUsers: this.activeUsers});

			await this.loadConversations();

			this.updateUnread();

		} catch (e) {
			this.set({
				Loading: false,
				Error: e,
			});
		}
	}

	loadConversations = async () => {
		const service = await getService();
		const pageInfo = await service.getPageInfo(CONTENT_ROOT);
		// TODO: check the way to get the url
		this.url = pageInfo.getLink(MESSAGE_INBOX);

		await Promise.all(
			this.get('ActiveUsers').map(
				this.loadConversation
			)
		);
	}

	loadConversation = async (user) => {
		// TODO: check the method of getting the batch of messages for the user
		// TODO: check the service.get url
		const service = await getService();

		const Batches = this.get('Batches') || {}, LastViewed = this.get('LastViewed') || {};

		Batches[user.id] = await service.getBatch(this.url, {
			batchStart: 0,
			batchSize: BATCH_SIZE,
		});

		// TODO: check lastViewed link for the chat
		LastViewed[user.id] = new Date(parseFloat(await service.get(`${this.url}/${user.id}/lastViewed`), 10) * 1000);

		this.set({ Batches, LastViewed });
	}

	updateUnread () {
		const UnreadCount = {};

		const mod = (x) => x.getLastModified() || x.getCreatedTime();
		const inc = (base, item, lastViewed) => base + (mod(item) > lastViewed ? 1 : 0);

		this.get('ActiveUsers').forEach((user) => {
			const msgs = this.get('Batches')[user.id];

			const lastViewed = this.get('LastViewed')[user.id];

			UnreadCount[user.id] = msgs.reduce((n, item) => inc(n, item, lastViewed), 0);
		});

		this.set({UnreadCount});
	}

	async updateLastViewed (user) {
		const LastViewed = this.get('LastViewed'), UnreadCount = this.get('UnreadCount');

		// TODO: check lastViewed link for the chat
		if (this.get('Batches')[user.id].hasLink(`${user.id}/lastViewed`)) {
			const now = new Date();
			// TODO: check lastViewed link for the chat
			this.batch.putToLink(`${user.id}/lastViewed`, now.getTime() / 1000);
			LastViewed[user.id] = now;
			UnreadCount[user.id] = 0;

			this.set({LastViewed, UnreadCount});
			this.updateUnread();
		}
	}
}

function normalizeActiveUsers (activeUsers) {
	return Array.isArray(activeUsers) ? Object.keys(...(activeUsers).map(x => x.username)).reduce((ret, key) => {
		ret[activeUsers[key]] = true;
		return ret;
	}, {}) : activeUsers;
}

