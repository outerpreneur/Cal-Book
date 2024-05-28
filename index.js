let apiKey = "cal_live_67eb88015e79f9b78b72865eb5dbe804";
const submissionForm = document.getElementById("form");

// submit form

submissionForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Form submitted");
  alert("Form submitted");
  console.log(document.getElementById("email").value);
  let selectedLocation = document.querySelector(
    'input[name="location"]:checked'
  ).value;
  let name = document.getElementById("name").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;

  // Create a new Date object with the selected date and time
  let bookingTime = new Date(`${date}T${time}:00.000Z`);

  // Add 2 hours to the time
  bookingTime.setHours(bookingTime.getHours() - 2);

  // Format the date back to an ISO string and remove the milliseconds
  let bookingTimeString = bookingTime.toISOString().split(".")[0] + "Z";
  console.log(selectedLocation, name, email, date, time);

  fetch(`https://api.cal.com/v1/bookings?apiKey=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      start: bookingTimeString,
      eventTypeId: parseInt(selectedLocation),
      metadata: {},
      responses: {
        name: name,
        email: email,
        phone: phone,
      },
      timeZone: "Europe/Zurich",
      language: "en",
      status: "ACCEPTED",
    }),
  })
    .then((response) => {
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
});

// Click button
// document.getElementById("postButton").addEventListener("click", function () {
//   console.log("Button clicked");
//   fetch(`https://api.cal.com/v1/bookings?apiKey=${apiKey}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       start: "2024-05-31T10:00:00.000Z",
//       end: "2024-05-31T10:45:00.000Z",
//       eventTypeId: 641549,
//       metadata: {},
//       responses: {
//         name: "Alek",
//         email: "alekdoe@gmail.com",
//       },
//       timeZone: "Europe/Zurich",
//       language: "en",
//       status: "ACCEPTED",
//     }),
//   })
//     .then((response) => {
//       console.log("Response status:", response.status);
//       console.log("Response headers:", response.headers);
//       return response.json();
//     })
//     .then((data) => console.log(data))
//     .catch((error) => console.error("Error:", error));
// });

document.getElementById("getButton").addEventListener("click", function () {
  fetch(`https://api.cal.com/v1/bookings?apiKey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
});
