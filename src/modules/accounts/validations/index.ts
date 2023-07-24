import * as Yup from "yup";

// Create User
export const createUserSchemeValidate = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

// Update User
export const updateUserSchemeValidate = Yup.object().shape({
  name: Yup.string().required(),
});

// Create Reset Users
export const changePasswordSchemeValidate = Yup.object().shape({
  oldPassword: Yup.string().min(6).required(),
  password: Yup.string().min(6).required(),
  confirmPassword: Yup.string().when(
    "password",
    (password: string, field: any) =>
      password ? field.required().oneOf([Yup.ref("password")]) : field
  ),
});

export const resetPasswordSchemeValidate = Yup.object().shape({
  password: Yup.string().min(6).required(),
  confirmPassword: Yup.string().when(
    "password",
    (password: string, field: any) =>
      password ? field.required().oneOf([Yup.ref("password")]) : field
  ),
});

export const authenticateUserSchemaValidate = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
