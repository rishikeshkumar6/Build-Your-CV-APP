import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const signupSchema = Yup.object().shape({
  full_name: Yup.string().required("Full name is required"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});
