let searchbutn = document.querySelector(".searchbtn");
let whether_info = document.querySelector(".whether-info");
let search_form = document.querySelector(".search_form");
let your_whether = document.querySelector(".your-whether");
let formbtn = document.querySelector(".form_btn");
let grantlocation=document.querySelector(".grant_location")
let loading=document.querySelector(".loading");
const API_KEY = "a262a35392f4aa90825ad45fb565aff5"

let latitude;
let longitude;

let currenttab = "yourwhether";
function switchtab(usertab) {
  if (usertab == currenttab) {
    currentweatherinfo();
      whether_info.setAttribute("style", "display:flex");
      search_form.setAttribute("style", "display:hidden");
      your_whether.classList.add("bg-white");
      your_whether.classList.add("bg-opacity-25");
      searchbutn.classList.remove("bg-white"); 
  }
  else {
    grantlocation.setAttribute("style","display:none")
    whether_info.setAttribute("style", "display:none");
    search_form.setAttribute("style", "display:flex");
    searchbutn.classList.add("bg-white");
    searchbutn.classList.add("bg-opacity-25");
    your_whether.classList.remove("bg-white");
  }
}

your_whether.addEventListener("click", () => {
  switchtab("yourwhether");
})

searchbutn.addEventListener("click", () => {
  switchtab("searchbtn");
})

async function latilongi(city)
{
  var lati;
  var longi;
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=a262a35392f4aa90825ad45fb565aff5`;

  let val1=await fetch(url);
  let val2=await val1.json();
  console.log(val2);
  lati=val2[0].lat;
  longi=val2[0].lon;
  weatherinfo(lati,longi);
  
  
}
// latilongi("pimpri-chinchwad");
async function weatherinfo(lati,longi)
{
  console.log(lati);
  console.log(longi);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${API_KEY}`;
  let val1=await fetch(url);
  let val2=await val1.json();
  console.log(val2);
  countryCode=val2.sys.country;

  const flagURL = (`https://www.countryflags.io/${countryCode}/shiny/64.png`);
  // console.log(flagURL);

  let iconCode=val2.weather[0].icon;
  const iconURL =(`https://openweathermap.org/img/w/${iconCode}.png`);
  
  setvalues([val2.name,val2.wind.speed,val2.clouds.all,val2.weather[0].description,val2.main.temp-272.15,iconURL,val2.main.humidity,flagURL]);

}

function setvalues(p)
{
  loading.style.display="none";
  whether_info.style.display="flex";
  let cityname=document.querySelector(".cityname");
  let windspeed = document.querySelector(".windspeed")
  let cloud = document.querySelector(".cloud")
  let desc=document.querySelector(".desc");
  let temp=document.querySelector(".temp");
  let descicon=document.querySelector(".descicon");
  let humidity = document.querySelector(".humidity");
  let flagimg=document.querySelector(".flagimg");
  cityname.innerText=p[0].toUpperCase();
  windspeed.innerText=p[1]+"m/s";
  cloud.innerText=p[2]+"%";
  desc.innerText=p[3];
  var number = p[4];
  var roundedNumber = number.toFixed(2);
  temp.innerText=roundedNumber+" \u00B0C";
  descicon.src=p[5];
  humidity.innerText=p[6]+"%";
  // flagimg.src=p[7];
 
}

formbtn.addEventListener("click",()=>{
  search_form.style.display="none";
  loadingsymbol();
  cityweather();
});
function cityweather()
{
    event.preventDefault();
  let input_text = document.getElementById("textinput").value;
  latilongi(input_text);
  
}

function loadingsymbol()
{
  loading.style.display="flex";
  whether_info.style.display="none";
}




function currentweatherinfo()
{
  if(navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }
  else{
    console.log('Geolocation is not supported by this browser.');
  }
}
currentweatherinfo();

function successCallback(position) {
  let lati=position.coords.latitude;
  let longi=position.coords.longitude; 
  loading.style.display="flex";
  whether_info.style.display="none"; 
  weatherinfo(lati,longi);
  
}

function errorCallback(error) {
  if (error.code === error.PERMISSION_DENIED) {
    whether_info.setAttribute("style","display:none")
    grantlocation.setAttribute("style","display:flex")
  } else {
    console.log("error while fetching data");
  }
}









