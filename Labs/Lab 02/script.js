// script.js
function greetUser() {
// This will prompt the user
    const userName = prompt('What is your name?');
    document.write(`Hello, ${userName}! Welcome to our web page.`);
}
// Call the function when the page loads
greetUser();

// Display localtime
localTime = new Date();
document.write("<br>The local time is: " + localTime);