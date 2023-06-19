//! choosing html tags
const searchBar = document.querySelector("#searchBar");
const buttonClick = document.querySelector("#btnClick");
const app = document.querySelector(".app");
const contentFlex = document.querySelector(".contentFlex");
const removeBtn = document.querySelector(".fa-xmark");
const alert = document.querySelector(".alert");

const apiKey = "59e9cb7da1831410f3fd0f07582e3b03";

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
