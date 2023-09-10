import bodyParser from "body-parser";
import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const apiKey = "openuv-ciq4zrllx5r7af-io";
let lat, lon = 0;

axios.defaults.headers.common["x-access-token"] = yourAPIKey;
axios.defaults.headers.post['Content-Type'] = 'application/json';

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req,res)=> {
    try {
        const result = await axios.get("https://api.openuv.io/api/v1/uv", {
            params: {
                lat : lat,
                lng : lon,
            }
        });
        const data = result.data.result;

        res.render("index.ejs", {
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
});

app.get("/about", (req,res) => {
    res.render("about.ejs");
});
app.listen(port, (req,res) => {
    console.log("Server listening on port: " + port);
});