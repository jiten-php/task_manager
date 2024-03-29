import { Button, Card, Typography } from "@material-tailwind/react";
import { DocumentCheckIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <div className="flex justify-center h-screen">
      <Card className="border-none w-full">
        <Typography
          variant="h1"
          color="indigo"
          className="mx-auto mt-20 -mb-36 flex"
        >
          Todo
          <DocumentCheckIcon className="w-16 mx-2" />
        </Typography>

        <div className="text-center m-auto">
          <Button className="bg-blue-700 m-auto rounded-none p-5 shadow-lg">
            <Link to={"/login"}>
              <Typography>Get started</Typography>
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default LandingPage;
