import * as Yup from "yup";

export const ProjectsSchema = Yup.object().shape({
  projects: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .required("Project name is required")
          .max(100, "Project name cannot exceed 100 characters"),
        description: Yup.string()
          .required("Description is required")
          .max(500, "Description cannot exceed 500 characters"),
        techStack: Yup.string()
          .required("Tech stack is required")
          .max(200, "Tech stack cannot exceed 200 characters"),
        github: Yup.string().url("Enter a valid GitHub URL").nullable(), // allows empty string
        live: Yup.string().url("Enter a valid Live URL").nullable(), // allows empty string
      })
    )
    .min(1, "At least one project is required"),
});
