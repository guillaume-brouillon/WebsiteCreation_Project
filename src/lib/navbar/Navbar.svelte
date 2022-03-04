<script>
    import { page } from '$app/stores';


    import './Navbar.css';
    import {clickOutside} from './click_outside.js';
    let current_form = 'none';
    let menu_close = true;
    function handleClickOutside(event) {
		menu_close = true;
	}
    let register_type_pwd = 'password';
    let login_type_pwd = 'password';
    let register_type_conf_pwd = 'password';

    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{4,20}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;
    const MAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    function verify_input(event) {
        if (event.target.id === "username" && !USER_REGEX.test(event.target.value)) {
                setInputError(event.target, "Username must be 5 to 20 characters long and beggin with a letter. Characters can be any letters from a to z and any numbers from 0 through 9.");
            } else if (event.target.id === "mail-address" && !MAIL_REGEX.test(event.target.value)) {
                setInputError(event.target, "Enter a valid mail address.");
            } else if (event.target.id === "user" && !(MAIL_REGEX.test(event.target.value) || USER_REGEX.test(event.target.value))) {
                setInputError(event.target, "Enter a valid username or mail address.");
            } else if ((event.target.id === "password" || event.target.id === "pwd") && !PWD_REGEX.test(event.target.value)) {
                setInputError(event.target, "Password must be 8 to 20 characters long. It should include at least one number, one uppercase letter, one lowercase letter and one special character (!@#$%).");
            } else if (event.target.id === "confirmed-password" && event.target.value != document.querySelector("#password").value) {
                setInputError(event.target, "Password and confirm password must be the same.");
        }
    }

    function clearAllInputError(form) {
        current_form = form;
        document.querySelectorAll(".form-input").forEach(inputElement => {
            clearInputError(inputElement);
            inputElement.value = "";
        });
    }

    function setInputError(inputElement, message) {
        inputElement.classList.add("form-input-error");
        inputElement.parentElement.parentElement.querySelector(".form-input-error-message").textContent= message;
    }

    function clearInputError(inputElement) {
        inputElement.classList.remove("form-input-error");
        inputElement.parentElement.parentElement.querySelector(".form-input-error-message").textContent= "";
    }

</script>

