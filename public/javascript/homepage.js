let learnMoreButton = document.querySelector(".buttonLM");
let dryFoods = document.querySelector(".dry-foods");
let spices = document.querySelector(".spices");
let choose = document.querySelectorAll(".choose");
let myText = document.querySelector("#myText");
let sort = document.querySelector("#sort");
let signout = document.querySelector(".sign-out");
let cart = document.querySelector(".cart");
let picUpload = document.querySelector(".details .pic img");
let nameOfPerson = document.querySelector(".details .User .name");
let backToHome = document.querySelector(".rectangle .backToHome");
let productsDiv = document.querySelector(".products");
let similarUsers = [];
let similarProducts = [];
let pastPurchase = [];
let newUser = [];
let addAll = document.querySelector(".portion4");

addAll.addEventListener("click", addAllHandler);

function addAllHandler() {
    let allDabbaCart = productsDiv.querySelectorAll(".add-to-cart img");
    let allDabbaTick = productsDiv.querySelectorAll(".product .fas");

    for (let i = 0; i < allDabbaCart.length; i++) {
        allDabbaCart[i].style.display = "none";
        allDabbaTick[i].style.display = "block";
    }



    for (let j = 0; j < similarProducts.length; j++) {
        cartObject[similarProducts[j][1]] = similarProducts[j];
        localStorage.setItem("cart", JSON.stringify(cartObject));
    }

    for (let j = 0; j < similarUsers.length; j++) {
        cartObject[similarUsers[j][1]] = similarUsers[j];
        localStorage.setItem("cart", JSON.stringify(cartObject));
    }

    for (let j = 0; j < pastPurchase.length; j++) {
        cartObject[pastPurchase[j][1]] = pastPurchase[j];
        localStorage.setItem("cart", JSON.stringify(cartObject));
    }
    for (let j = 0; j < newUser.length; j++) {
        cartObject[newUser[j][1]] = newUser[j];
        localStorage.setItem("cart", JSON.stringify(cartObject));
    }






}

async function newUserHandler() {
    let res = await axios.get("https://flipsmartnewusers.azurewebsites.net/predict");
    for (let x in res.data) {
        let y = [res.data[x].item, JSON.parse(x), JSON.parse(res.data[x].price), , res.data[x].imgLink, res.data[x].size, 1, res.data[x].api];
        newUser.push(y);
    }
    console.log(newUser);
    setNewUser(newUser);
}
// newUserHandler();


async function similarProductsHandler(product_name) {
    let res = await axios.get(`https://flipsmartsimilarproduct.azurewebsites.net/predict/${product_name}`);
    console.log(res.data);
    let temp = []
    let y = [res.data.item, JSON.parse(res.data.id), JSON.parse(res.data.price), , res.data.imgLink, res.data.size, 1, res.data.api];
    similarProducts.push(y);
    temp.push(y)
    console.log(similarProducts);
    setNewUser(temp);
}

async function similarUsersHandler(product_name) {
    let res = await axios.get(`https://flipsmartsimilarusers.azurewebsites.net/predict/${product_name}`);
    console.log(res.data);
    let temp = []
    for (let x in res.data) {
        let y = [res.data[x].Name, JSON.parse(x), JSON.parse(res.data[x].Price), , res.data[x].ImgLink, res.data[x].Size, 1, res.data[x].api];
        similarUsers.push(y);
        temp.push(y)
    }
    console.log(similarUsers);
    setNewUser(temp);
}

async function pastPurchaseHandler(product_name) {
    let res = await axios.get(`https://pastpurchasesapiflipsmart.azurewebsites.net/predict/${product_name}`);
    console.log(res.data);
    let temp = []
    for (let x in res.data) {
        let y = [res.data[x].Name, JSON.parse(x), JSON.parse(res.data[x].Price), , res.data[x].ImgLink, res.data[x].Size, 1, res.data[x].api];
        pastPurchase.push(y);
        temp.push(y)
    }
    console.log(pastPurchase);
    setNewUser(temp);
}



