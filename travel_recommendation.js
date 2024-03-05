async function displayCountries(searchTerm = "") {
  const response = await fetch("travel_recommendation_api.json");
  const data = await response.json();
  const countriesData = data.countries;
  const countriesContainer = document.getElementById("countriesContainer");

  countriesContainer.innerHTML = "";

  const countriesList = document.createElement("ul");
  countriesList.classList.add("countries-list");

  countriesData.forEach((country) => {
    if (country.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      const countryItem = document.createElement("li");
      countryItem.classList.add("country-item");
      countryItem.innerHTML = `<strong>${country.name}</strong>`;

      const citiesList = document.createElement("ul");
      citiesList.classList.add("cities-list");

      country.cities.forEach((city) => {
        const cityItem = document.createElement("li");
        cityItem.classList.add("city-item");
        cityItem.innerHTML = `
                <img src="${city.imageUrl}" alt="${city.name}" style="max-width: 700px;"><br>
                <strong>${city.name}</strong><br>
                ${city.description}
            `;
        citiesList.appendChild(cityItem);
      });

      countryItem.appendChild(citiesList);

      countriesList.appendChild(countryItem);
    }
  });

  countriesContainer.appendChild(countriesList);
}

document.querySelector(".input").addEventListener("input", function () {
  const searchTerm = this.value;
  displayCountries(searchTerm);
});

document
  .querySelector('.search-bar button[type="submit"]')
  .addEventListener("click", function () {
    const searchTerm = document.querySelector(".input").value;
    displayCountries(searchTerm);
  });

document.querySelector(".input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const searchTerm = document.querySelector(".input").value;
    displayCountries(searchTerm);
  }
});

function clearSearch() {
  document.querySelector(".input").value = " ";
  displayCountries();
}

document
  .querySelector('.search-bar button[type="reset"]')
  .addEventListener("click", clearSearch);
