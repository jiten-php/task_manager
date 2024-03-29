import { userInterseption } from "../utils/interseptor";

const userApi = userInterseption;

export async function login(values) {
  try {
    const result = await userApi.post("/login", values);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function signup(values) {
  try {
    const result = await userApi.post("/signup", values);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function googleSignUp(values) {
  try {
    const result = await userApi.post("/googleSignUp", values);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function otpVerification(otp, email) {
  try {
    const result = await userApi.get(`/otpVarify/${otp}/${email}`);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function resendOtp(email) {
  try {
    const result = await userApi.get(`/resendOtp/${email}`);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function createTodo(values) {
  try {
    const result = await userApi.post("http://localhost:8080/api/tasks", {
      ...values,
      status: "pending",
    });
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getTodoList(filter) {
  try {
    const result = await userApi.get("http://localhost:8080/api/tasks", {
      params: { filter },
    });
    return result?.data?.data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getTotoDetails(id) {
  try {
    const result = await userApi.get(`http://localhost:8080/api/tasks/${id}`);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function deleteTodo(id) {
  try {
    const result = await userApi.delete(
      `http://localhost:8080/api/tasks/${id}`
    );
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function editTodo(values) {
  try {
    const result = await userApi.put(
      `http://localhost:8080/api/tasks/${values.id}`,
      values
    );
    debugger;
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function addCompleted(id) {
  try {
    const result = await userApi.get(`/addComplete/${id}`);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}
