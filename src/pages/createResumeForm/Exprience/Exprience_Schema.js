import * as Yup from "yup";

export const exprienceSchema = Yup.object().shape({
  experiences: Yup.array()
    .of(
      Yup.object().shape({
        position: Yup.string().required("postion is required"),
        company: Yup.string().required("company name is required"),
        startDate: Yup.string().required("start date is required"),
        endDate: Yup.string().required("end date is required"),
        responsibilities: Yup.array()
          .of(
            Yup.string()
              .required("reponsibily is required")
              .min(10, "minimum 10 character is required")
              .max(255, "cannot exceed 255 characters")
          )
          .min(1, "atleast 1 responsibility is required"),
        techStack: Yup.string().required("techstack is required"),
      })
    )
    .min(1, "atleast one exprience is required"),
});
