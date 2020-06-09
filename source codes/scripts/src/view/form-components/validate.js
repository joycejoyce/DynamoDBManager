const validate = (value, rules) => {
    let isValid = true;

    for(let rule in rules) {
        switch(rule) {
            case 'minLength': isValid = isValid && minLengthValidator(value, rules[rule]); break;
            case 'isRequired': isValid = isValid && requiredValidator(value); break;
            case 'isEmail': isValid = isValid && emailValidator(value); break;
            default: isValid = true;
        }   

    }

    return isValid;
}

const requiredValidator = (value) => {
    return value.trim() !== '';
}

export {
    validate
}