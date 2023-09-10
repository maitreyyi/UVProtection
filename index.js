import bodyParser from "body-parser";
import express from "express";
import axios from "axios";

const app = express();
const port = 3001;
//const uvapiKey = "openuv-ciq4zrllx5r7af-io";
let lat = 0;
let lon = 0;

//axios.defaults.headers.common["x-access-token"] = apiKey;
//axios.defaults.headers.post['Content-Type'] = 'application/json';

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req,res)=> {
    /*
    try {
        const result = await axios.get("https://api.openuv.io/api/v1/uv", {
            params: {
                lat : lat,
                lng : lon,
            }
        });
        const data = result.data.result;

        res.render("index.ejs", {
            lat: lat,
            lon: lon,
            uv: JSON.stringify(data.uv),
            uv_max: JSON.stringify(data.uv_max),
            ozone: JSON.stringify(data.ozone),
            sunrise: JSON.stringify(data.sunrise),
            sunset: JSON.stringify(data.sunset),
        });
        

    } catch(error) {
        res.status(404).send("Error: " + error.message);
        console.log(error)
    }
    */

});

app.get("/about", (req,res) => {
    res.render("about.ejs");
});

app.post("/submit", async (req,res) => {
    try{
        const result = await axios.get("https://nominatim.openstreetmap.org/search?q=" + address + "&format=json");
        lat = result.data[0].lat; 
        lon = result.data[0].lon;
        res.render("index.ejs", {
            lat: lat,
            lon: lon,
        });
    } catch(error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log("Server listening on port: " + port);
});