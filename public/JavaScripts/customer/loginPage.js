document.getElementById("Login-Form").addEventListener("submit",async(event)=>{
    event.preventDefault()
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    // sending req to to login
    let data = await fetch("/customer/login",{
        method : "POST",
        headers : {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email:email,password:password})
    })
    let response = await data.json()
    if (response.success) {
        console.log(response)
    }else{
        document.getElementById("userexist-error").classList.remove("hidden")
    }
})