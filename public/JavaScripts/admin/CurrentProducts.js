window.onload =async function(){
    let data = await fetch("/product/seeproductsadminside")
    let response = await data.json()
    console.log(response)
    let ProductDiv = ''
    Array.from(response).forEach((product)=>{
        ProductDiv += `              <div class="p-6 rounded-md bg-gray-200">
                <div class="relative">
                  <div class="relative h-72 w-full overflow-hidden rounded-lg">
                    <img src="${product.image[0]}" alt="${product.name}" class="size-full object-cover">
                  </div>
                  <div class="relative mt-4">
                    <h3 class="text-sm font-medium text-gray-900">${product.name}</h3>
                    <p class="mt-1 text-sm text-gray-500">${product.description}</p>
                    <p class="mt-1 text-sm text-gray-500">${product.price} Rs</p>
                  </div>
                  <div class="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  </div>
                </div>
                <div class="mt-6">
                  <a id="${product._id}" class="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-7 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200">Edit</a>
              </div></div>`
    })
    document.getElementById("product-container").innerHTML = ProductDiv
    addEventListenerToAnchorTag()
}


function addEventListenerToAnchorTag(){
    Array.from(document.getElementsByTagName("a")).forEach(element => {
        if(element.id){
            element.addEventListener("click",async()=>{
                localStorage.setItem("productID",element.id)
                window.location.href = "/product/edit"
            })
        }
    });
}