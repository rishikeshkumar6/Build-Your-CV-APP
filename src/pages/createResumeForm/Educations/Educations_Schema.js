import * as Yup from "yup";

const educationSchema = Yup.object().shape({
  education: Yup.array()
    .of(
      Yup.object().shape({
        degree: Yup.string().trim().required("Degree is required"),
        institution: Yup.string().trim().required("Institution is required"),
        startYear: Yup.string().required("Start year is required"),
        endYear: Yup.string().required("End year is required"),
      })
    )
    .min(1, "At least one education entry is required")
    .required("Education is required"),
});

export default educationSchema;
