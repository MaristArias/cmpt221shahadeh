function cloneArray(data) {
  data.forEach((item) => tableData.push(item));
}
window
  .fetch("/data.json") 
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => populateTable(data))
  .catch((error) => console.error("Error loading JSON:", error));

function goBack() {
  const form = document.getElementById("myForm");
  form.noValidate = true;
  window.history.back();
}
