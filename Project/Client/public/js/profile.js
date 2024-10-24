function goBack() {
  window.history.back();
}

let tableData = [];

function cloneArray(data) {
  data.forEach((item) => tableData.push(item));
}

function populateTable(data) {
  if (tableData.length == 0) cloneArray(data);
  const tableBody = document.querySelector("tBody");
  // Remove all the children if any
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
  // Populate the table
  tableData.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.firstName}</td>
            <td>${item.lastName}</td>
            <td>${item.dateOfBirth}</td>
            <td>${item.phoneNumber}</td>
            <td>${item.email}</td>
        `;
    tableBody.appendChild(row);
  });
}

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
