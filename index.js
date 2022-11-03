
/* ***** Nivell1 i 2 ***** */
//Exercici 1,  2 i 3

const loadJoke = document.getElementById('fetch-data');
const jokeContainer = document.getElementById('myJokeData');
const reportAcudits = [];
const scoreOne = document.getElementById('scoreOne');
const scoreTwo = document.getElementById('scoreTwo');
const scoreThree = document.getElementById('scoreThree');
const weatherContainer = document.getElementById('location-container');
let addedScore;
let currentJoke;
let flag = 0;
let coordinates = [];
let weather = [];
let randomAPI;

function getRandom(){
    return Math.floor(Math.random()*2);
}

loadJoke.addEventListener('click', () => 
{ 
    currentJoke = getResponse(); 
    randomAPI = getRandom();
    console.log(randomAPI);
});

async function getResponse(){
    {
        const response = await fetch(
            randomAPI == 0 ? 'https://icanhazdadjoke.com' : 'https://api.chucknorris.io/jokes/random',
                {
                    method: 'GET',
                    headers:{
                        'Accept': 'application/json'
                    }
                });

                
            if(!response.ok)
            {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            if (randomAPI == 0)
            {
                let jokeText = data.value;
                if(!jokeText)
                    jokeText = data.joke;
                jokeContainer.innerHTML = jokeText;
                flag = 0;
            return jokeText;
           } else
            {
                let jokeText = data.joke;
                if(!jokeText)
                    jokeText = data.value;
                jokeContainer.innerHTML = jokeText;
                flag = 0;
                return jokeText;
            }
    
        }
    }   

    
    scoreOne.addEventListener('click', () => 
    {addedScore = 1;
        if(flag == 0 && currentJoke)
        {
            reportAcudits.push(
                { 
                 joke: currentJoke,
                 score: addedScore,
                 date: Date()
                }
             );

        }
         flag = 1;
         console.log(reportAcudits);
    });
    scoreTwo.addEventListener('click', () => 
    {addedScore = 2;
        if(flag == 0 && currentJoke)
        {
            reportAcudits.push(
                { 
                 joke: currentJoke,
                 score: addedScore,
                 date: Date()
                }
             );

        }
         flag = 1;
         console.log(reportAcudits);
    });
    scoreThree.addEventListener('click', () => 
    {addedScore = 3;
        if(flag == 0 && currentJoke)
        {
            reportAcudits.push(
                { 
                 joke: currentJoke,
                 score: addedScore,
                 date: Date()
                }
             );

        }
         flag = 1;
         console.log(reportAcudits);
    });
    function getLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(getWeather);
        }else{
            weatherContainer.innerHTML = "No es pot montrar el temps, geolocalizació requerida";
        }
    }
    function getWeather(position) {
        coordinates.latitude = position.coords.latitude;
        coordinates.longitude = position.coords.longitude;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c59efed2c7mshe4d5010621423f5p16e215jsn841e12d4519c',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };
        fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${coordinates.latitude}6%2C%20${coordinates.longitude}`, options)
            .then(response => response.json())
            .then(response => 
                {
                    weather.temp = response.current.temp_c;
                    weather.condition = response.current.condition.text;
                    weather.icon = response.current.condition.icon;
                    weatherContainer.innerHTML = weather.condition + ' | ' + weather.temp + ' °C';
                    
                })
            .catch(err => console.error(err));
    }
  
    getLocation();

