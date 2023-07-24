import * as Yup from "yup";

// Create Course Users
export const createCourseUserSchemeValidate = Yup.object().shape({
  user_id: Yup.string().required(),
  course_id: Yup.string().required(),
});

// Create Category
export const createCategorySchemeValidate = Yup.object().shape({
  name: Yup.string().required(),
});

// Create Course
export const createCourseSchemeValidate = Yup.object().shape({
  name: Yup.string().required(),
  category_id: Yup.string().required(),
});