function setNewUser(newUser) {
    for (let i = 0; i < newUser.length; i++) {
        let product = document.createElement("div");
        product.classList.add("product");
        product.innerHTML = `
        
            <div class="image">
                <img src="${newUser[i][4]}" alt="" srcset=""> </img>
            </div>
            <div class="product-details">
                <div class="name-product">${newUser[i][0].toUpperCase()} <span>(${newUser[i][5]})</span></div>
                <div class="amount">Rs. ${newUser[i][2]}</div>
                <div class="api-in">${newUser[i][7].toUpperCase()}</div>
            </div>
            <div class="add-to-cart">
                <img src="./images/add to cart.png" alt="" srcset="">
                <i class="fas fa-check" style = "display: none;"></i>
            </div>
        `
        let blackCart = product.querySelector(".product .add-to-cart img");
        let checkCart = product.querySelector(".add-to-cart .fas");
        if (cartObject[newUser[i][1]]) {
            blackCart.style.display = "none";
            checkCart.style.display = "block";
        }
        else {
            blackCart.style.display = "block";
            checkCart.style.display = "none";
        }
        blackCart.addEventListener("click", function () {
            console.log("clicked");
            blackCart.style.display = "none";
            checkCart.style.display = "block";
            cartObject[newUser[i][1]] = newUser[i];
            localStorage.setItem("cart", JSON.stringify(cartObject));
        });
        checkCart.addEventListener("click", function () {
            blackCart.style.display = "block";
            checkCart.style.display = "none";
            delete cartObject[newUser[i][1]];
            localStorage.setItem("cart", JSON.stringify(cartObject));
        });
        productsDiv.appendChild(product);

    }
}
// let blackCart = document.querySelector(".product .add-to-cart img");
// let checkCart = document.querySelector(".add-to-cart .fas");

// blackCart.addEventListener("click", function () {
//     console.log("clicked");
//     blackCart.style.display = "none";
//     checkCart.style.display = "block";
//     cartObject[data[i][1]] = [...filteredArr[i], 1];
//     localStorage.setItem("cart", JSON.stringify(cartObject));
// });
// checkCart.addEventListener("click", function () {
//     blackCart.style.display = "block";
//     checkCart.style.display = "none";
//     delete cartObject[filteredArr[i][1]];
//     localStorage.setItem("cart", JSON.stringify(cartObject));
// });

console.log(firebase.auth().currentUser);
let uuid = localStorage.getItem("uuid");
if (!uuid) {
    window.location.href = "/signIn";
}
console.log(uuid);
if (uuid == '"gyEPIe1VGqfdVjrMSzSYwaPFki62"') {
    newUserHandler();
}
async function photoUpload() {
    try {
        let obj = await firebase.firestore().collection("user").doc(JSON.parse(uuid)).get();
        let data = await obj.data();
        console.log(obj, data);
        picUpload.setAttribute("src", data.dp);
        nameOfPerson.innerHTML = data.name;
    }
    catch (err) {
        console.log(err);
    }

}
cart.addEventListener("click", cartHandler);
photoUpload();
function cartHandler() {
    window.location.href = "/cart";
}

signout.addEventListener("click", signOutHandler);

async function signOutHandler() {
    try {
        await firebase.auth().signOut();
        localStorage.setItem("uuid", "");
        localStorage.clear();
        window.location.href = "/signIn";

    }
    catch (err) {
        alert("Unable to sign out!");
        console.log(err);
    }
}

const part5 = document.querySelector(".part5");
console.log(choose);
let prevCart = JSON.parse(localStorage.getItem("cart"));
let cartObject = {};
if (prevCart) {
    cartObject = prevCart;
}
let filter = document.querySelectorAll(".part3 div");
let filteredArr = data;

