window.onload = async function () {
    let productID = localStorage.getItem("productID");
    let data = await fetch("/product/getproductdata", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productID }),
    });
    let response = await data.json();
    document.getElementById("ProductName").value = response.name;
    document.getElementById("ProductPrice").value = response.price;
    document.getElementById("ProductDiscount").value = response.discount;
    document.getElementById("productDescription").value = response.description;
    let imageContainer = document.getElementById("image-container");
    let fileArray = response.image;
    // console.log(fileArray)
    let imgDiv = "";
    fileArray.forEach((img) => {
        imgDiv += `
<div class="relative">
    <img src="${img}"
        alt="Back of women's Basic Tee in black."
        class="rounded-lg w-full h-full object-cover">
    <button
        class="absolute top-2 right-2 bg-gray-500 text-white rounded-full p-1 hover:bg-gray-700 focus:outline-none"
        aria-label="Delete Image">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
</div>
                `;
    });
    imageContainer.innerHTML = imgDiv;
    addEventListenerToCross(fileArray)
    formSubmit(fileArray)
};



function formSubmit(fileArray) {
    let selectedImages = []
    let productID = localStorage.getItem("productID");
    document.getElementById("EditProduct-Form").addEventListener("submit", async (event) => {
        event.preventDefault()
        let productName = document.getElementById("ProductName").value
        let productDescription = document.getElementById("productDescription").value
        let productPrice = document.getElementById("ProductPrice").value
        let productDiscount = document.getElementById("ProductDiscount").value
        let data = await fetch("/product/editProductChanges",{
            method : "POST",
            headers : {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({id:productID,image:fileArray,name:productName,price:productPrice,description:productDescription,dicount:productDiscount})
        })
    
        let response = await data.json()
        if (response.success) {
            window.location.href = "/product/edit"
        }
    })


    document.getElementById('file-upload').addEventListener('change', handleFileSelect);

    function handleFileSelect(event) {
        const files = event.target.files;
        selectedImages = Array.from(files);
        selectedImages.forEach((file) => {
            if (file.type.match('image.*')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64Image = e.target.result;
                    fileArray.push(base64Image);
                    console.log(fileArray)
                    updateImageCount();
                };
                reader.readAsDataURL(file);
            } else {
                console.warn(`The file ${file.name} is not an image and will be skipped.`);
            }
        });
    }

    function updateImageCount() {
        const imageCountElement = document.getElementById('image-count');
        imageCountElement.textContent = `${selectedImages.length} image(s) selected`;
    }

}



function addEventListenerToCross(fileArray) {
    Array.from(document.getElementsByTagName("svg")).forEach((svg) => {
        svg.addEventListener("click", (event) => {
            let src = svg.parentNode.parentNode.firstChild.parentElement.firstChild.nextSibling.src;

            fileArray.forEach((item, index) => {
                if (item === src) {
                    fileArray.splice(index, 1);
                    console.log(fileArray);
                }
            });

            svg.parentNode.parentNode.firstChild.parentElement.remove();
        });
    });
}
