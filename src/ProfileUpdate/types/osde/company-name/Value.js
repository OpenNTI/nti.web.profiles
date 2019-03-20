const MimeType = 'application/vnd.nextthought.profile.professionalposition';

export default class CompanyNameValue {
	constructor (companyName) {
		this.companyName = companyName;
	}


	setCompanyName (companyName) {
		return new CompanyNameValue (companyName);
	}


	isEqualTo (value) {
		return value && this.companyName === value.companyName && value instanceof CompanyNameValue;
	}

	isValid () {
		return !!this.companyName;
	}

	serialize () {
		if (!this.isValid()) {
			return null;
		}

		return [{
			MimeType,
			companyName: this.companyName
		}];
	}
}
