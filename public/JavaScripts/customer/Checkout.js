window.onload = async function () {
    let dataOfItems = await fetch("/customer/cartdetails")
    let responseOfOItems = await dataOfItems.json()
    displayItems(responseOfOItems)
}




document.getElementById("orderDetailsForm").addEventListener("submit", async (event) => {
    allowSubmission = true
    event.preventDefault()
    let address = document.getElementById("address").value + " " + document.getElementById("apartment").value
    let email = document.getElementById("email-address").value
    let city = document.getElementById("city").value
    let state = document.getElementById("region").value
    let orderDescription = document.getElementById("Instructions").value
    if (allowSubmission) {
        let data = await fetch("/customer/placeorder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ address, email, city, state, orderDescription }),
        });
        if (data.status === 200) {
            document.getElementById("error-bar-success").classList.remove("hidden")
            window.location.href = "/thankyou"
            allowSubmission = false
        } else {
            document.getElementById("error-bar-falure").classList.remove("hidden")
        }
        window.onunload = function () {
            window.location.href = "/shop";
        };
    } else {

    }

})



function displayItems(data) {
    let dataToInsertInContainer = ""
    let totalPrice = 0
    data.forEach(element => {
        totalPrice += (element.product.price - (element.product.price * (element.product.discount / 100))) * element.quantity
        dataToInsertInContainer += `<li class="flex items-start space-x-4 py-6">
                <img src="${element.product.image[0]}"
                  alt="${element.product.name}"
                  class="size-20 flex-none rounded-md object-cover">
                <div class="flex-auto space-y-1">
                  <h3>${element.product.name}</h3>
                  <p class="text-gray-500">${(element.product.price - (element.product.price * (element.product.discount / 100)))} Rs</p>
                  <p class="text-gray-500">${element.quantity}</p>
                </div>
                <p class="flex-none text-base font-medium">${(element.product.price - (element.product.price * (element.product.discount / 100))) * element.quantity} Rs</p>
              </li>`
    });
    document.querySelectorAll(".Subtotal").forEach(e => {
        e.innerHTML = totalPrice + " Rs"
    })
    // console.log(document.querySelector(".totalCost").innerHTML.split(" ")[0])
    console.log(document.querySelector(".Shipping"))
    document.querySelectorAll(".totalCost").forEach(e => {
        e.innerHTML = totalPrice + parseInt(document.querySelector(".Shipping").innerHTML.split(" ")[0]) + " Rs"
    })

    document.getElementById("productDisplayList").innerHTML = dataToInsertInContainer

}