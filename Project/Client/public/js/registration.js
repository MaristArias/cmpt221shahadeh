//Makes the back button work in html, sends the user to the last accessed page in the window. 
function goBack() {
  const form = document.getElementById("myForm");
  form.noValidate = true;
  window.history.back();
}
