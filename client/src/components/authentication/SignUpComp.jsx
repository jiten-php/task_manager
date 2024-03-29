import axios from "axios";
import googleLogo from "../../../public/google.png";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { googleSignUp, signup } from "../../api/userApi";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { userSignUpSchema } from "../../utils/yupValidation";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
// import { useGoogleLogin } from "@react-oauth/google";

function SignUpComp() {
  const navigate = useNavigate();
  const [mount, setMout] = useState(false);
  const [passOneShow, setPassOneShow] = useState(false);
  const [passTwoShow, setPassTwoShow] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setMout(true);
    }, 100);
  }, []);

  //----------------- handle Eyes -------//

  const handleShowOne = () => {
    setPassOneShow((curr) => !curr);
  };

  const handleShowTwo = () => {
    setPassTwoShow((curr) => !curr);
  };

  const initialValue = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  //----------------- handle Eyes -------------//

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: initialValue,
      validationSchema: userSignUpSchema,
      onSubmit: async (values) => {
        const response = await signup(values);
        if (response.data.created) {
          navigate("/confirm", { state: values.email });
        } else {
          toast.error(response.data.message);
        }
      },
    });

  // const googleRegister = useGoogleLogin({
  //   onSuccess: (codeResponse) => setUser(codeResponse),
  //   onError: () => toast.error("Goole login failed"),
  // });

  {
    /*  Google login field   */
  }

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
          googleSignUp(res.data).then((result) => {
            if (result.data.created) {
              localStorage.setItem("token", result.data.jwtToken);
              navigate("/todo");
            } else {
              toast.error(result.data.message);
            }
          });
        })
        .catch((err) => console.log(err));
    }
  }, [user, navigate]);

  return (
    <Card className="mx-auto my-24 w-2/6 overflow-hidden h-auto rounded-none  p-5 shadow-lg shadow-blue-gray-200 border">
      <form action="" onSubmit={handleSubmit}>
        <div
          className={
            mount
              ? "transition-transform duration-700 transform translate-x-0 flex  flex-col gap-1"
              : "translate-x-full gap-2"
          }
        >
          <Typography variant="h4">Get start</Typography>
          <Input
            name="userName"
            onChange={handleChange}
            value={values.userName}
            onBlur={handleBlur}
            variant="standard"
            label="Username"
          />
          {errors.userName && touched.userName && (
            <span className="text-xs text-red-400">{errors.userName}</span>
          )}

          <Input
            name="email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            variant="standard"
            label="Email"
          />
          {errors.email && touched.email && (
            <span className="text-xs text-red-400">{errors.email}</span>
          )}

          <Input
            name="password"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            variant="standard"
            label="Password"
            type={passOneShow ? "text" : "password"}
            icon={
              passOneShow ? (
                <EyeIcon
                  className="cursor-pointer"
                  onClick={() => handleShowOne()}
                />
              ) : (
                <EyeSlashIcon
                  className="cursor-pointer"
                  onClick={() => handleShowOne()}
                />
              )
            }
          />
          {errors.password && touched.password && (
            <span className="text-xs text-red-400">{errors.password}</span>
          )}

          <Input
            name="confirmPassword"
            onChange={handleChange}
            value={values.confirmPassword}
            onBlur={handleBlur}
            variant="standard"
            label="confirmPassword"
            type={passTwoShow ? "text" : "password"}
            icon={
              passTwoShow ? (
                <EyeIcon
                  className="cursor-pointer"
                  onClick={() => handleShowTwo()}
                />
              ) : (
                <EyeSlashIcon
                  className="cursor-pointer"
                  onClick={() => handleShowTwo()}
                />
              )
            }
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <span className="text-xs text-red-400">
              {errors.confirmPassword}
            </span>
          )}

          <div className="flex m-1 cursor-pointer">
            <text>Signup with</text>
            <img
              src={googleLogo}
              alt="google"
              className="w-20"
              // onClick={() => googleRegister()}
            />
            <Link
              to={"/login"}
              className="ml-auto hover:text-light-blue-800 hover:underline my-auto"
            >
              <p>Already user?</p>
            </Link>
          </div>
          <div className="flex justify-end">
            <Button className="m-1 rounded-none" size="sm">
              Cancel
            </Button>
            <Button
              type="submit"
              className="m-1 rounded-none bg-light-blue-700"
              size="sm"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
      <Toaster />
    </Card>
  );
}

export default SignUpComp;
