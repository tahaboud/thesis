import validator from "validator";

export const loginValidator = (email, password) => {
  let isValid = true;
  let validationErrors = {};

  if (validator.isEmpty(email)) {
    isValid = false;
    validationErrors = { ...validationErrors, email: "This field is required" };
  } else if (!validator.isEmail(email)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      email: "Please enter a valid email",
    };
  }
  if (validator.isEmpty(password)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      password: "This field is required",
    };
  }
  return { isValid, validationErrors };
};
