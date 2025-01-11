

window.onload = async function() {
    const cookieName = "token";
    const cookieValue = getCookieValue(cookieName);
    document.querySelectorAll(".login-logout-btn").forEach(element => {
        if (cookieValue == "") {
            element.innerHTML = `<a href="/loginPage" class="text-sm/6 font-semibold text-white">Log in <span aria-hidden="true">&rarr;</span></a>`
        }else{
            element.innerHTML = `<a href="/customer/logout" class="text-sm/6 font-semibold text-white">Log Out <span aria-hidden="true">&rarr;</span></a>`
        }
    })
    productID = localStorage.getItem("productID")
    let data = await fetch("/product/getproductdata", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productID }),
    });
    let response = await data.json();
    console.log(response)
    document.getElementById("productName").innerHTML = response.name
    document.getElementById("productDescription").innerHTML = response.description
    if (response.discount == 0) {
        document.getElementById("productPrice").innerHTML = response.price 
    }else{
        document.getElementById("productPrice").innerHTML = response.price - (response.price * (response.discount/100))
        document.getElementById("productDiscountedPrice").innerHTML = response.price
    }
    let imgContainer = ""
    response.image.forEach(element => {
        imgContainer += `                            <button id="tabs-1-tab-1"
                                class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-500/50 focus:ring-offset-4"
                                aria-controls="tabs-1-panel-1" role="tab" type="button">
                                <span class="sr-only">Angled view</span>
                                <span class="absolute inset-0 overflow-hidden rounded-md">
                                    <img class="imagesTab" src="${element}"
                                        alt="" class="size-full object-cover">
                                </span>
                                <!-- Selected: "ring-indigo-500", Not Selected: "ring-transparent" -->
                                <span
                                    class="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2"
                                    aria-hidden="true"></span>
                            </button>`
    });
    document.getElementById("displayImage").src = response.image[0]
    document.getElementById("multipleImagesContainer").innerHTML = imgContainer
    addEventListenerToImages()

}


function addEventListenerToImages(){
    document.querySelectorAll(".imagesTab").forEach(element =>{
        element.addEventListener("click",()=>{
        document.getElementById("displayImage").src = element.src

        })
    })
}

function getCookieValue(cookieName) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(cookieName + "=")) {
            return cookie.substring(cookieName.length + 1);
        }
    }
    return null;
}



document.getElementById("AddToCartBtn").addEventListener("submit", async (event)=>{
    event.preventDefault()
    let quantity = document.getElementById("ItemQuantity").value
    let productID = localStorage.getItem("productID")
    console.log(quantity)
    console.log(productID)
    let data = await fetch("/customer/addtocart",{
        method : "POST",
            headers : {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({productID: productID,quantity:quantity})
    })
    console.log(data)

    // console.log(data.status === 200)
    // console.log(document.getElementById("error-bar-success").classList)
    if (data.status === 200) {
        document.getElementById("error-bar-success").classList.remove("hidden")
    }else{
        document.getElementById("error-bar-falure").classList.remove("hidden")
    }
})