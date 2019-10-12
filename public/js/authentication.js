$('#usernameReg').keypress(function(e) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
});

$('#regClick').click(function() {
    document.getElementById('loginSection').style.display = "none";
    document.getElementById('loginSection').style.opacity = "0";
    $('#registrationSection').fadeTo(1000, 1, function() {
        document.getElementById('registrationSection').style.display = "block";
    });
});

$('#logClick').click(function() {
    document.getElementById('registrationSection').style.display = "none";
    document.getElementById('registrationSection').style.opacity = "0";
    $('#loginSection').fadeTo(1000, 1, function() {
        document.getElementById('loginSection').style.display = "block";
    });
});

var register_attempt = 0;

function register() {
    $(':button').prop('disabled', true);
    setTimeout(function() {
        $(':button').prop('disabled', false);
    }, 3000);
    var now = Date.now();
    if (now - register_attempt < 3000) {
        return;
    }
    register_attempt = now;
    if (document.getElementById("g-recaptcha-response").value) {
        if (document.getElementById('tos').checked) {
            if (document.getElementById('passwordReg').value == document.getElementById('passwordRegConfirm').value) {
                $.ajax({
                    type: "POST",
                    url: "/regAuth",
                    data: {
                        username: $('#usernameReg').val(),
                        password: $('#passwordReg').val(),
                        email: $('#emailReg').val(),
                        gender: $('#gender option:selected').val(),
                        captchaResponse: $('#g-recaptcha-response').val(),
                        ref: $('#referralReg').val()
                    },
                    success: function(response) {
                        $('#usernameLogin').val($('#usernameReg').val());
                        $('#passwordLogin').val($('#passwordReg').val());
                        login();
                    },
                    error: function(response) {
                        document.getElementById('regOutput').innerHTML = response.responseText;
                        grecaptcha.reset();
                    },
                });
            } else {
                document.getElementById('regOutput').innerHTML = "<font color='red'>Passwords do not match!</font>";
            }
        } else {
            document.getElementById('regOutput').innerHTML = "<font color='red'>You must accept the Terms of Service to register.</font>";
        }
    } else {
        document.getElementById('regOutput').innerHTML = "<font color='red'>Invalid reCAPTCHA.</font>";
    }
}

var login_attempt = 0;

function login() {
    $(':button').prop('disabled', true);
    setTimeout(function() {
        $(':button').prop('disabled', false);
    }, 5000);
    var now = Date.now();
    if (now - login_attempt < 5000) {
        return;
    }
    login_attempt = now;
    var getdate = new Date();
    $.ajax({
        type: "POST",
        url: "/loginAuth",
        data: {
            username: $('#usernameLogin').val(),
            password: $('#passwordLogin').val()
        },
        success: function(response) {
            window.location.href = '/main';
        },
        error: function(response) {
            document.getElementById('logOutput').innerHTML = response.responseText;
        },
    });
}

function keyup(arg1) {
    if (arg1 == 13) {
        login();
    }
}