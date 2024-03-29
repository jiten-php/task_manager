import * as Yup from "yup";

export const userSignUpSchema = Yup.object().shape({
  userName: Yup.string().required("This field is required").trim(),
  email: Yup.string()
    .matches(/^[\w.-]+@[\w.-]+\.\w+$/, "Please enter a valid email")
    .email("Please enter a valid email")
    .required("This field is required")
    .trim(),
  password: Yup.string()
    .required("This field is required")
    .min(8, "Pasword must be 8 or more characters")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])\w+/,
      "Password ahould contain at least one uppercase and lowercase character"
    )
    .matches(/\d/, "Password should contain at least one number")
    .matches(
      /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
      "Password should contain at least one special character"
    ),
  confirmPassword: Yup.string().when("password", (password, field) => {
    if (password) {
      return field
        .required("The passwords do not match")
        .oneOf([Yup.ref("password")], "The passwords do not match");
    }
  }),
});

export const userLogInSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[\w.-]+@[\w.-]+\.\w+$/, "Please enter a valid email")
    .email("Please enter a valid email")
    .required("This field is required")
    .trim(),
  password: Yup.string()
    .required("This field is required")
    .min(8, "Pasword must be 8 or more characters")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])\w+/,
      "Password ahould contain at least one uppercase and lowercase character"
    )
    .matches(/\d/, "Password should contain at least one number")
    .matches(
      /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
      "Password should contain at least one special character"
    ),
});

export const otpValidation = (otp) => {
  let error = {};
  let joinedOtp = otp.join("").trim();
  if (joinedOtp === "") {
    error.message = "Please enter a input";
  } else if (joinedOtp.length < 5 || joinedOtp.length > 5) {
    error.message = "Please a valid input";
  }
  return Object.keys(error).length === 0 ? joinedOtp : error;
};

export const todoSchema = Yup.object().shape({
  title: Yup.string().required("This field is required!"),
  description: Yup.string().required("This field is required!"),
});
