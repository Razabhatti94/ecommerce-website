import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  ref,
  storage,
  uploadBytes,
  getDownloadURL,
} from "../utils.js";

const pictureDisplay = document.getElementById("pictureDisplay");
const profileData = document.getElementById("profileData");
const profileImg = document.getElementById("profileImg");
const backBtn = document.getElementById("backBtn");

profileData.addEventListener("submit", (e) => {
  console.log("form data");
  e.preventDefault();
  const password1 = e.target[1].value;
  const password2 = e.target[2].value;
  const saveBtn = e.target[8];
  const resetBtn = e.target[9];
    saveBtn.value = 'Saving';
    saveBtn.disabled = true;
    resetBtn.disabled = true;

  if (password1 === password2) {
    console.log("password match");
    let userData = {
      email: e.target[0].value,
      password: e.target[1].value,
      firstName: e.target[3].value,
      lastName: e.target[4].value,
      phoneNumber: e.target[5].value,
      zipCode: e.target[6].value,
      image: e.target[7].files[0],
    };
    console.log(userData);

     createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then( async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        const uid = user.uid;
        const imagesRef = ref(storage, `UserImage/${uid}`);
        await uploadBytes(imagesRef, userData.image)
        .then((snapshot) => {
            console.log('Uploaded a blob or file!');
        }).catch((error) => {
            console.log('File uploading error')
            // Handle any errors
            });
            const imageUrl = await getDownloadURL(imagesRef)
            .then( async (url) => {
                console.log(url)
                userData.image= url;
                
            })
            .catch((error) => {
                console.log('Url download error')
            // Handle any errors
            });
            const dataRef = doc(db, "Users", uid);
            console.log('data uploading')
            await setDoc(dataRef, userData);
            console.log("data uploaded");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('data uploading error')
            // ..
          });
          saveBtn.value = 'Submit';
          saveBtn.disabled = false;
          resetBtn.disabled = false;
          profileData.reset()
          window.location.href = '../../index.html';
  } else {
    alert("Password incorrect");
  }
});

profileImg.addEventListener("change", () => {
  const file = profileImg.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target.result;
      pictureDisplay.innerHTML = "";
      pictureDisplay.appendChild(img);
    };

    reader.readAsDataURL(file);
  } else {
    pictureDisplay.innerHTML = "No file selected";
  }
});

backBtn.addEventListener("click", () => {
  console.log("Button working");
  window.location.href = "../../index.html";
});
