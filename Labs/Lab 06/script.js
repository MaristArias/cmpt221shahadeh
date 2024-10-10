/**
 * This function reads the data and loads it on the table
 */
let tableData = [];
function cloneArray(data) {
    data.forEach(item => tableData.push(item));
}
window.fetch('data.json')
    .then(response => response.json())
    .then(data => {cloneArray(data); populateTable(tableData);})
    .catch(error => console.error('Error loading JSON:', error));

/**
 * This function populates the data with the provided data array
 * @param {*} data
 */
function populateTable(data) {
    const tableBody = document.querySelector('#tBody');
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.company}</td>
            <td>${item.contact}</td>
            <td>${item.country}</td>
        `;
        tableBody.appendChild(row);
    });
}
function addNewRow(event) {
    event.preventDefault();
    const company = document.getElementById('company').value;
    const contact = document.getElementById('contact').value;
    const country = document.getElementById('country').value;

    const newEntry = { company, contact, country };
    tableData.push(newEntry);
    populateTable(tableData);
    document.forms['addForm'].reset();
}
document.forms['addForm'].onsubmit = addNewRow;

let currentSortOrder = {
    column: null,
    order: 'asc'
};

function sortTable(column) {
    const order = currentSortOrder.column === column && currentSortOrder.order === 'asc' ? 'desc' : 'asc';

    tableData.sort((a, b) => {
        if (order === 'asc') {
            return a[column].localeCompare(b[column]);
        } else {
            return b[column].localeCompare(a[column]);
        }
    });

    currentSortOrder = { column, order };

    populateTable(tableData);
}

document.querySelector('#companyH').addEventListener('click', () => sortTable('company'));
document.querySelector('#contactH').addEventListener('click', () => sortTable('contact'));
document.querySelector('#countryH').addEventListener('click', () => sortTable('country'));
