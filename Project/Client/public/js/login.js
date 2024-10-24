function goBack() {
  const form = document.getElementById("login");
  history.back();
  console.log(location.href);
  //back();
}
document.getElementById("myButton").addEventListener("click", function () {
  window.location.href = "loggedin.html";
});

window
  .fetch("/data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => populateTable(data))
  .catch((error) => console.error("Error loading JSON:", error));
