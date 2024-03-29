import { QueryClient, useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { editTodo, getTotoDetails } from "../../api/userApi";
import {
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Typography,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import { todoSchema } from "../../utils/yupValidation";
import { useFormik } from "formik";
import { useState } from "react";

function TodoEdit() {
  const [longTerm, setLongTerm] = useState(false);
  const locationn = useLocation();
  const todoId = locationn.state;
  const navigate = useNavigate();
  const opendue_date = () => setLongTerm(true);

  let { data } = useQuery({
    queryKey: ["todoDetails", todoId],
    queryFn: async () => {
      const response = await getTotoDetails(todoId);
      return response?.data?.data;
    },
  });

  data = data?.[0];

  console.log("asdasdasdads", data);

  let due_date;
  if (data?.due_due_date) {
    const parts = data?.due_due_date.split("/");
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    due_date = `${day}/0${month}/${year}`;
  }

  const initialValues = {
    title: data?.title,
    description: data?.description,
    due_date: data?.due_date,
    id: data?.id,
  };

  let handleChange, errors, handleSubmit, values, setFieldValue;

  if (data) {
    let formData = useFormik({
      initialValues: initialValues,
      validationSchema: todoSchema,
      onSubmit: async (values) => {},
    });
    handleChange = formData.handleChange;
    errors = formData.errors;
    handleSubmit = async (e) => {
      e.preventDefault();
      const response = await editTodo({ ...data, ...values });
      if (response?.data?.success) {
        navigate("/todoDetails", { state: data?.id });
        toast.success(response.data.message);
        // QueryClient.invalidue_dateQueries("todoList");
      } else {
        toast.error(response.data.message);
      }
    };
    values = formData.values;
    setFieldValue = formData.setFieldValue;
  }

  return (
    <div className={`container mx-auto border scrollable bg-light-blue-100`}>
      <div className="h-screen p-1  ">
        <Breadcrumbs fullWidth>
          <Link to={"/todo"}>Home</Link>

          <Link to={"/todoDetails"} state={values?.id}>
            Components
          </Link>
          <a>Edit details</a>
        </Breadcrumbs>
        {data && (
          <form action="" onSubmit={handleSubmit}>
            <Card className="w-4/5 m-auto mt-5 shadow-2xl ">
              <Typography variant="h3" className="m-auto mt-3">
                Edit Todo
              </Typography>
              <CardBody className="flex flex-col gap-4">
                <span>Edit todo</span>
                <Input
                  onChange={handleChange}
                  name="title"
                  value={values?.title}
                />
                {errors?.title && (
                  <span
                    style={{ fontSize: "0.80rem" }}
                    className=" text-red-400"
                  >
                    {errors?.title}
                  </span>
                )}
                <span>Edit description</span>

                <Input
                  onChange={handleChange}
                  type="text"
                  name="description"
                  size="lg"
                  value={values?.description}
                />
                {errors?.description && (
                  <span
                    style={{ fontSize: "0.80rem" }}
                    className=" text-red-400"
                  >
                    {errors?.description}
                  </span>
                )}
                <div className="flex flex-col gap-4 Previous ">
                  <span>Due Date</span>
                  <Input
                    onChange={handleChange}
                    type="text"
                    name="due_date"
                    size="lg"
                    value={values?.due_date}
                  />
                  {errors?.due_date && (
                    <span
                      style={{ fontSize: "0.80rem" }}
                      className=" text-red-400"
                    >
                      {errors?.due_date}
                    </span>
                  )}
                </div>
              </CardBody>
              <CardFooter className="pt-0 text-end">
                <Button type="submit" variant="gradient">
                  Save
                </Button>
              </CardFooter>
            </Card>
          </form>
        )}
      </div>
    </div>
  );
}

export default TodoEdit;
