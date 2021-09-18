import validator from "validator";

export const equipementValidator = (
  code,
  localisation,
  supplier,
  brand,
  serial_number,
  comment
) => {
  let isValid = true;
  let validationErrors = {};

  if (validator.isEmpty(code)) {
    isValid = false;
    validationErrors = { ...validationErrors, code: "This field is required" };
  }
  if (validator.isEmpty(localisation)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      localisation: "This field is required",
    };
  }
  if (validator.isEmpty(brand)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      brand: "This field is required",
    };
  }
  if (validator.isEmpty(supplier)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      supplier: "This field is required",
    };
  }
  if (validator.isEmpty(serial_number)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      serial_number: "This field is required",
    };
  }
  if (validator.isEmpty(comment)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      comment: "This field is required",
    };
  }
  return { isValid, validationErrors };
};

export const toolValidator = (
  name,
  number,
  price,
  shelf,
  supplier,
  comment
) => {
  let isValid = true;
  let validationErrors = {};

  if (validator.isEmpty(name)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      full_name: "This field is required",
    };
  }
  if (validator.isEmpty(number)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      number: "This field is required",
    };
  }
  if (validator.isEmpty(price)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      price: "This field is required",
    };
  }
  if (validator.isEmpty(supplier)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      supplier: "This field is required",
    };
  }
  if (validator.isEmpty(shelf)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      shelf: "This field is required",
    };
  }
  if (validator.isEmpty(comment)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      comment: "This field is required",
    };
  }
  return { isValid, validationErrors };
};
