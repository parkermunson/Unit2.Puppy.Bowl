const allPuppies = document.querySelector(".allPuppies")
const onePuppy = document.querySelector(".onePuppy")
const container = document.querySelector(".container")
let puppies = []

window.addEventListener("hashchange", () => {
    render()
})


async function getAllPuppies() {
    const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2310/players")
    const result = await response.json()
    puppies = result.data.players
    console.log(puppies)
    render()
}

async function render() {
    const puppyList = puppies.map((pup) => {
        return `
        <div>
        <a href=#${pup.name} id='puppyDog'> ${pup.name} </a>
        </div>
        `
    })

    const name = window.location.hash.slice(1)
    const selectedPuppy = puppies.find((pup) => {
        return pup.name === name
    })
    

    if (selectedPuppy) {
        
        allPuppies.innerHTML = ""

        onePuppy.innerHTML = `
            <h2 id='puppyTitle'>${selectedPuppy.name}</h2>
            <p id='puppyDetails'>Breed: ${selectedPuppy.breed}</p>
            <img src="${selectedPuppy.imageUrl}" id="puppyImg">
            <a id='puppyDog' class='allPuppies' href=#> Back to All Puppies </a> 
            `
    } else {
        onePuppy.innerHTML = ""
        allPuppies.innerHTML += "<h1 id='meetPack'> Meet the Pack </h1>" + puppyList.join("")
    }
}


getAllPuppies()