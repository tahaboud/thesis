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

export const registerValidator = (email, first_name, last_name, password) => {
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
  if (validator.isEmpty(first_name)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      first_name: "This field is required",
    };
  }
  if (validator.isEmpty(last_name)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      last_name: "This field is required",
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
