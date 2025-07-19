async function getWeather() {
    let cityname = document.getElementById("city").value;

    let APIkey = "4152469ac5f8acbb588855bb054c3542"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}`
    document.getElementById("error").innerText = ""

    let APIkey2="152a7cdd7ba64183be9155657251807"
    let url3=`https://api.weatherapi.com/v1/forecast.json?key=${APIkey2}&q=${cityname}&days=1`
    try {
        let response = await fetch(url);
        if (!response.ok) {
            document.getElementById("error").innerText = "City not Found!";

        }
        let data = await response.json();

        let lat = `${data.coord.lat}`
        let lon = `${data.coord.lon}`

        let url1 = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${APIkey}`
        let url2 = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
        let response1 = await fetch(url1)
        let data1 = await response1.json()

        

        //show ke liye
        let temp = document.getElementsByClassName("temp")
        let ctyCntry = document.getElementsByClassName("ctyCntry")
        let condition = document.getElementsByClassName("condition")
        let humid = document.getElementsByClassName("humid")
        let wind = document.getElementsByClassName("wind")
        let pressure = document.getElementsByClassName("pressure")
        lat = document.getElementsByClassName("lat")
        lon = document.getElementsByClassName("lon")
        let aqi2 = document.getElementsByClassName("aqi")

        temp[0].innerHTML = ` ${(data.main.temp - 273.15).toFixed(2)}°C`
        ctyCntry[0].innerHTML = `${data.name},${data.sys.country}`
        condition[0].innerHTML = `${data.weather[0].main}`
        humid[0].innerHTML = `Humidity: ${data.main.humidity}%`
        wind[0].innerHTML = `Wind: ${data.wind.speed}m/s`
        pressure[0].innerHTML = `Pressure: ${data.main.pressure}mbar`;
        lat[0].innerHTML = `Latitude:${data.coord.lat} `
        lon[0].innerHTML = `longitude:${data.coord.lon} `
        aqi2[0].innerHTML = `Air Quality Index:${data1.list[0].main.aqi}`
        
        document.getElementsByTagName("h1")[0].innerText="Weather"
        document.getElementsByClassName("time")[0].innerText="Now"

        let forecast=document.getElementsByClassName("forecast");
        forecast[0].classList.remove("hidden");
        let weatherCondition=data.weather[0].main
        switch(weatherCondition){
            case "Clear" :
                document.getElementsByClassName("show")[0].style.backgroundImage=`url("https://cdn.pixabay.com/photo/2024/12/28/03/39/field-9295186_1280.jpg")`
                document.getElementsByClassName("show1")[0].style.backgroundImage=`url("//cdn.weatherapi.com/weather/64x64/day/113.png")`
                
                break;
            case "Clouds" :
                document.getElementsByClassName("show")[0].style.backgroundImage=`url("https://images.pexels.com/photos/13258046/pexels-photo-13258046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`
                document.getElementsByClassName("show1")[0].style.backgroundImage=`url("//cdn.weatherapi.com/weather/64x64/day/116.png")`
                
                break;
            case "Rain" :
                document.getElementsByClassName("show")[0].style.backgroundImage=`url("https://t3.ftcdn.net/jpg/07/72/70/48/360_F_772704829_X3GrbHFQvzzZ1sGu6iD76hCWyz2SRKeh.jpg")`
                document.getElementsByClassName("show1")[0].style.backgroundImage=`url("//cdn.weatherapi.com/weather/64x64/day/176.png")`
                
                break;
            case "Snow" :
                document.getElementsByClassName("show")[0].style.backgroundImage=`url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmz2uUmiGqf0RErQulYwc5RUzwe8eHoZyPkQ&s")`
                // document.getElementsByClassName("show1")[0].style.backgroundImage=`url("")`
                
                break;
            case "Thunderstorm" :
                document.getElementsByClassName("show")[0].style.backgroundImage=`url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBP7uYeJSnVvK1uEUNupj2X5aDfBruE50d6g&s")`
                // document.getElementsByClassName("show1")[0].style.backgroundImage=`url("")`
                
                break;
            default:
                document.getElementsByClassName("show")[0].style.backgroundImage="none";    
                document.getElementsByClassName("show1")[0].style.backgroundImage="none";    
                
        }

        
        let response2 = await fetch(url2)
        let data2 = await response2.json()
        // forecast k liye
        let nav =document.getElementsByClassName("nav1")
        nav[0].innerHTML="5 Days Forecast"

        function getWeekday(dateString){
            let date=new Date(dateString);
            return date.toLocaleDateString('en-US',{weekday:'long'})
        }
        
       
        // th
        document.getElementById("1").innerHTML="Today"
        document.getElementById("2").innerHTML="Tomorrow"
        document.getElementById("3").innerHTML=getWeekday(data2.daily.time[2])
        document.getElementById("4").innerHTML=getWeekday(data2.daily.time[3])
        document.getElementById("5").innerHTML=getWeekday(data2.daily.time[4])

        // td
        document.getElementById("a").innerHTML=`${data2.daily.temperature_2m_max[0]}°C/${data2.daily.temperature_2m_min[0]}°C`
        document.getElementById("b").innerHTML=`${data2.daily.temperature_2m_max[1]}°C/${data2.daily.temperature_2m_min[1]}°C`
        document.getElementById("c").innerHTML=`${data2.daily.temperature_2m_max[2]}°C/${data2.daily.temperature_2m_min[2]}°C`
        document.getElementById("d").innerHTML=`${data2.daily.temperature_2m_max[3]}°C/${data2.daily.temperature_2m_min[3]}°C`
        document.getElementById("e").innerHTML=`${data2.daily.temperature_2m_max[4]}°C/${data2.daily.temperature_2m_min[4]}°C`
        
        document.getElementsByClassName("hourly")[0].classList.remove("hidden");

        let h3=document.getElementsByTagName("h3")[0]
        h3.innerHTML="Today's Hourly Weather Data";

        let hourly=document.getElementsByClassName("hourly")[0]
        

        let response3= await fetch(url3);
        let data3= await response3.json();

        data3.forecast.forecastday[0].hour.forEach(hour => {
            hourly.innerHTML+=`<p><strong>${hour.time}:-</strong>    ${hour.temp_c}°C - ${hour.condition.text} 
            <img src="${hour.condition.icon}" alt="${hour.condition.text}" > </p>`
            
        });



    }

    catch (error) {
        console.log(error);

    }

}
