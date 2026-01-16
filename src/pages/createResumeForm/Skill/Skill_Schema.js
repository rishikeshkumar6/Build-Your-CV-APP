import * as Yup from "yup";

const skillsSchema = Yup.object().shape({
  frontend: Yup.string().trim().required("Frontend skills are required"),

  backend: Yup.string().trim().required("Backend skills are required"),

  database: Yup.string().trim().required("Database skills are required"),

  other: Yup.string().trim().required("Other skills are required"),
});

export default skillsSchema;
