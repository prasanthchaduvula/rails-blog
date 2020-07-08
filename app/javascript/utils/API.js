const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
};
export default {
  postNewTask: (payload) => {
    return fetch("/users", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    }).then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    });
  },
};
