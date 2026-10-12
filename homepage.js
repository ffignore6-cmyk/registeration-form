const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {

        message.style.color = "red";
        message.innerText = "Please fill all fields.";
        return;

    }

    if (password !== confirmPassword) {

        message.style.color = "red";
        message.innerText = "Passwords do not match.";
        return;

    }

    try {

        const response = await fetch("/api/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                phone,
                password
            })

        });

        const result = await response.json();

        if (result.success) {

            message.style.color = "green";
            message.innerText = "Registration Successful.";

            // Form Clear
            form.reset();

        } else {

            message.style.color = "red";
            message.innerText = result.message;

        }

    } catch (err) {

        console.log(err);

        message.style.color = "red";
        message.innerText = "Server Error.";

    }

});