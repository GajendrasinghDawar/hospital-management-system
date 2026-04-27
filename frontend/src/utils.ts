export const BACKEND_URL = "http://localhost:3000";

export const getUser = async () => {
  const res = await fetch(`${BACKEND_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (res.status === 200) {
    const data = await res.json();
    return {
      success: true,
      user: data.user,
    };
  }
  return {
    success: false,
    user: null,
  };
};

export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  if (res.status === 200) {
    const data = await res.json();
    localStorage.setItem("token", data.token);
    return {
      success: true,
    };
  }
  return {
    success: false,
  };
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (res.status === 200) {
    const data = await res.json();
    localStorage.setItem("token", data.token);
    return {
      success: true,
    };
  }
  return {
    success: false,
  };
};

export const getAppointments = async () => {
  const res = await fetch(`${BACKEND_URL}/booking/appointments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (res.status === 200) {
    const data = await res.json();
    return {
      success: true,
      appointments: data.appointments,
    };
  }
  return {
    success: false,
    appointments: [],
  };
};
