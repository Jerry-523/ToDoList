let session = document.cookie.split("; ").find((row) => row.startsWith("session=")) ?.split("=")[1]; // Get session ID
if (session) {
    location.href = "main.html";
}

var formLogin = document.querySelector('#login')
var formCadastro = document.querySelector('#cadastro')
var btnColor = document.querySelector('.btnColor')

document.querySelector('#btnLogin').addEventListener('click', () => {
    formLogin.style.left = "25px"
    formCadastro.style.left = "450px"
    btnColor.style.left = "0px"
    
})

document.querySelector('#btnCadastro')
.addEventListener('click', () => {
    formLogin.style.left = "-450px"
    formCadastro.style.left = "25px"
    btnColor.style.left = "110px"
    
})

$('form').submit((e) => {
    e.preventDefault()
    console.log("event", e)
    
    $.post({
        url: "/login",
        // Include data from form
        data: {
            email: $('.email').val(),
            password: $('.password').val(),
        },
        // When response received
        success: (res) => {
            if (res['success']) { // If request succeeded
                let session = res['session']; // Get session ID
                if ($('.remember-me').is(':checked')) { // If remember me checked
                    // Set cookie to expire in a year from now
                    var expireDate = new Date();
                    expireDate.setFullYear(expireDate.getFullYear() + 1);
                    document.cookie = `session=${session}; expires=${expireDate.toUTCString()}; path=/`
                }
                else {
                    // Set cookie to expire when the browser is closed
                    document.cookie = `session=${session}; path=/`
                }
                alert("Login com sucesso")
                location.href = "main.html"; // Go to main page
            }
            else { // If request failed
                let err = res['msg']; // Get message from response
                $('.err-msg').show(); // Show err-msg element
                $('.err-msg').html(err); // Change contents of err-msg to message
                alert("Falha no Servidor")
            }
        }
    });
});