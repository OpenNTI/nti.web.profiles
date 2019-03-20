const MimeType = 'application/vnd.nextthought.profile.educationalexperience';

export default class EducationValue {
	constructor (school, graduationDate) {
		this.school = school;
		this.graduationDate = graduationDate;
	}

	setSchool (school) {
		return new EducationValue(school, this.graduationDate);
	}

	setGraduationDate (graduationDate) {
		return new EducationValue(this.school, graduationDate);
	}

	isEqualTo (value) {
		return value && this.school === value.school && this.graduationDate === value.graduationDate;
	}

	isValid () {
		return this.school && this.graduationDate;
	}

	serialize () {
		if (!this.isValid()) {
			return null;
		}

		return [{
			MimeType,
			school: this.school,
			'expected_graduation': this.graduationDate.getTime() / 1000
		}];
	}
}
