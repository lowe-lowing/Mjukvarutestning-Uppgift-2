fetch("/user")
  .then((res) => res.json())
  .then((data) => {
    if (data.username) {
      const nav = document.getElementById("nav");
      const profile = document.createElement("a");
      profile.href = "/profile";
      profile.innerText = "Profile";
      nav.appendChild(profile);

      document.getElementById("username").innerText = `Inloggad som ${data.username}`;
    }
  });
