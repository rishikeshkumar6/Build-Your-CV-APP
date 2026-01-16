import * as Yup from "yup";

export const personalInfoSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("full name is required")
    .matches(/^[A-Za-z\s]+$/, "only alphabets and spaces are allowed")
    .min(2, "minimum 2 characters required")
    .max(100, "maximum 100 characters allowed"),

  title: Yup.string().required("title is required"),

  email: Yup.string().required("email is required").email("invalid email"),

  github: Yup.string().url("invalid URL format").nullable().notRequired(),

  linkedin: Yup.string().url("invalid URL format").nullable().notRequired(),

  portfolio: Yup.string().url("invalid URL format").nullable().notRequired(),
});
