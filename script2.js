//*ENDPOINT
const endpoint = "https://striveschool-api.herokuapp.com/books";


//*chiamata api
fetch(endpoint, { headers: {} }) //promise
    .then((response) => response.json()) // response in json // promise
    .then((jsonData) => start(jsonData)) // chiama creaCard con jsonData come argomento
    .catch((err) => console.log("Error detected: ", err)); //catch error

let searchBar = document.getElementById("searchBar");
let searchButton = document.getElementById("searchButton");
let searchResult = [];

//! FUNZIONE PRINCIPALE
// books array di 50 oggetti //jasonData
function start(books) {
    console.log(books);    
    CreaCards(books); // crea una card per ogni oggetto nell'array

    searchButton.addEventListener("click", () => {
        cerca(books); //ricerca in book.title
    })
    searchBar.addEventListener("input", () => {
        cerca(books); //ricerca in book.title
    })
}


//!FUNZIONE CreaCards 
function CreaCards(books) {
    for (const book of books) {
        //elementi del dom
        let card = document.createElement("div");
        let cover = document.createElement("img");
        let cardBody = document.createElement("div");
        let cardTitle = document.createElement("p");
        let cardText = document.createElement("p");
        let buttonCart = document.createElement("a");
        let cartIcon = document.createElement("span");
        //classi, id
        cover.classList.add("cover", "img-fluid");
        card.classList.add("card", "card_dimension", "p-1");
        cardBody.classList.add("card-body");
        cardTitle.classList.add("card-title", "ellipsis");
        cardText.classList.add("card-text");
        buttonCart.classList.add("btn", "btn-primary", "buttonCart");
        cartIcon.classList.add("material-symbols-outlined");
        //.innerHtml
        cover.src = book.img;
        cardTitle.innerText = book.title;
        cardText.innerText = parseFloat(book.price) + "€";
        buttonCart.innerText = "Add to Cart";
        //APPENDCHILD
        card.append(cover);
        card.append(cardBody);
        cardBody.append(cardTitle);
        cardBody.append(cardText);
        /* buttonCart.append(cartIcon); */
        cardBody.append(buttonCart);
        section.append(card)
        //Aggiunge un listener al tasto aggiungi al carrello
        buttonCart.addEventListener("click", () => {
            addToCart(book);
            buttonCart.innerText = "Added to cart"
        });
    }
}

//! FUNZIONE CERCA
function cerca(books) {
    const section = document.getElementById("section");
    searchResult = [];
    let keyword = searchBar.value;
    if (keyword.split("").length < 3) {
        section.innerHTML = "";
        CreaCards(books);
        return
    }
    section.innerHTML = "";
    for (const book of books) {
        if (book.title.toLowerCase().includes(keyword.toLowerCase())) {
            searchResult.push(book);
        }
    }
    CreaCards(searchResult);
}


//!FUNZIONE addToCart e remove from cart
let total = 0;
let counter = 0;
function addToCart(book) {

    console.log(book.price)
    total += parseFloat(book.price);
    console.log(total);
    counter ++;
    
    //elementi del dom
        const cart = document.getElementById("cart");
        let newLi = document.createElement("div");
        let newLiTitle = document.createElement("div");
        let newLiPrice = document.createElement("div");
        let newLiRemove = document.createElement("button");
        let totalPrice = document.getElementById("totalPrice");
        let svuotaCart = document.getElementById("svuotaCart");
        let totalCounter = document.getElementById("totalCounter");
        let badge = document.getElementById("badge");
        let divider = document.createElement("hr");
        
    //class e id
        newLiRemove.classList.add("newLiRemove");
        newLi.classList.add("d-flex", "justify-content-between");
        newLiPrice.classList.add("d-flex", "align-items-center", "ms-2");
        divider.classList.add("hr","hr-blurry");
        newLiTitle.classList.add("card-title", "pe-2")
    //innerHtml
        newLiTitle.innerText = book.title;
        newLiPrice.innerText = book.price.toFixed(2) + "€";
        totalCounter.innerText = counter  + " book/s in your cart";;
        totalPrice.innerText = "Cart Total: " + total + "€";
        badge.innerText = counter;
        newLiRemove.innerText = "x";
    //APPENDCHILD
        newLi.append(newLiTitle);
        newLi.append(newLiPrice);
        newLiPrice.append(newLiRemove);
        cart.append(newLi);
        cart.append(divider);
    
    if (counter >0) {   //* visibilità del badge del carrello
        badge.classList.remove("d-none");
    }
    
    //EVENT LISTENER
    //?svuota il carrello e azzera il contatore total e badge
    svuotaCart.addEventListener("click", () => {
        totalCounter.innerText = " ";
        cart.innerHTML = "";
        totalPrice.innerText = "";
        total = 0;
        counter = 0;
        badge.innerText = 0;
    })

    //?rimuove elemento selezionato
       newLiRemove.addEventListener("click", () => {
        cart.removeChild(newLi);
        cart.removeChild(divider);
        counter--;
          //* visibilità del badge del carrello
        if (counter === 0)  badge.classList.add("d-none");

        total -= book.price;
        totalCounter.innerText = counter  + " book/s in your cart";
        totalPrice.innerText = "Cart Total: " + total + "€";
        badge.innerText = counter;
       })
}



