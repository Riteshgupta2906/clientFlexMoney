const domain1 = "http://localhost:8000";
const domain = "https://yogaclass-65tt.onrender.com";
export const submitData = async (value) => {
  //console.log(value);
  const url = domain + "/api/v1/Yoga";
  const response = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(value),
  });

  return response.json();
};
export const getAll = async () => {
  const response = await fetch(domain + "/api/v1/Yoga", {
    method: "Get",
    redirect: "follow",
  });

  return response.json();
};
export const findUser = async (value) => {
  const response = await fetch(domain + "/api/v1/Yoga/user", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(value),
  });
  if (response.status === 404) {
    return "No user";
  }
  return response.json();
};
export const updatePayment = async (value) => {
  //console.log(value);
  const response = await fetch(domain + "/api/v1/Yoga/payment", {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(value),
  });

  return response.json();
};
export const updateBatch = async (value) => {
  //console.log(value);
  const response = await fetch(domain + "/api/v1/Yoga/user", {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(value),
  });

  return response.json();
};
export function monthsBetweenDates(date1, date2) {
  //   console.log(typeof date1, typeof date2);
  // Ensure date1 is always earlier than or equal to date2
  if (date1 > date2) {
    const temp = date1;
    date1 = date2;
    date2 = temp;
  }

  let months = (date2.getFullYear() - date1.getFullYear()) * 12;
  months += date2.getMonth() - date1.getMonth();

  return months;
}
