const nameHeading = document.getElementById("name");

const userData = JSON.parse(localStorage.getItem("token"));

nameHeading.textContent = userData.name;

const container = document.querySelector(".products-container");

const productData = document.querySelector(".modal-body");


const allInputs = document.getElementsByClassName('product-inputs');

const addAndUpdateBtn = document.getElementById('addAndUpdateBtn')





const productInputHandler = (e) => {

  let productData = {};

  const { name, value } = e.target;


  productData={
    ...productData,
    [name] : value
  }
}

let productId = ''




const updateProduct = (name, price, category, id) => {
 
  allInputs[0].value = name;
  allInputs[1].value = price;
  allInputs[2].value = category
  addAndUpdateBtn.textContent = 'Update product';
  productId = id
  console.log(productId)
}


addAndUpdateBtn.addEventListener('click', async (e) => {

  e.preventDefault();


  const API = 'https://the-techie-crud.onrender.com'

  
  const productInformation = {
    name : allInputs[0].value,
    price: Number(allInputs[1].value),
    category : allInputs[2].value,
  }

  if(addAndUpdateBtn.textContent === 'Add Product'){


    const addProduct = await fetch(`${API}/create-product`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(productInformation),
    })


    const finalData = await addProduct.json();

    if(finalData){
      alert("Product added successfully");
      window.location.reload();
    }


    

  } else{

    const updateProduct = await  fetch(`${API}/update-product/${productId}`, {
      method : 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        authorization: `Bearer ${userData.userToken}`,
      },
      body: JSON.stringify(productInformation)
    })

    const updatedData = await updateProduct.json();

    if(updatedData){
      alert("Product data updated");

      window.location.reload();
    }


  }



})








const singleProduct = async (id) => {

productData.innerHTML = ''
  const API = `https://the-techie-crud.onrender.com/single-product/${id}`;

  const getSingleProduct = await fetch(API, {
    method: "GET",
    headers: {
      authorization: `Bearer ${userData.userToken}`,
    },
  });

  const productInfo = await getSingleProduct.json();


  let userRatings = ''

  for(let comments of productInfo.ratings){

       userRatings += `
        <div class='border' >
            <h2>Rating : ${comments.rating}</h2>
            <p>User Comment : ${comments.comment}</p>
        </div>

      `


  }



  const html = `<div class='border border-dark  rounded text-center' >
                                <div>
                                    <img height='150px' src=${productInfo.image} alt="data">
                                        <hr />
                                    </div>
                                <h3>Name : ${productInfo.name}</h3>
                                <h5>Price : ${productInfo.price}</h5>
                                <h6>Category: ${productInfo.category}</h6>
                                ${userRatings}
                            </div>
                            `;
                            productData.innerHTML += html;
};


const uploadPic = async (event, id)=> {
 

  const API = 'https://the-techie-crud.onrender.com'

  const imageData = event.target.files[0];


  const formData = new FormData();

  formData.append('image', imageData);

  const uploadImage = await fetch(`${API}/upload-product/${id}`, {
    method: 'POST',
    body: formData
  })


  const image = await uploadImage.json();
  if(image){
    alert("Profile uploaded succeefully....");
    window.location.reload();
  }
}




const deleteProduct = async (id) => {
  try {
    
    const API = 'https://the-techie-crud.onrender.com'


    const deleteProduct = await fetch(`${API}/delete-product/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${userData.userToken}`,
      },
    });

    const deletedProduct = await deleteProduct.json();

    if(deletedProduct){
      alert('Product is deleted.....')
      window.location.reload()
    }
    
  } catch (error) {
    console.log(error)
  }
  

}


window.onload = async () => {
  const API = "https://the-techie-crud.onrender.com/products";

  try {
    const products = await fetch(API, {
      method: "GET",
      headers: {
        authorization: `Bearer ${userData.userToken}`,
      },
    });

    const data = await products.json();

    for (let product of data) {
      const html = `<div class='border border-dark  rounded text-center' >
                                <div>
                                    <img height='150px' src=${product.image} alt="data">
                                        <hr />
                                    </div>
                                <h3>Name : ${product.name}</h3>
                                <h5>Price : ${product.price}</h5>
                                <h6>Category: ${product.category}</h6>
                                <button class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='singleProduct("${product._id}")'  >View</button>
                                <button class='btn btn-warning' onclick='updateProduct("${product.name}", "${product.price}", "${product.category}", "${product._id}")' >Update</button>
                                <button class='btn btn-danger'  onclick='deleteProduct("${product._id}")' >Delete</button>
                                <input onchange="uploadPic(event, '${product._id}')" class='form-control m-3 w-75'  type='file' />
                                </div>
                            `;
      container.innerHTML += html;
    }
  } catch (error) {
    console.log(error);
  }
};
