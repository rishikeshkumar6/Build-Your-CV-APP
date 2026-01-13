import * as Yup from "yup";

export const summarySchema = Yup.object().shape({
  summary: Yup.string()
    .required("summary is required")
    .min(10, "atleast wrriten 10 characters summary")
    .max(500, "summary cannot exceed 500 characters"),
});
