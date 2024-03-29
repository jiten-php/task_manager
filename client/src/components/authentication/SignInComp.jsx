import axios from "axios";
import googleLogo from "../../../public/google.png";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { userLogInSchema } from "../../utils/yupValidation";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/userApi";
import { Toaster, toast } from "react-hot-toast";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useGoogleLogin } from "@react-oauth/google";

function SignInComp() {
  const navigate = useNavigate();
  const [mount, setMout] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([]);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleShow = () => {
    setShow((curr) => !curr);
  };

  // const googleLogin = useGoogleLogin({
  //   onSuccess: (codeResponse) => setUser(codeResponse),
  //   onError: () => toast.error("Goole login failed"),
  // });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          login({ email: res.data.email, password: res.data.id }).then(
            (result) => {
              if (result.data.loginSuccess) {
                localStorage.setItem("token", result.data.jwtToken);
                navigate("/todo");
              } else {
                toast.error(result.data.message);
              }
            }
          );
        })
        .catch((err) => console.log(err));
    }
  }, [user, navigate]);

  const { handleSubmit, handleChange, handleBlur, errors, touched, values } =
    useFormik({
      initialValues: initialValues,
      validationSchema: userLogInSchema,
      onSubmit: async (values) => {
        // const result = await login(values);
        // if (result.data.loginSuccess) {
        localStorage.setItem("token", "asdasd");
        navigate("/todo");
        // } else {
        //   toast.error(result.data.message);
        // }
      },
    });

  useEffect(() => {
    setTimeout(() => {
      setMout(true);
    }, 100);
  }, []);

  return (
    <Card className="mx-auto my-24 w-2/6 overflow-hidden h-auto rounded-none  p-5 shadow-lg shadow-blue-gray-200 border">
      <form action="" onSubmit={handleSubmit}>
        <div
          className={
            mount
              ? "transition-transform duration-700 transform translate-x-0 flex  flex-col gap-2"
              : "translate-x-full gap-2"
          }
        >
          <Typography variant="h4">Login</Typography>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            name="email"
            variant="standard"
            label="Email"
          />
          {errors.email && touched.email && (
            <span className="text-xs text-red-400">{errors.email}</span>
          )}
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            name="password"
            variant="standard"
            label="Password"
            type={show ? "text" : "password"}
            icon={
              show ? (
                <EyeIcon
                  className="cursor-pointer"
                  onClick={() => handleShow()}
                />
              ) : (
                <EyeSlashIcon
                  className="cursor-pointer"
                  onClick={() => handleShow()}
                />
              )
            }
          />
          {errors.password && touched.password && (
            <span className="text-xs text-red-400">{errors.password}</span>
          )}

          <div className="flex m-1 cursor-pointer">
            <text>Login with</text>
            {/* <img
              src={googleLogo}
              alt="google"
              className="w-20"
              onClick={googleLogin}
            /> */}
            <Link
              to={"/signup"}
              className="ml-auto hover:text-light-blue-800 hover:underline my-auto"
            >
              <p>Not signup</p>
            </Link>
          </div>
          <div className="flex justify-end">
            {/* <Button onClick={cancelInput}  className="m-1 rounded-none" size="sm">
            Cancel
          </Button> */}
            <Button
              type="submit"
              className="m-1 rounded-none bg-light-blue-700"
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      </form>
      <Toaster />
    </Card>
  );
}

export default SignInComp;
