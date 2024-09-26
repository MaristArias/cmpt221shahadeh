// Select the elements
const paragraph = document.getElementById('paragraph');
const itemList = document.getElementById('itemList');
// Define the function to change the text of the paragraph
function changeText() {
    paragraph.textContent = 'The text has been changed!';
}
// Define the function to highlight the paragraph
function highlightText() {
    paragraph.classList.toggle('highlight');
}
// Define the function to toggle the visibility of the paragraph
function toggleVisibility() {
    if (paragraph.classList.contains('hidden')) {
        paragraph.classList.remove('hidden');
    } else {
        paragraph.classList.add('hidden');
    }
}
// Define the function to add a new item to the list
function addElement() {
    const newItem = document.createElement('li');
    newItem.textContent = `Item ${itemList.children.length + 1}`;
    itemList.appendChild(newItem);
}
// Define the function to remove an item from the list
function removeElement() {
    let itemList = document.getElementById('itemList');
    itemList.removeChild(itemList.lastElementChild);
}
// Define the function to change the style of the paragraph
function changeStyle(){
    paragraph.style.setProperty('font-family', 'monospace');
    paragraph.style.setProperty('font-weight', 'bold');
    paragraph.style.setProperty('font-size', '50px');
}