export const validateData = (dataValidate) => {
    let failMessages = [];
    if (dataValidate.name == '') {
        failMessages.push('Staff name can not empty.');
    }

    if (dataValidate.name.length <= 2) {
        failMessages.push('Staff name must more than 2 words.');
    }

    if (dataValidate.address == '') {
        failMessages.push('Staff address can not empty.');
    }

    if (dataValidate.age == '') {
        failMessages.push('Staff age can not empty.');
    }

    if (dataValidate.age <= 0) {
        failMessages.push('Staff age can not less or equal than 0.');
    }

    if (dataValidate.avatar == '') {
        failMessages.push('Staff avatar link can not empty.');
    }

    if (!((new RegExp('https?://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(/\S*)?')).test(dataValidate.avatar))) {
        failMessages.push('Staff avatar must be a link, ex: https://<url>.');
    }

    return failMessages;
}