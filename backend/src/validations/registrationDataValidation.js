
export const checkRegisterData = (errors) => {
    let errorMessage;

    if (errors[0].path === "login") {
        errorMessage = errors[0].msg;
    }
    if (errors[0].path === "password") {
        errorMessage = errors[0].msg;
    }

    if (errors[0].path === "firstName") {
        errorMessage = errors[0].msg + errors[0].value
    }

    if (errors[0].path === "lastName") {
        errorMessage = errors[0].msg + errors[0].value
    }

    return {
        errorType: "ValidationError",
        errorMessage: errorMessage,
        error: errors,
    }
};