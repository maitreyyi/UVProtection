import bodyParser from "body-parser";
import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const apiKey = "openuv-ciq4zrllx5r7af-io";

axios.defaults.headers.common["x-access-token"] = apiKey;
axios.defaults.headers.post['Content-Type'] = 'application/json';

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req,res)=> {   
   res.render("index.ejs");

});

app.get("/about", (req,res) => {
    res.render("about.ejs");
});

app.post("/submit", async (req,res) => {
    const address = req.body["location"];
    try{
        const result = await axios.get("https://nominatim.openstreetmap.org/search?q=" + address + "&format=json");
        //console.log(lat, lon);
        const info = await axios.get("https://api.openuv.io/api/v1/uv", {
            params: {
                lat : result.data[0].lat,
                lng : result.data[0].lon,
            }
        });
        const data = info.data.result;

        res.render("index.ejs", {
            address: address,
            uv: JSON.stringify(data.uv),
            uv_max: JSON.stringify(data.uv_max),
            ozone: JSON.stringify(data.ozone),
            sunrise: JSON.stringify(data.sunrise),
            sunset: JSON.stringify(data.sunset),
        });
    } catch(error) {
        res.status(404).send("Invalid Address, try again!");
        console.log(error);
    }
});

app.listen(port, () => {
    console.log("Server listening on port: " + port);
});