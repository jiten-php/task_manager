import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteTodo, editTodo, getTotoDetails } from "../../api/userApi";
import {
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";

function TodoDetails() {
  const locationn = useLocation();
  const todoId = locationn.state;
  const navigate = useNavigate();
  let { data } = useQuery({
    queryKey: ["todoDetails", todoId],
    queryFn: async () => {
      const response = await getTotoDetails(todoId);
      return response?.data?.data;
    },
  });

  data = data?.[0];

  console.log("asdasdsa", data);

  const handleDelete = async (id) => {
    try {
      const result = await editTodo({ ...data, id, status: "completed" });
      if (result.status === 200) {
        navigate("/todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("sadasdadasd", data);

  return (
    <div className={`container mx-auto border scrollable`}>
      <div className="h-screen p-1 ">
        <Breadcrumbs fullWidth>
          <Link to={"/todo"}>Home</Link>
          <a className="opacity-60">Todo details</a>
        </Breadcrumbs>
        <Card className="w-3/5 m-auto mt-5 ">
          <CardBody className="flex flex-col gap-4">
            <Typography
              variant="h4"
              color="white"
              className={`text-center capitalize p-3 scrollable h-16 rounded-md shadow-md shadow-blue-gray-100 border text-blue-gray-400`}
            >
              {data?.title}
            </Typography>
            <Typography size="lg" className="h-40 border p-5 scrollable">
              {data?.description}
            </Typography>
            <div className="flex gap-1 justify-around">
              <span
                size="md"
                className="w-2/3 h-10 bg-blue-gray-100 border m-auto px-2 py-2"
              >
                Status :{" "}
                {data?.status == "completed" ? "Complete." : "Pending..."}
              </span>
            </div>
            <div className="flex gap-1 justify-around">
              <span
                size="md"
                className="w-2/3 bg-blue-gray-100 h-10 border m-auto px-2 py-2"
              >
                End date : {data?.due_date}
              </span>
            </div>
          </CardBody>
          <CardFooter className="pt-0 text-end">
            <Tooltip content="Delete" placement="top">
              <Button
                variant="gradient"
                className=" mx-2"
                onClick={() => handleDelete(data?.id)}
              >
                Mark as Complete
              </Button>
            </Tooltip>
            <Button
              variant="gradient"
              onClick={() => navigate("/edit", { state: data?.id })}
            >
              Edit
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default TodoDetails;