<body>
    <div class="navbar">
        <div class="navbar-links">
            <a class="navbar-logo" href="/">
                <img src="./icon/edu.png" alt="logo">
            </a>
            <div class="navbar-items items">
                <p><a href="#item1">Home</a></p>
                <p><a href="#item2">What is it?</a></p>
                <p><a href="#item3">courses</a></p>
                <p><a href="#item4">Websites</a></p>
                <p><a href="#item5">Contact us</a></p>
            </div>
        </div>
        <div class="navbar-sign">
            <button type="button" class='register' on:click="{() => clearAllInputError('register')}">Create Account</button>
            <button type="button" class='connect' on:click="{() => clearAllInputError('login')}">Login</button>
        </div>
        <div class="menu">
            <div class="{menu_close ? "menu-logo" : "menu-logo menu-logo-open"}" id="menu-logo">
                <img src="./icon/menu.png" alt="menu icon" id="menu-img" on:click="{() => menu_close = false}">
            </div>
            <div class="{menu_close ? "menu-container form-hidden" : "menu-container"}" id="menu-form" use:clickOutside on:click_outside={handleClickOutside}>
                <div class="menu-items items">
                    <p><a href="#item1">Home</a></p>
                    <p><a href="#item2">About us</a></p>
                    <p><a href="#item3">Essec courses</a></p>
                    <p><a href="#item4">Other Websites</a></p>
                    <p><a href="#item5">Contact us</a></p>
                </div>
                <div class="menu-sign">
                    <button type="button" class='register' on:click="{() => clearAllInputError('register')}">Register</button>
                    <button type="button" class='connect' on:click="{() => clearAllInputError('login')}">Sign in</button>
                </div>
            </div>
        </div>
    </div>

    <div class="{current_form === 'none' ? "container form-hidden" : "container" }" id="container">
        <form class="{current_form === 'login' ? "form" : "form form-hidden" }" id="login">
            <h1 class="form-title">Login</h1>
            <div class="form-head">
                <img src="./icon/cross.png" alt= "closing form" class ="close_form" on:click="{() => clearAllInputError('none')}">
            </div>

            <div class="form-message"></div>
            <div class="form-input-group">
                <div class="form-input-group-icon">
                    <img class="form-input-icon" src="./icon/id.png" alt="ID icon">
                    <input type="text" id="user" class="form-input" autofocus placeholder="Username or email" on:blur="{(event) => verify_input(event)}" on:input="{(event) => clearInputError(event.target)}">
                </div>
                <div class="form-input-error-message"></div>
            </div>
            <div class="form-input-group">
                <div class="form-input-group-icon">
                    <img class="form-input-icon" src="./icon/pwd.png" alt="Password icon">
                    <input type="{login_type_pwd}" id="pwd" class="form-input" autofocus placeholder="Password" on:blur="{(event) => verify_input(event)}" on:input="{(event) => clearInputError(event.target)}">
                </div>
                <div class="password-icon">
                    <img class="{login_type_pwd === 'text' ? 'eye form-hidden' : 'eye'}" src="./icon/eye-close.png" alt="eye-close" on:mousedown="{() => login_type_pwd = 'text'}" >
                    <img class="{login_type_pwd === 'password' ? 'eye-off form-hidden' : 'eye-off'}" src="./icon/eye-open.png" alt="eye-open" on:mouseup="{() => login_type_pwd = 'password'}">
                  </div>
                <div class="form-input-error-message"></div>
            </div>
            <button class="form-button" type="submit">Continue</button>
            <p class="form-text">
                <a href="#" class="form-link" on:click="{()=>console.log(document)}">
                    Forgot password
                </a>
            </p>
            <p class="form-text"> Don't have account? 
                <a class="form-link" href="./" id="linkCreateAccount" on:click="{() => clearAllInputError('register')}">
                    Create an account
                </a>.
            </p>
        </form>
        <form class="{current_form === 'register' ? "form" : "form form-hidden" }" id="createAccount">
            <h1 class="form-title">Create Account</h1>
            <div class="form-head">
                <img src="./icon/cross.png" alt="closing form" class="close_form" on:click="{() => clearAllInputError('none')}">
            </div>
            <div class="form-message"></div>
            <div class="form-input-group">
                <div class="form-input-group-icon">
                    <img class="form-input-icon" src="./icon/id.png" alt="ID icon">
                    <input type="text" id="username" class="form-input" autofocus placeholder="Username" on:blur="{(event) => verify_input(event)}" on:input="{(event) => clearInputError(event.target)}">
                </div>
                <div class="form-input-error-message"></div>
            </div>
            <div class="form-input-group">
                <div class="form-input-group-icon">
                    <img class="form-input-icon" src="./icon/mail.png" alt="Mail icon">
                    <input type="text" id="mail-address" class="form-input" autofocus placeholder="Email address" on:blur="{(event) => verify_input(event)}" on:input="{(event) => clearInputError(event.target)}">
                </div>
                <div class="form-input-error-message"></div>
            </div>
            <div class="form-input-group">
                <div class="form-input-group-icon">
                    <img class="form-input-icon" src="./icon/pwd.png" alt="Password icon">
                    <input type="{register_type_pwd}" id="password" class="form-input" autofocus placeholder="Password" on:blur="{(event) => verify_input(event)}" on:input="{(event) => clearInputError(event.target)}">
                </div>
                <div class="password-icon">
                    <img class="{register_type_pwd === 'text' ? 'eye form-hidden' : 'eye'}" src="./icon/eye-close.png" alt="eye-close" on:mousedown="{() => register_type_pwd = 'text'}" >
                    <img class="{register_type_pwd === 'password' ? 'eye-off form-hidden' : 'eye-off'}" src="./icon/eye-open.png" alt="eye-open" on:mouseup="{() => register_type_pwd = 'password'}">
                </div>
                <div class="form-input-error-message"></div>
            </div>
            <div class="form-input-group">
                <div class="form-input-group-icon">
                    <img class="form-input-icon" src="./icon/check.png" alt="Checked password icon">
                    <input type="{register_type_conf_pwd}" id="confirmed-password" class="form-input" autofocus placeholder="Confirm" on:blur="{(event) => verify_input(event)}" on:input="{(event) => clearInputError(event.target)}">
                </div>
                <div class="password-icon">
                    <img class="{register_type_conf_pwd === 'text' ? 'eye form-hidden' : 'eye'}" src="./icon/eye-close.png" alt="eye-close" on:mousedown="{() => register_type_conf_pwd = 'text'}" >
                    <img class="{register_type_conf_pwd === 'password' ? 'eye-off form-hidden' : 'eye-off'}" src="./icon/eye-open.png" alt="eye-open" on:mouseup="{() => register_type_conf_pwd = 'password'}">
                </div>
                <div class="form-input-error-message"></div>
            </div>
            <button class="form-button" type="submit" class:active={$page.url.pathname === '/summary'}>
                Continue
            </button>
            <p class="form-text">Already have an account?
                <a class="form-link" href="./" id="linkLogin" on:click="{() => clearAllInputError('login')}">
                    Sign in
                </a>.
            </p>
        </form>
    </div>
</body>

