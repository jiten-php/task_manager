import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import LandingPage from "./components/todo/LandingPage";
import SignInComp from "./components/authentication/SignInComp";
import SignUpComp from "./components/authentication/SignUpComp";
import OtpComp from "./components/authentication/OtpComp";
import TodoPage from "./pages/TodoPage";
import UserProtect from "./protect/UserProtect";
import UserPublic from "./protect/UserPublic";
import TodoDetails from "./pages/TodoDetailsPage";
import TodoEditPage from "./pages/TodoEditPage";

function App() {
  return (
    <Router >
      <Routes>
        <Route element={<UserPublic />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignInComp />} />
          <Route path="/signup" element={<SignUpComp />} />
          <Route path="/confirm" element={<OtpComp />} />
        </Route>
        <Route element={<UserProtect />}>
          <Route element={<Outlet />}>
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/todoDetails" element={<TodoDetails />} />
            <Route path="/edit" element={<TodoEditPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
