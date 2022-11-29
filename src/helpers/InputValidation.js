const TextValidation = (text= '', maxLength= 255, fieldName = "Name", required= true) => {
	if (text === null && required) {
		return `${fieldName} tidak boleh kosong`;
	}
	if(text === "" && required) {
		return `${fieldName} tidak boleh kosong`;
	}
	if (text && text.length > maxLength) {
		return `${fieldName} maksimal ${maxLength} karakter`;
	}

	return "";
};

const EmailValidation = (email = '', maxLength = 255, fieldName= "Email", required = true) => {
	if (email === null && required) {
		return `${fieldName} tidak boleh kosong`;
	}
	if (email === "" && required) {
		return `${fieldName} tidak boleh kosong`;
	}
	if (email && email.length > maxLength) {
		return `${fieldName} maksimal ${maxLength} karakter`;
	}
	if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return `${fieldName} tidak valid`;
	}

	return "";
};





const NIKValidation = (value= '', length = 16, fieldName= "NIK", required = true) => {
	if (value === null && required) {
		return `${fieldName} tidak boleh kosong`;
	}
	if (value === "" && required) {
		return `${fieldName} tidak boleh kosong`;
	}
	if (value && value.length !== length) {
		return `${fieldName} harus ${length} angka`;
	}
	if (value && /[^0-9]/.test(value)) {
		return `${fieldName} tidak valid`;
	}

	return "";
};

const FileValidation = (files, mimeType = [], fieldName = "", maxSize = 1000, required = true) => {
	
	if (!files && required) {
		return `${fieldName} tidak boleh kosong`;
	}
	if (files && mimeType.indexOf(files.type) === -1) {
		return `${fieldName} tidak valid`;
	}
	if (files && files.size > maxSize) {
		return `${fieldName} maksimal ${maxSize/1000}Kb`;
	}
	return "";
}

export default { TextValidation, EmailValidation, NIKValidation, FileValidation };