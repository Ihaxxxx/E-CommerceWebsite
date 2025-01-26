window.onload = async () => {
    
    const data = await fetch("/product/shop")
    const productsArray = await data.json()
    let productsDiv = ""
    productsArray.forEach(product=>{
        productsDiv += `            <div class="group relative">
              <div class="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                <img src="${product.image[0]}" alt="${product.name}" class="size-full object-cover">
              </div>
              <h3 class="mt-4 text-sm text-gray-700">
                <a class="anchorTagOfProducts" id="${product._id}" href="/product/viewproduct">
                  <span class="absolute inset-0"></span>
                  ${product.name}
                </a>
              </h3>
              <p class="mt-1 text-sm font-medium text-gray-900">${product.price}</p>
            </div>`
    })
    document.getElementById("productContainer").innerHTML = productsDiv
    addEventListenerToAnchorTag()
}



function addEventListenerToAnchorTag() {
    const cookieName = "token";
    const cookieValue = getCookieValue(cookieName);

    if (cookieValue != "") {
        document.querySelectorAll(".anchorTagOfProducts").forEach(element =>{
            element.addEventListener("click" , (event)=>{
                localStorage.setItem("productID",element.id)
            })
        })
    }else{
        document.querySelectorAll(".anchorTagOfProducts").forEach(element =>{
            element.addEventListener("click", (event)=>{
                event.preventDefault()
                document.getElementById("error-bar").classList.remove("hidden")
            })
        })
    }
}




function getCookieValue(cookieName) {
    const cookies = document.cookie.split(';');
    console.log(cookies)
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(cookieName + "=")) {
            return cookie.substring(cookieName.length + 1);
        }
    }
}