const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordCheck = document.getElementById("passwordCheck");
const successModal = document.querySelector(".overlay");
const OK = document.getElementById("OK");


// closing Success modal
OK.addEventListener("click", function() {
    successModal.classList.add("d-none");
    successModal.classList.remove("d-block");
});

form.addEventListener("submit", function(e) {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordCheckValue = passwordCheck.value.trim();
    // Validation results
    let usernameSuccess = false;
    let emailSuccess = false;
    let passwordSuccess = false;


    // Validation for username
    if (usernameValue === "" || usernameValue.length < 4 || usernameValue.length > 20) {
        // show error
        // add error class
        setErrorFor(username, "Username is invalid (use chars. between 4-20)");
    } else {
        //add success class
        setSuccessFor(username);
        usernameSuccess = true;
    }

    // Validation for email
    var countAt = 0;
    if (emailValue.length > 7) {
        // minimum requirement standarts for email length is 8 chars
        for (var x = 2; x < emailValue.length; x++) {
            // cond.1 => it should be at least 2 chars before "@"
            if (emailValue[x] == "@" && x < emailValue.length - 5) {
                countAt += 1
                    // "@" char found
                if (countAt == 1) {
                    // cond.2 => there should not be second "@" char in an email
                    for (var i = x + 1; i < emailValue.length; i++) {
                        if (emailValue[i] == "." && i > x + 2 && i < emailValue.length - 2) {
                            // cond.3 => checking if after "@" exists "."
                            // cond.4 => checking if between "@" and "." exists at least 2 chars
                            // cond.5 => checking if after "." exist 2 chars that minimum for TLD
                            setSuccessFor(email);
                            emailSuccess = true;
                        }
                    }
                } else {
                    break;
                }
            }
        }
    } else {
        setErrorFor(email, "Email is invalid (e.g., user@example.com)");
    }

    // Validation for password
    if (passwordValue === "") {
        setErrorFor(password, "Password can't be blank");
    } else if (passwordValue.length < 6) {
        setErrorFor(password, "Password must be at least 6 characters long");
    } else if (passwordValue != passwordCheckValue) {
        setErrorFor(password, "Password check doesn't match");
        setErrorFor(passwordCheck, "Password check doesn't match");
    } else {
        setSuccessFor(password);
        setSuccessFor(passwordCheck);
        passwordSuccess = true;
    }

    // check if all form-control has a class of "success" then show success! message & OK button to hide it again

    if (usernameSuccess == true && passwordSuccess == true && emailSuccess == true) {
        successModal.classList.add("d-block");
        successModal.classList.remove("d-none");
        let infoName = document.getElementById("infoName");
        let infoEmail = document.getElementById("infoEmail");
        let infoPassword = document.getElementById("infoPassword");

        infoName.innerText = "Username: " + usernameValue;
        infoEmail.innerText = "Email: " + emailValue;
        infoPassword.innerText = "Password: " + passwordValue;

    }
}


function setErrorFor(input, message) {
    // .form-control as parent selection
    const formControl = input.parentElement;
    // message box for error
    const small = formControl.querySelector("small");
    // add error message inside small
    small.innerText = message;
    // add error class to make it visible
    formControl.className = "form-control error";
}

function setSuccessFor(input) {
    // .form-control as parent selection
    const formControl = input.parentElement;
    // add error class to make it visible
    formControl.className = "form-control success";
}
