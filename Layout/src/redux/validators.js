export const validate = values => {
    const errors = {};
    if (!values.newPostBody) {
        errors.newPostBody = "Empty posts not allowed";
    } else if (!values.login) {
        errors.login = "Field is required"
    } else if (!values.password) {
        errors.password = "Field is required"
    }
    return errors;
};