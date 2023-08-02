import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format!")
    .required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

export const registerSchema = yup.object().shape({
  firstname: yup.string().required("Firstname is required!"),
  lastname: yup.string().required("Lastname is required!"),
  email: yup
    .string()
    .email("Invalid email format!")
    .required("Email is required!"),
  password: yup.string().required("Password is required!"),
  address: yup.string().required("Address is required!"),
  role: yup.string().required(),
  storeName: yup
    .string()
    .notRequired()
    .when("role", {
      is: (value) => value === "Seller",
      then: (field) => field.required("Store is required!"),
    }),
});
