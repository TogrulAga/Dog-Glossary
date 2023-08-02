let buttonRandom = document.getElementById("button-random-dog");
let buttonShowBreed = document.getElementById("button-show-breed");
let buttonShowSubBreed = document.getElementById("button-show-sub-breed");
let buttonShowAll = document.getElementById("button-show-all");
let inputBreed = document.getElementById("input-breed");
let content = document.getElementById("content");

buttonRandom.addEventListener("click", function() {
    fetch("https://dog.ceo/api/breeds/image/random")
        .then((response) => response.json())
        .then(function (json) {
            if (json["status"] !== "success") {
                throw new Error("Failed to fetch image");
            }

            content.innerText = null;
            const image = document.createElement('img');
            image.src = json["message"];

            content.appendChild(image);
        })
        .catch((error) => console.log(error));
})

buttonShowBreed.addEventListener("click", function() {
    const breed = inputBreed.value.toLowerCase();

    if (breed === "") {
        return;
    }

    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then((response) => response.json())
        .then(function (json) {
            if (json["status"] !== "success") {
                throw new Error("Failed to fetch image");
            }

            content.innerText = null;

            const image = document.createElement('img');
            image.src = json["message"];

            content.appendChild(image);
        })
        .catch(function(error) {
            console.log(error);

            content.innerText = null;

            const paragraph = document.createElement('p');
            paragraph.innerText = "Breed not found!";

            content.appendChild(paragraph);
        });
})

buttonShowSubBreed.addEventListener("click", function() {
    const breed = inputBreed.value.toLowerCase();

    if (breed === "") {
        return;
    }

    fetch(`https://dog.ceo/api/breed/${breed}/list`)
        .then((response) => response.json())
        .then(function (json) {
            if (json["status"] !== "success") {
                throw new TypeError("Failed to fetch breed");
            }

            content.innerText = null;

            if (json["message"].length === 0) {
                throw new RangeError("Failed to fetch sub-breeds")
            }
            const breedList = document.createElement('ol');

            for (const breedName of json["message"]) {
                const breedItem = document.createElement("li");
                breedItem.innerText = breedName;

                breedList.appendChild(breedItem);
            }

            content.appendChild(breedList);
        })
        .catch(function(error) {
            console.log(error);
            content.innerText = null;
            const paragraph = document.createElement('p');
            if (error instanceof TypeError) {
                paragraph.innerText = "Breed not found!";
            } else if (error instanceof RangeError) {
                paragraph.innerText = "No sub-breeds found!";
            }

            content.appendChild(paragraph);
        });
})

buttonShowAll.addEventListener("click", function () {
    fetch(`https://dog.ceo/api/breeds/list/all`)
        .then((response) => response.json())
        .then(function (json) {
            if (json["status"] !== "success" || json["message"].length === 0) {
                throw new Error("Failed to fetch all breeds");
            }

            content.innerText = null;

            const breedList = document.createElement('ol');

            for (const breedName in json["message"]) {
                const breedItem = document.createElement("li");
                breedItem.innerText = breedName;

                if (json["message"][breedName].length !== 0) {
                    const subBreedList = document.createElement("ul");

                    for (let subBreedItem of json["message"][breedName]) {
                        const subBreed = document.createElement("li");
                        subBreed.innerText = subBreedItem;

                        subBreedList.appendChild(subBreed);
                    }

                    breedItem.appendChild(subBreedList);
                }

                breedList.appendChild(breedItem);
            }

            content.appendChild(breedList);
        })
        .catch(function(error) {
            console.log(error);
            content.innerText = null;

            const paragraph = document.createElement('p');

            paragraph.innerText = "Failed to fetch all breeds";

            content.appendChild(paragraph);
        });
})