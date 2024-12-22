const express=require("express");
const axios=require("axios");
const cheerio=require("cheerio");
require('dotenv').config();
const app=express();

app.get('/:city',async (req,res)=> {
     const page= await axios.get(process.env.SCRAPE_API_FIRST+req.params.city+process.env.SCRAPE_API_LAST);
     const $=cheerio.load(page.data);
     const date=$(process.env.DATE_CLASS).text();
     const temparature=$(process.env.TEMPARATURE_CLASS).text();
     const minMaxtemparature=$(process.env.MIN_MAX_TEMPARATURE).text();
     const humidityPressure=$(process.env.HUMIDITY_PRESSURE).text();
     
     
     let minTemparature="";
     let maxTemparature="";
     let humidity="";
     let pressure="";
     
     for(let i=0;i<6;i++)
     {
        if(i<3){
             minTemparature = minTemparature + minMaxtemparature[i]
        }
        else {
            maxTemparature=maxTemparature+minMaxtemparature[i];
        }
     }
     for(let i=0;i<6;i++)
     {
        if(i<2)
        {
             humidity=humidity+humidityPressure[i]
        }
        else
        {
            pressure=pressure+humidityPressure[i]
        }
     }
     const weatherData={
        date,
        temparature,
        minTemparature,
        maxTemparature,
        humidity,
        pressure
     }
     res.send(weatherData);
    
    //  console.log(req.params)
});
app.listen(process.env.PORT,()=> {
    console.log("Server started ");
});