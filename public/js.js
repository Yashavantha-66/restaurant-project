// Mobile Menu

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// Booking Form

const bookingForm = document.getElementById("bookingForm");
const modal = document.getElementById("successModal");
const bookingDetails = document.getElementById("bookingDetails");

bookingForm.addEventListener("submit", async function(e) {

    e.preventDefault();

    console.log("BOOKING BUTTON CLICKED");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const table = document.getElementById("table").value;
    const persons = document.getElementById("persons").value;

    console.log("Sending booking data...");

    try {

        const response = await fetch("/book", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                date: date,
                time: time,
                table: table,
                persons: persons
            })

        });

        const data = await response.json();

        console.log("Server response:", data);

        if (!response.ok) {

            alert("Booking failed: " + data.message);

            return;
        }


        // Show successful booking

        bookingDetails.innerHTML = `
            <strong>Name:</strong> ${name}<br>
            <strong>Email:</strong> ${email}<br>
            <strong>Phone:</strong> ${phone}<br><br>

            Thank you for your reservation.<br><br>

            <strong>Date:</strong> ${date}<br>
            <strong>Time:</strong> ${time}<br>
            <strong>Table:</strong> ${table}<br>
            <strong>Guests:</strong> ${persons}
        `;

        modal.style.display = "block";

        bookingForm.reset();

    } catch (error) {

        console.error("Connection error:", error);

        alert("Unable to connect to server.");

    }

});


function closeModal() {

    modal.style.display = "none";

}


window.onclick = function(event) {

    if (event.target === modal) {

        modal.style.display = "none";

    }

};