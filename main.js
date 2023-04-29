const renderContact = document.getElementById("render-contacts")
const showFavBtn = document.getElementById("show-favorites")
const showAll = document.createElement("button")
showAll.id = "show-all"
showAll.textContent = "Show all"
let singles = ""
let favorites = []



//Import json data

fetch('./content.json', )
   .then(response => response.json())
   .then(data => {

    let templateHtml = ``

// Render People

renderAll()

function renderAll(){
    for (let i = 0; i < 25; i++){
        renderSingle(data[i])
      }}


// On click => likes


renderContact.addEventListener("click", (e)=>{

    if(e.target.parentNode.parentNode.parentNode.getAttribute("data-id")){

        filledStar = "fa-solid fa-star"
        emptyStar = "fa-regular fa-star"

        if(e.target.className == emptyStar){
            e.target.className = filledStar
            favorites.push(e.target.parentNode.parentNode.parentNode.getAttribute("data-id"))
            console.log(favorites)
        }

        else if (e.target.className == filledStar) {
            e.target.className = emptyStar
            favorites.splice(favorites.indexOf(e.target.parentNode.parentNode.parentNode.getAttribute("data-id")), 1)
            console.log(favorites)
        }
    }

})

showFavBtn.addEventListener("click", () => {
    renderFavorites()
})


// Render Favorites


function renderFavorites(){

    let html = ""

    for(el of favorites){
        
    function renderMorF(){
        if(gender === "Male"){
            return "male"
        }
        else if(gender === "Female"){
            return "female"
        }
        else {
            return "rainbow"
        }}

        const {id, "first_name":firstName, "last_name":lastName, email, gender, image, "ip_address":ipAddress, "phone_number":phoneNum} = data.find(({id}) => id == el)

        html += `
        <li class="single" data-id="${id}">
            <div class="single-details">
                <p class="name">${firstName} ${lastName} <i class="fa-solid fa-star"></i></p>
                <p>${phoneNum}</p>
                <p>${email}</p>
                <p>${ipAddress}</p>
            </div>
            <img src="${image}" alt="" class="${renderMorF(gender)}" loading="lazy">
        </li>`
    }
    
    renderContact.innerHTML = html
    showFavBtn.replaceWith(showAll)
}

showAll.addEventListener("click", function(){
    renderAll()
    showAll.replaceWith(showFavBtn)
})




// /Render People
    
    function renderSingle(data){
        const {id, "first_name":firstName, "last_name":lastName, email, gender, image, "ip_address":ipAddress, "phone_number":phoneNum} = data

        templateHtml += `
        <li class="single" data-id="${id}">
            <div class="single-details">
                <p class="name">${firstName} ${lastName} <i class="${renderStars()}"></i></p>
                <p>${phoneNum}</p>
                <p>${email}</p>
                <p>${ipAddress}</p>
            </div>
            <img src="${image}" alt="" class="${renderMorF()}" loading="lazy">
        </li>`

        renderContact.innerHTML = templateHtml

        function renderMorF(){
            if(gender === "Male"){
                return "male"
            }
            else if(gender === "Female"){
                return "female"
            }
            else {
                return "rainbow"
            }
        }
    
        function renderStars(){
            let convertedToNum = parseFloat(favorites.find(el => el == id))
            let idParsed = parseFloat(id)

            if(idParsed === convertedToNum){
                return "fa-solid fa-star"
            }
            else {
                return "fa-regular fa-star"
            }
        }
    
    }
   })

   .then(() => {

    //Pagination
    
    const paginationNumbers = document.getElementById("pagination-numbers");
    const paginatedList = document.getElementById("render-contacts");
    const listItems = paginatedList.querySelectorAll("li");
    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");

    const paginationLimit = 20;
    const pageCount = Math.ceil(listItems.length / paginationLimit);
    let currentPage = 1;

    const disableButton = (button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
    };

    const enableButton = (button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
    };

    const handlePageButtonsStatus = () => {
    if (currentPage === 1) {
        disableButton(prevButton);
    } else {
        enableButton(prevButton);
    }

    if (pageCount === currentPage) {
        disableButton(nextButton);
    } else {
        enableButton(nextButton);
    }
    };

    const handleActivePageNumber = () => {
    document.querySelectorAll(".pagination-number").forEach((button) => {
        button.classList.remove("active");
        const pageIndex = Number(button.getAttribute("page-index"));
        if (pageIndex == currentPage) {
        button.classList.add("active");
        }
    });
    };

    const appendPageNumber = (index) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);

    paginationNumbers.appendChild(pageNumber);
    };

    const getPaginationNumbers = () => {
    for (let i = 1; i <= pageCount; i++) {
        appendPageNumber(i);
    }
    };

    const setCurrentPage = (pageNum) => {
    currentPage = pageNum;

    handleActivePageNumber();
    handlePageButtonsStatus();
    
    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    listItems.forEach((item, index) => {
        item.classList.add("hidden");
        if (index >= prevRange && index < currRange) {
        item.classList.remove("hidden");
        }
    });
    };

    getPaginationNumbers();
    setCurrentPage(1);

    prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
    });

    nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
    });

    document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
        button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
        });
    }

    });
})
