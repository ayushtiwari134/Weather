import React, { useState } from 'react'


const Weather = () => {

    const [data, setData] = useState({})
    const [cityName, setCityName] = useState("")
    const [city, setCity] = useState("")
    const [view, setView] = useState(false)




    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e8e1b2d9e58d927ea7572ed5602401fd`

    const handleChange = (event) => {
        setCity(event.target.value)
    }



    const handleClick = async () => {
        await fetch(apiUrl).then(res => res.json()).then((result) => { setData(result); console.log(result.main.temp - 273) })
        setCityName(city)
        setCity("")
        setView(true)
    }


    return (
        <div className=" h-screen w-full flex flex-col justify-around items-center">
            <div className="search-bar md:w-[50%] w-[100%] flex justify-center">
                <input type='text' value={city} placeholder='Enter city' onChange={handleChange} className='p-2 border-black border mr-1' />
                <button onClick={handleClick} className="border-2 ml-1 border-red-700 px-4 hover:bg-red-500 hover:text-white">Search</button>
            </div>
            {view && <div className="upper-part">

                <div className="name m-4 text-center">
                    {data.main !== undefined ? <h1 className='font-bold md:text-4xl text-3xl'>{cityName}</h1> : <p></p>}

                </div>
                <div className="temperature text-center m-4">
                    {data.main !== undefined ? <h1 className="md:text-8xl text-6xl">{(data.main.temp - 273).toFixed(2)}&#8451;</h1> : <p></p>}

                </div>
            </div>}
            {view && <div className="lower-part flex md:mb-0 mb-[23%] md:w-[70%] w-[100%] justify-center items-center">
                <div className="div border-r-2 border-black px-5 text-center">
                    {data.wind !== undefined ? <h1 className="md:text-3xl text-xl font-bold">{data.wind.speed} kph</h1> : <p></p>}

                    <p className="md:text-xl">Wind speed</p>
                </div>
                <div className="div border-r-2 border-black px-4 text-center">
                    {data.main !== undefined ? <h1 className="md:text-3xl text-xl font-bold">{(data.main.feels_like - 273).toFixed(2)}&#8451;</h1> : <p></p>}
                    <p className='md:text-xl'>Feels like</p>
                </div>
                <div className="div text-center px-5">
                    {data.main !== undefined ? <h1 className="md:text-3xl text-xl font-bold">{data.weather[0].main}</h1> : <p></p>}
                    <p>Type Of Day</p>
                </div>
            </div>}
        </div>
    )
}

export default Weather
