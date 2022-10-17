import express from 'express';
import axios from 'axios'
const app = express();

app.get('/', (req, res) => {
  res.json({status:200,message: "Hostego Running...", _timestamp: Date.now() })
});

app.get("/api/locations", (req,res) => {
  res.send(require("../locations.json"))
})

app.get("/api/latency", async(req,res) => {
  let host = req.query.host;
  if(!host) return res.json({status: 404 , message: "Invalid query Provided"})
  let resolve = await axios.get(host)
  res.json({status:resolve.status, message: `${Date.now() - resolve.data._timestamp}`})
})

app.listen(() => {
  console.log('Server started');
});
