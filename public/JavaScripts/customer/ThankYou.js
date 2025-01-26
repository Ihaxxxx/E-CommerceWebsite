window.onload = async function() {
    fetchOrderDetails()
}


async function fetchOrderDetails() {
    let data = await fetch("/customer/getorderdetails")
    let response = await data.json()
    response[response.length-1]
}