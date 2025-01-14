
window.onload = async function () {
  // Fetching Cart
  let dataOfItems = await fetch("/customer/cartdetails")
  let responseOfOItems = await dataOfItems.json()
  let dataContainer = ""
  // making cards for items
  responseOfOItems.forEach(element => {
    discountedPrice = element.product.price - (element.product.price * (element.product.discount / 100))
    dataContainer += `            <li id="${element.product._id}" class="flex py-6 sm:py-10">
              <div class="shrink-0">
                <img src="${element.product.image[0]}"
                  alt="${element.product.name}" class="size-24 rounded-md object-cover sm:size-48" />
              </div>

              <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <a href="#" class="font-medium text-gray-700 hover:text-gray-800">${element.product.name}</a>
                      </h3>
                    </div>
                    <p class="productPrice mt-1 text-sm font-medium text-gray-900">${discountedPrice} Rs</p>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                    <div class="flex items-center space-x-2 w-full max-w-24">
                      <!-- Plus SVG -->
                      <svg  xmlns="https://www.svgrepo.com/show/522437/plus.svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="plusSvg text-gray-400 hover:text-indigo-600">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>

                      <!-- Input Display -->
                      <div min="1" required
                        class="flex items-center justify-center appearance-none rounded-md bg-white py-1.5 px-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm">
                        ${element.quantity}
                      </div>

                      <!-- Minus SVG -->
                      <svg xmlns="https://www.svgrepo.com/show/522437/plus.svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="minusSvg text-gray-400 hover:text-indigo-600">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </div>

                    <div class="absolute right-0 top-0">
                      <button type="button" class=" -m-2 inline-flex p-2 text-gray-400 hover:text-indigo-600">
                        <span class="sr-only">Remove</span>
                        <svg class="size-5 remove-item-btn" id="${element.product._id}" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                          <path
                            d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>`
  });
  document.getElementById("ItemsContainer").innerHTML = dataContainer

  // Fetching Prices on load 
  let totalPrice = 0
  if (responseOfOItems.length == 0) {
    Array.from(document.getElementById("AmountBox").getElementsByTagName("dd")).forEach(element => {
      element.innerHTML = 0 + " Rs"
    })
    document.getElementById("SummaryBox").classList.remove("hidden")
  } else {
    let cost = 0
    responseOfOItems.forEach(element => {
      if (element.product.discount == 0) {
        cost += element.product.price * element.quantity
      } else {
        cost += (element.product.price - (element.product.price * (element.product.discount / 100))) * element.quantity
      }
    })
    document.getElementById("Subtotal").innerHTML = cost + " Rs"
    document.getElementById("ShippingTotal").innerHTML = 1000 + " Rs"
    document.getElementById("OrderTotal").innerHTML = (parseInt(document.getElementById("Subtotal").innerHTML.split(" ")[0]) + parseInt(document.getElementById("ShippingTotal").innerHTML.split(" ")[0])) + " Rs"
    document.getElementById("SummaryBox").classList.remove("hidden")
  }


  // functions for increase and decrease of thjings
  increaseDeccreaseQuantity()
  removeItem()
}


function increaseDeccreaseQuantity() {

  // when  the item is incremented
  document.querySelectorAll(".plusSvg").forEach(btn => {
    btn.addEventListener("click", async () => {
      val = parseInt(btn.nextElementSibling.innerHTML) + 1
      btn.nextElementSibling.innerHTML = val
      let productQuantity = val
      let productId = btn.closest('li').id
      // increase in amount
      increaseAmount(productQuantity,productId)
      setTimeout(async () => {
        let data = await fetch("/customer/increasequantity", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: productId, quantity: val })
        })
      }, 5000);
    })
  })

  // when item is decremented
  document.querySelectorAll(".minusSvg").forEach(btn => {
    btn.addEventListener("click", async () => {
      if (btn.previousElementSibling.innerHTML > 1) {
        val = parseInt(btn.previousElementSibling.innerHTML) - 1
        btn.previousElementSibling.innerHTML = val
        let productId = btn.closest('li').id
        let productQuantity = val
        // decrease in amount
        decreaseAmount(productQuantity,productId)
        setTimeout(async () => {
          let data = await fetch("/customer/decreasequantity", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: productId, quantity: val })
          })
        }, 5000);
      }
    })
  })
}


// function to remove item
function removeItem() {
  document.querySelectorAll(".remove-item-btn").forEach(element => {
    element.addEventListener("click", async () => {
      let productId = element.id
      console.log(productId)
      document.getElementById(productId).remove()
      let data = await fetch("/customer/removefromcart", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: productId })
      })
    })
  })
}

// change of amounts
function increaseAmount(quantity,productid){
  let cost = parseInt(document.getElementById("Subtotal").innerHTML.split(" ")[0])+parseInt((document.getElementById(productid).getElementsByClassName("productPrice")[0].innerHTML).split(" ")[0])
  document.getElementById("Subtotal").innerHTML = cost + " Rs"
  document.getElementById("OrderTotal").innerHTML = (parseInt(document.getElementById("Subtotal").innerHTML.split(" ")[0]) + parseInt(document.getElementById("ShippingTotal").innerHTML.split(" ")[0])) + " Rs"
}
function decreaseAmount(quantity,productid){
  let cost = parseInt(document.getElementById("Subtotal").innerHTML.split(" ")[0])-parseInt((document.getElementById(productid).getElementsByClassName("productPrice")[0].innerHTML).split(" ")[0])
  document.getElementById("Subtotal").innerHTML = cost + " Rs"
  document.getElementById("OrderTotal").innerHTML = (parseInt(document.getElementById("Subtotal").innerHTML.split(" ")[0]) + parseInt(document.getElementById("ShippingTotal").innerHTML.split(" ")[0])) + " Rs"
}