function init() {
    let wrapper = document.createElement("div");
    for (let i = 0; i < filteredArr.length; i++) {
        let pdDiv = document.createElement("div")
        pdDiv.classList.add("product-description");
        pdDiv.setAttribute("data-id", data[i][1]);
        pdDiv.classList.add(filteredArr[i][3].split(" ").join(""));
        pdDiv.innerHTML = ` <div class="a">
                        
                        <img src="${filteredArr[i][4]}" alt="" srcset="">
                    </div>
                    <div class="b">
                    
                        <div class="description-name"><span>${filteredArr[i][0].toUpperCase()}</span> <br> <span> ${filteredArr[i][5]} </span> <br> Rs. ${filteredArr[i][2]} </div>
                        <div class="like">
                        <img src = "images/black-heart.webp" class = "black-heart">
                        <img src = "images/red-heart.webp" class = "red-heart" style = "display: none;">
                        </div>
                        <div class="description-addToCart">
                            <img src="images/blue-add.png" alt="" srcset="">
                            <i class="fas fa-check" style = "display: none;"></i>
                        </div>
                    </div>`
        
        let cartButton = pdDiv.querySelector(".description-addToCart img");

        let checkButton = pdDiv.querySelector(".fas");
        let blackHeart = pdDiv.querySelector(".black-heart");
        // console.log(blackHeart);
        let redHeart = pdDiv.querySelector(".red-heart");
        // console.log(redHeart);
        redHeart.addEventListener("click", changeRed);
        blackHeart.addEventListener("click", changeBlack);
        function changeRed(){
            blackHeart.style.display = "flex";
            redHeart.style.display = "none";
        }
        function changeBlack(){
            blackHeart.style.display = "none";
            redHeart.style.display = "flex";
        }
        if (cartObject[filteredArr[i][1]]) {
            cartButton.style.display = "none";
            checkButton.style.display = "block";
            similarProductsHandler(filteredArr[i][0]);
            similarUsersHandler(filteredArr[i][0]);
            if (uuid == '"bbNNQ2cX1ZNRbHL994DWsMCb7JQ2"') {
                pastPurchaseHandler(filteredArr[i][0]);
            }
        }
        else {
            cartButton.style.display = "block";
            checkButton.style.display = "none";
        }
        cartButton.addEventListener("click", function () {
            cartButton.style.display = "none";
            checkButton.style.display = "block";
            cartObject[data[i][1]] = [...filteredArr[i], 1];
            localStorage.setItem("cart", JSON.stringify(cartObject));
            similarProductsHandler(filteredArr[i][0]);
            similarUsersHandler(filteredArr[i][0]);
            if (uuid == '"bbNNQ2cX1ZNRbHL994DWsMCb7JQ2"') {
                pastPurchaseHandler(filteredArr[i][0]);
            }
        });
        checkButton.addEventListener("click", function () {
            cartButton.style.display = "block";
            checkButton.style.display = "none";
            delete cartObject[filteredArr[i][1]];
            localStorage.setItem("cart", JSON.stringify(cartObject));
        });
        wrapper.appendChild(pdDiv)
    }
    part5.appendChild(wrapper);
}
init();



learnMoreButton.addEventListener("click", learnMoreBtnHandler);
for (let i = 0; i < choose.length; i++) {
    choose[i].addEventListener("click", chooseButtonHandler);
}

sort.addEventListener("change", sortHandler);

function priceLTH(a, b) {
    if (a[2] >= b[2]) {
        return 1;
    }
    else {
        return -1;
    }
}
function priceHTL(a, b) {
    if (a[2] <= b[2]) {
        return 1;
    }
    else {
        return -1;
    }
}

function alphaATZ(a, b) {
    if (a[0] >= b[0]) {
        return 1;
    }
    else {
        return -1;
    }
}

function alphaZTA(a, b) {
    if (a[0] <= b[0]) {
        return 1;
    }
    else {
        return -1;
    }
}

function sortHandler(e) {
    let sortValue = e.currentTarget.value;
    if (sortValue == "plth") {
        filteredArr.sort(priceLTH);
    }
    else if (sortValue == "phtl") {
        filteredArr.sort(priceHTL);
    }
    else if (sortValue == "atz") {
        filteredArr.sort(alphaATZ);
    } else {
        filteredArr.sort(alphaZTA);
    }
    part5.innerHTML = ""
    init();
}

function chooseButtonHandler(e) {
    for (let j = 0; j < choose.length; j++) {
        choose[j].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
    part5.innerHTML = "";
    if (e.currentTarget.classList[0] == "all") {
        filteredArr = data;
        init()
        return
    }
    filteredArr = data.filter(obj => {
        return obj[3].split(' ').join('') == e.currentTarget.classList[0];
    });


    init();

    //console.log(e.currentTarget.classList[0]);
}

myText.addEventListener("input", searchHandler);


function searchHelper(value) {
    filteredArr = data.filter(obj => {
        return obj[0].includes(value);
    });
    part5.innerHTML = "";
    init();
}
function searchHandler(e) {
    let value = e.target.value;
    searchHelper(value);
    for (let i = 0; i < choose.length; i++) {
        choose[i].classList.remove("active");
    }
    choose[0].classList.add("active");
}




function learnMoreBtnHandler() {
    window.location.href = "/learnMore";
}
backToHome.addEventListener("click", backButton);
function backButton() {
    window.location.href = "/";
}



