const container = document.querySelector(".container");
const search=document.getElementById("searchbox");
const trigger=document.getElementById("search");
const emoji=document.querySelector(".emoji");
const apikey=`c53613f7dde1fd4fa895a05a3eb18e67`;
const city=document.getElementById("city");
const temp=document.getElementById("temp");
const hmdt=document.getElementById("hmdt");
const wind=document.getElementById("wind");
const Status=document.getElementById("status");

console.log(city);
console.log(temp.textContent);
let data; let url; let cityname;
async function collectData(callback) {
    try {
        const raw = await fetch(url);
        if (!raw.ok) {
            throw new Error(`HTTP error! status: ${raw.status}`);
        }
        const data = await raw.json();
        console.log(data);
        callback(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        window.alert(`Please enter a valid city name`);
    }
}
function assign(data){
    city.innerHTML=cityname;
    wind.innerHTML=data.wind.speed +" mps";
    hmdt.innerHTML=data.main.humidity + " %";
    temp.innerHTML=Math.round(data.main.temp) + "°C";
    let weather=data.weather[0].main;
    Status.innerHTML=weather;
    console.log(weather);
    if(weather=="Clouds"){
        emoji.textContent="⛅";
        container.style.backgroundImage="linear-gradient(135deg,skyblue,lightgrey)";
    }
    else if(weather=="Clear"){
        emoji.textContent="☀️";
        container.style.backgroundImage="linear-gradient(135deg, aqua,rgb(31, 167, 220))";
    }
    else if(weather=="Rain"){
        emoji.textContent="🌧️";
        container.style.backgroundImage="linear-gradient(135deg,grey,black)";
    }
    else if(weather=="Drizzle"){
        emoji.textContent="🌦️";
    }
    else{
        emoji.textContent="☁️";
        container.style.backgroundImage="linear-gradient(135deg,darkgrey,grey)";
    }
}

trigger.addEventListener("click",()=>{
    cityname=search.value;
    url=`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}&units=metric`;
    console.log(cityname);
    collectData(assign);
});