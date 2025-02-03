window.onload = async function() {
    fetchOrderDetails()
}


async function fetchOrderDetails() {
    let data = await fetch("/customer/getorderdetails")
    let response = await data.json()
    console.log(response)
    let dataArray = response[response.length-1]
    let ItemData = ""
    // console.log(dataArray)
    // dataArray.productDetails.forEach(element => {
    //    ItemData += `          <div class="flex space-x-6 border-b border-gray-200 py-10">
    //         <img src="${element}"
    //           alt="Glass bottle with black plastic pour top and mesh insert."
    //           class="size-20 flex-none rounded-lg bg-gray-100 object-cover sm:size-40">
    //         <div class="flex flex-auto flex-col">
    //           <div>
    //             <h4 class="font-medium text-gray-900">
    //               <a href="#">Cold Brew Bottle</a>
    //             </h4>
    //             <p class="mt-2 text-sm text-gray-600">This glass bottle comes with a mesh insert for steeping tea or
    //               cold-brewing coffee. Pour from any angle and remove the top for easy cleaning.</p>
    //           </div>
    //           <div class="mt-6 flex flex-1 items-end">
    //             <dl class="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
    //               <div class="flex">
    //                 <dt class="font-medium text-gray-900">Quantity</dt>
    //                 <dd class="ml-2 text-gray-700">1</dd>
    //               </div>
    //               <div class="flex pl-4 sm:pl-6">
    //                 <dt class="font-medium text-gray-900">Price</dt>
    //                 <dd class="ml-2 text-gray-700">$32.00</dd>
    //               </div>
    //             </dl>
    //           </div>
    //         </div>
    //       </div>`
    // });

}