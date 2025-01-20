window.onload = async function() {
    let dataOfItems = await fetch("/customer/cartdetails")
    let responseOfOItems = await dataOfItems.json()
    console.log(responseOfOItems)
}