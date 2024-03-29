import React from "react";
import { NavbarComp } from "../components/todo/NavbarComp";
import TodoComp from "../components/todo/TodoComp";

function TodoPage() {
  return (
    <>
      <NavbarComp />
      <TodoComp />
    </>
  );
}

export default TodoPage;
