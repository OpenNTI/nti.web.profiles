const MimeType = 'application/vnd.nextthought.profile.professionalposition';

export default class PositionsValue {
	constructor (companyName, title) {
		this.companyName = companyName;
		this.title = title;
	}

	setCompanyName (companyName) {
		return new PositionsValue(companyName, this.title);
	}

	setTitle (title) {
		return new PositionsValue(this.companyName, title);
	}

	isEqualTo (value) {
		return value && this.companyName === value.companyName && this.title === value.title && value instanceof PositionsValue;
	}

	isValid () {
		return this.companyName && this.title;
	}

	serialize () {
		if (!this.isValid()) {
			return null;
		}

		return [{
			MimeType,
			companyName: this.companyName,
			title: this.title
		}];
	}
}
