const renderContact = document.getElementById("render-contacts")
const showFavBtn = document.getElementById("show-favorites")
const nameInput = document.getElementById("name-value")

const spanText = document.createElement("span")
spanText.textContent = "Add to favorites"

const showAll = document.createElement("button")
showAll.id = "show-all"
showAll.textContent = "Show all"

let favorites = []

if(localStorage.getItem("favorites", "")){
    favorites = JSON.parse(localStorage.getItem("favorites"))
}


//Import json data

fetch('./content.json', )
   .then(response => response.json())
   .then(data => {

    let completedHtml = ``

    // Render People

    renderAll(data)

    function renderAll(inputData){
        completedHtml = ``
        for (let i = 0; i < inputData.length; i++){
            renderSingle(inputData[i])
        }
        renderContact.innerHTML = completedHtml
    }

    // On click => likes

    renderContact.addEventListener("click", (e)=>{

        if(e.target.parentNode.parentNode.parentNode.getAttribute("data-id")){

            filledStar = "fa-solid fa-star"
            emptyStar = "fa-regular fa-star"

            if(e.target.className == emptyStar){
                e.target.className = filledStar
                favorites.push(e.target.parentNode.parentNode.parentNode.getAttribute("data-id"))
                e.target.parentNode.querySelector('span').remove()
            }

            else if (e.target.className == filledStar) {
                e.target.className = emptyStar
                favorites.splice(favorites.indexOf(e.target.parentNode.parentNode.parentNode.getAttribute("data-id")), 1)
                let newSpan = spanText.cloneNode(true)
                e.target.parentNode.appendChild(newSpan)
            }
        }

    })

    showFavBtn.addEventListener("click", () => {
        let favData = []
        for(el of favorites){
            favData.push(data.find(({id}) => id == el))
        }
        document.querySelector("form").classList.toggle("hidden")
        showFavBtn.replaceWith(showAll)
        renderAll(favData)
    })

    // Render Favorites

    showAll.addEventListener("click", function(){
        renderAll(data)
        renderContact.innerHTML = completedHtml
        showAll.replaceWith(showFavBtn)
        document.querySelector("form").classList.toggle("hidden")
    })

    // /Render People
    
    function renderSingle(inputData){
        const {id, "first_name":firstName, "last_name":lastName, email, gender, image, "ip_address":ipAddress, "phone_number":phoneNum} = inputData

        const templateHtml = `
        <li class="single" data-id="${id}">
            <div class="single-details">
                <p class="name">${firstName} ${lastName} <i class=${renderStars()}
                <p>${phoneNum}</p>
                <p>${email}</p>
                <p>${ipAddress}</p>
            </div>
            <img src="${image}" alt="" class="${renderMorF()}" loading="lazy">
        </li>`

        completedHtml += templateHtml

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
            let convertedToNum = parseInt(favorites.find(el => el == id))
            let idParsed = parseInt(id)

            if(idParsed === convertedToNum){
                return `"fa-solid fa-star"></i></p>`
            }
            else {
                return `"fa-regular fa-star"></i><span>Add to favorites</span></p>`
            }
        }
    }

    nameInput.addEventListener("keyup", (e) => {
        e.preventDefault()
        const searchedPeople = data.filter(data=>String(data.first_name + " " +data.last_name).toLowerCase().includes(nameInput.value.toLowerCase()))
        renderAll(searchedPeople)
    })
})

window.addEventListener("beforeunload", ()=> {
    localStorage.setItem("favorites", JSON.stringify(favorites))
})