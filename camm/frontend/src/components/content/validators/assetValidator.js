import validator from "validator";

export const equipementValidator = (
  code,
  localisation,
  supplier,
  brand,
  serial_number
) => {
  let isValid = true;
  let validationErrors = {};

  if (validator.isEmpty(code)) {
    isValid = false;
    validationErrors = { ...validationErrors, code: "This field is required" };
  }
  if (validator.isEmpty(localisation.toString())) {
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
  if (validator.isEmpty(supplier.toString())) {
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
  if (validator.isEmpty(supplier.toString())) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      supplier: "This field is required",
    };
  }
  if (validator.isEmpty(shelf.toString())) {
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

export const supplierValidator = (full_name, address, phone_number, email) => {
  let isValid = true;
  let validationErrors = {};

  if (validator.isEmpty(full_name)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      full_name: "This field is required",
    };
  }
  if (validator.isEmpty(address)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      address: "This field is required",
    };
  }
  if (validator.isEmpty(phone_number)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      phone_number: "This field is required",
    };
  }
  if (!validator.isEmpty(email)) {
    if (!validator.isEmail(email)) {
      isValid = false;
      validationErrors = {
        ...validationErrors,
        email: "Please enter a valid email",
      };
    }
  }
  return { isValid, validationErrors };
};

export const workOrderValidator = (
  equipement,
  failed_piece,
  repair_piece,
  startTime,
  endTime,
  comment
) => {
  let isValid = true;
  let validationErrors = {};

  if (validator.isEmpty(equipement.toString())) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      equipement: "This field is required",
    };
  }
  if (validator.isEmpty(failed_piece)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      failed_piece: "This field is required",
    };
  }
  if (validator.isEmpty(repair_piece)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      repair_piece: "This field is required",
    };
  }
  if (validator.isEmpty(startTime)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      maintenance_start_time: "This field is required",
    };
  }
  if (validator.isEmpty(endTime)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      maintenance_end_time: "This field is required",
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

export const stockValidator = (name) => {
  let isValid = true;
  let validationErrors = {};

  if (validator.isEmpty(name)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      name: "This field is required",
    };
  }

  return { isValid, validationErrors };
};

export const localisationValidator = (name) => {
  let isValid = true;
  let validationErrors = {};

  if (validator.isEmpty(name)) {
    isValid = false;
    validationErrors = {
      ...validationErrors,
      name: "This field is required",
    };
  }

  return { isValid, validationErrors };
};
