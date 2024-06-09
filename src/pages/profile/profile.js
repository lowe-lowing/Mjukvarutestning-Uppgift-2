let userId;
fetch("/user")
  .then((res) => res.json())
  .then((data) => {
    if (data.username) {
      userId = data.id;
      document.getElementById("userId").innerText = data.id;
      document.getElementById("username").innerText = data.username;
    }
  });

document.getElementById("changeUsernameForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("newUsername").value;
  fetch(`/user/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("username").innerText = data.message;
        document.getElementById("newUsername").value = "";
      } else {
        document.getElementById("message").innerText = data.message;
      }
    });
});
