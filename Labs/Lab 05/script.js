//json loads then calls populates data table function
window.fetch('data.json')
    .then(response => response.json())
    .then(data => populateTable(data))
    .catch(error => console.error('Error loading JSON:', error));

function populateTable(data) {
    const tableBody = document.querySelector('#dataTable tbody');

    data.forEach((person, index) => {
        const row = document.createElement('tr');

        if (index % 2 === 0) {
            row.classList.add('evenRow');
        } else {
            row.classList.add('oddRow');
        }

        //just append the respective element to its respective cell

        const idCell = document.createElement('td');
        idCell.textContent = person.id;
        idCell.style.textAlign = 'right';
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = person.name;
        idCell.style.textAlign = 'left';
        row.appendChild(nameCell);

        const ageCell = document.createElement('td');
        ageCell.textContent = person.age;
        idCell.style.textAlign = 'center';
        row.appendChild(ageCell);

        tableBody.appendChild(row);
    });
}
