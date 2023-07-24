import * as Yup from "yup";

// Create Module
export const createModuleSchemeValidate = Yup.object().shape({
  name: Yup.string().required(),
  duration: Yup.string().required(),
  image: Yup.string().required(),
  course_id: Yup.string().required(),
});

// Update User
export const updateModuleSchemeValidate = Yup.object().shape({
  name: Yup.string().required(),
  duration: Yup.string().required(),
  course_id: Yup.string().required(),
});

// Create Reset Users
export const resetPasswordSchemeValidate = Yup.object().shape({
  oldPassword: Yup.string().min(6).required(),
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
