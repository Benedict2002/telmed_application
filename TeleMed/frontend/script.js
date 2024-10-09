document.addEventListener("DOMContentLoaded", () => {
    const userId = localStorage.getItem("userId");

    if (userId) {
        document.getElementById("userName").textContent = localStorage.getItem("userEmail");
    }

    // Login functionality
    if (document.getElementById("loginForm")) {
        document.getElementById("loginForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const response = await fetch("http://localhost:3000/api/patients/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("userEmail", email);
                window.location.href = "dashboard.html";
            } else {
                alert("Login failed!");
            }
        });
    }

    // Registration functionality
    if (document.getElementById("registerForm")) {
        document.getElementById("registerForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const response = await fetch("http://localhost:3000/api/patients/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                alert("Registration successful! You can now login.");
                window.location.href = "login.html";
            } else {
                alert("Registration failed!");
            }
        });
    }

    // Logout functionality
    if (document.getElementById("logout")) {
        document.getElementById("logout").addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("userId");
            localStorage.removeItem("userEmail");
            window.location.href = "login.html";
        });
    }

    // Booking an appointment
    if (document.getElementById("appointmentForm")) {
        const doctorSelect = document.getElementById("doctor");
        fetch("http://localhost:3000/api/doctors") // Assuming this endpoint returns a list of doctors
            .then(response => response.json())
            .then(doctors => {
                doctors.forEach(doctor => {
                    const option = document.createElement("option");
                    option.value = doctor.id;
                    option.textContent = doctor.name;
                    doctorSelect.appendChild(option);
                });
            });

        document.getElementById("appointmentForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const doctorId = doctorSelect.value;
            const date = document.getElementById("date").value;

            const response = await fetch("http://localhost:3000/api/appointments/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ patient_id: userId, doctor_id: doctorId, date }),
            });

            if (response.ok) {
                document.getElementById("feedbackMessage").textContent = "Appointment booked successfully!";
            } else {
                document.getElementById("feedbackMessage").textContent = "Failed to book appointment.";
            }
        });
    }

    // Profile management
    if (document.getElementById("profileForm")) {
        const emailField = document.getElementById("email");
        const nameField = document.getElementById("name");

        emailField.value = localStorage.getItem("userEmail");

        document.getElementById("profileForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = nameField.value;

            const response = await fetch(`http://localhost:3000/api/patients/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            });

            if (response.ok) {
                alert("Profile updated successfully!");
            } else {
                alert("Failed to update profile.");
            }
        });
    }
});
