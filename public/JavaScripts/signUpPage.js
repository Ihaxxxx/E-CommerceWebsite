document.getElementById("signup-form").addEventListener("submit",async (event)=>{
    event.preventDefault()
    // User credentials
    let comfirmPassword = document.getElementById("confirm-password").value
    let password = document.getElementById("password").value
    let fullname = document.getElementById("fullname").value
    let email = document.getElementById("email").value
    console.log(comfirmPassword,password)
    // request fo regisering a user checking if passwords match
    if (comfirmPassword == password) {
        let data = await fetch("/customer/register",{
            method : "POST",
            headers : {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({fullname:fullname,email:email,password:password})
        })
        let response = await data.json()
        if (!response.success) {
        document.getElementById("userexist-error").classList.remove("hidden")
        }
    }else{
        // display off error if user is passwords dont match
        document.getElementById("password-error").classList.remove("hidden")
    }
})