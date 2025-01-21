window.onload = async function() {
    fetchOrderDetails()
}


async function fetchOrderDetails() {
    let data = await fetch("/customer/getorderdetails")
}