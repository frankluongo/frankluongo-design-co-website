function GetInTouchForm() {
  let response;
  const form = document.querySelector("#contact-form");
  const message = document.querySelector("#form-message");

  form.addEventListener("submit", onSubmit);

  // EVENT HANDLERS:
  function onError() {
    response =
      "Oh no! An error occurred while submitting the form. Please try again later";
    populateMessage();
  }

  function onLoading() {
    response = "Sending your message...";
    populateMessage();
  }

  function onSubmit(event) {
    event.preventDefault();
    submitForm();
  }

  function onSuccess() {
    response = "Message sent successfully!";
    populateMessage();
    form.reset();
  }

  // METHODS:
  function populateMessage() {
    message.innerHTML = response;
  }

  async function submitForm() {
    const formData = new FormData(form);
    onLoading();
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });
      if (!response.ok) throw new Error("Network response was not ok.");
      onSuccess();
    } catch (error) {
      onError();
      console.error(error);
    }
  }
}

GetInTouchForm();
