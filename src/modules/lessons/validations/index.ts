import * as Yup from "yup";

export const createLessonSchemeValidate = Yup.object().shape({
  title: Yup.string().required(),
  video: Yup.string().required(),
  module_id: Yup.string().required(),
});

export const updateLessonSchemeValidate = Yup.object().shape({
  title: Yup.string().required(),
  module_id: Yup.string().required(),
});
