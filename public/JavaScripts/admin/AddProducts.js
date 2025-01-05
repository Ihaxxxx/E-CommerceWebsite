console.log("meow")
let selectedImages = []; 




document.getElementById("AddProduct-From").addEventListener("submit",async (event)=>{
  event.preventDefault()
  let productName = document.getElementById("ProductName").value
  let productDescription = document.getElementById("productDescription").value
  let productPrice = document.getElementById("ProductPrice").value
  let productDiscount = document.getElementById("ProductDiscount").value
    let data = await fetch("/product/addproduct",{
        method : "POST",
        headers : {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({image:selectedImages,name:productName,price:productPrice,description:productDescription,dicount:productDiscount})
    })

    let response = await data.json()
    console.log(response)

})

document.getElementById('file-upload').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
  const files = event.target.files;
  const fileArray = Array.from(files);
  fileArray.forEach((file) => {
    if (file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        selectedImages.push(base64Image);
        console.log(selectedImages)
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

