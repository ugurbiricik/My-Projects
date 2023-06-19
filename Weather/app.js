//! choosing html tags
const searchBar = document.querySelector("#searchBar");
const buttonClick = document.querySelector("#btnClick");
const app = document.querySelector(".app");
const contentFlex = document.querySelector(".contentFlex");
const removeBtn = document.querySelector(".fa-xmark");
const alert = document.querySelector(".alert");

/*
this project will not work without api key. You can get your own API KEY from https://home.openweathermap.org/.
You can run the application by assigning it to a variable named apiKey you received.

Example: let apiKey = "1231j45345j34j45j56756j67j698978"
*/


//! access to data
const getData = (datas) => {
  const {
    name,
    sys: { country },
    main: { temp_min: minGrad, temp_max: maxGrad, temp },
    weather: [{ description, icon }],
  } = datas;

  let iconWeather = `https://openweathermap.org/img/wn/${icon}.png`;
  let minimumGrad = Math.round(minGrad);
  let maximumGrad = Math.round(maxGrad);
  let tempRound = Math.round(temp);

  const newDiv = document.createElement("div");
  newDiv.classList.add("content");
  contentFlex.appendChild(newDiv);

  newDiv.innerHTML = ` <div class="city">${name}, ${country}</div> <div class="iconDiv"><i class="fa-solid fa-xmark"></i></div><div>
        <img class="icon" src="${iconWeather}"/></div>
        <div class="temp">${tempRound}°C</div>
        <div class="desc">${description}</div>
        <div class="minmax">${minimumGrad}°C / ${maximumGrad}°C</div>
    `;
};

//! when the search button is clicked
buttonClick.addEventListener("click", async () => {
  let cityName = searchBar.value.trim();
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=en`;

  try {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error("Bu iste bir is var");
    }
    let data = await res.json();
    getData(data);
  } catch (error) {
    alert(error);
  }
});

//! when enter is pressed
searchBar.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    buttonClick.click();
  }
});

//! when the remove button is clicked

document.addEventListener("click", (e) => {
  if (e.target.className === "fa-solid fa-xmark") {
    e.target.parentElement.parentElement.remove();
    alert.innerHTML = `Thank you for choosing us😊`;
  }

  setTimeout(() => {
    alert.innerHTML = ``;
  }, 3000);
});

window.addEventListener("load", displaySavedCountries);
