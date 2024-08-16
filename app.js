import {
  auth,
  onAuthStateChanged,
  signOut,
  db,
  doc,
  onSnapshot,
  getDownloadURL,
  ref,
  storage,
} from "./auth/utils.js";

const loginIcon = document.getElementById("loginIcon");
const afterLogin = document.getElementById("afterLogin");
const signupPage = document.getElementById("signupPage");
const signOutBtn = document.getElementById("signOutBtn");
const userName = document.getElementById("userName");
const emailDisplay = document.getElementById("emailDisplay");

afterLogin.style.display = "none";

onAuthStateChanged(auth, (user) => {
  const uid = user.uid;

  if (user) {
    if (user !== null) {
      console.log("user Loged In");
      afterLogin.style.display = "flex";
      loginIcon.style.display = "none";
      const imageRef = ref(storage, `UserImage/${uid}`);
      getDownloadURL(imageRef)
        .then((url) => {
          afterLogin.src = url;
        })
        .catch(() => {
          console.log("error in image downloading");
        });
      const dataRef = doc(db, `Users/${uid}`);
      onSnapshot(
        dataRef,
        (snapshot) => {
          if (snapshot.exists()) {
            // console.log("Current data: ", snapshot.data());
            const userInfo = snapshot.data();
            userName.innerText = userInfo.firstName + " " + userInfo.lastName;
            emailDisplay.innerText = userInfo.email;
          } else {
            console.log("No such document!");
          }
        },
        (error) => {
          console.error("Error fetching document: ", error);
        }
      );
    }
  } else {
    console.log("Login Required");
    afterLogin.style.display = "none";
    loginIcon.style.display = "flex";
  }
});

signupPage.addEventListener("click", () => {
  window.location.href = "./auth/signup/signup.html";
});

signOutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful");
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
});

const products = document.getElementById("products");
let getProducts = [];

fetch("https://fakestoreapi.com/products")
  .then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  })
  .then((json) => {
    getProducts = json; // Store the fetched data in getProducts

    // Clear existing content
    products.innerHTML = "";

    // Generate and append HTML for each product
    getProducts.forEach((product) => {
      let card = `
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img class="p-8 rounded-t-lg" src="${product.image}" alt="${product.title}" />
          </a>
          <div class="px-5 pb-5">
            <a href="#">
              <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${product.title}</h5>
            </a>
            <div class="flex items-center mt-2.5 mb-5">
              <div class="flex items-center space-x-1 rtl:space-x-reverse">
                <!-- Example rating, adjust as necessary -->
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <!-- Add more SVGs for stars or adjust as necessary -->
              </div>
              <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
              <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
            </div>
          </div>
        </div>
      `;
      products.innerHTML += card; 
    });
  })
  .catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
  });