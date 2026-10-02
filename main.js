let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if(top >= offset && top < offset * height){
            navLinks.forEach(links => {
                links.classList.remove("active");
                document.querySelector('header nav a [href*=' + id + ']').classList.add('active');
            })
        }
    })
}
menuIcon.onclick =  () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle("active");
}

const form = document.getElementById("contact-form");
const statusMessage = document.getElementById("form-status");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = form.querySelector('input[type="submit"]');

    submitButton.disabled = true;
    submitButton.value = "Sending...";
    statusMessage.textContent = "";

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            statusMessage.textContent = "Thanks! Your message has been sent.";
            statusMessage.style.color = "green";
            form.reset();
        } else {
            statusMessage.textContent =
                "Something went wrong. Please try again.";
            statusMessage.style.color = "red";
        }
    } catch (error) {
        statusMessage.textContent =
            "Unable to send the message. Please try again later.";
        statusMessage.style.color = "red";
    }

    submitButton.disabled = false;
    submitButton.value = "Send Message";
});