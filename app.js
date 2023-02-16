const express = require('express')
const app = express()

const https = require("https")
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))

const PORT = process.env.PORT ||3000


const animeList = { anime: [
    { id:1, Name: "One Piece", Episodes: "1050",Completed: "Caught Up", Raiting: "8/10"},
    { id:2, Name: "Bleach", Episodes: "379", Completed: "Caught Up", Raiting: "7/10"},
    { id:3, Name: "Dragonball ", Episodes: "153", Completed: "Caught Up", Raiting: "8/10"},
    { id:4, Name: "Dragonball Z", Episodes: "291", Completed: "Caught Up", Raiting: "6/10"},
    { id:5, Name: "Dragonball Super", Episodes: "131", Completed: "Dropped", Raiting: "5/10"},
    { id:6, Name: "Attack on Titan", Episodes: "87", Completed: "Caught Up", Raiting: "6/10"},
    { id:7, Name: "Code Geass", Episodes: "50", Completed: "Caught Up", Raiting: "10/10"},
    { id:8, Name: "BlueLock", Episodes: "24", Completed: "Caught Up", Raiting: "8/10"},
    { id:9, Name: "Spy x Family", Episodes: "25", Completed: "Caught Up", Raiting: "6/10"},
    { id:10, Name: "Hunter x Hunter", Episodes: "148", Completed: "Caught Up", Raiting: "4/10"},
    { id:11, Name: "Steins;Gate", Episodes: "24", Completed: "Caught Up", Raiting: "8/10"},
    { id:12, Name: "Your Name", Episodes: "Movie", Completed: "Caught Up", Raiting: "9/10"},
    { id:13, Name: "Vinland Saga", Episodes: "24", Completed: "Caught Up", Raiting: "6/10"},
    { id:14, Name: "Jujustu Kaisen", Episodes: "24", Completed: "Dropped", Raiting: "5/10"},
    { id:15, Name: "Haikyuu", Episodes: "85", Completed: "Caught Up", Raiting: "8/10"},
    { id:16, Name: "Tengen Toppa Gurren Lagann", Episodes: "27", Completed: "Caught Up", Raiting: "9/10"},
    { id:17, Name: "Cyberpunk: Edgerunners", Episodes: "10", Completed: "Caught Up", Raiting: "8/10"},
    { id:18, Name: "Death Note", "Episodes": "37", Completed: "Caught Up", Raiting: "9/10"},
    { id:19, Name: "Neon Genesis Evangelion", Episodes: "26", Completed: "Caught Up", Raiting: "7/10"},
    { id:20, Name: "JoJo's Bizarre Adventure", Episodes: "190", Completed: "Caught Up", Raiting: "9/10"},
    { id:21, Name: "One Punch Man", Episodes: "24", Completed: "Caught Up", Raiting: "6/10"},
    { id:22, Name: "Demon Slayer", Episodes: "44", Completed: "Caught Up", Raiting: "8/10"},
    { id:23, Name: "K-On", Episodes: "39", Completed: "Caught Up", Raiting: "6/10"}
]}

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/animelist", (req, res) => {
    res.send(animeList)
})

app.get("/animelist/anime/:id", (req,res) => {
    var animeIndex = animeList.anime.findIndex(x => x.id == req.params.id)

    if(animeList.anime[animeIndex] != null){
        res.send(animeList.anime[animeIndex])
    }
})

app.get("/addanime",(req,res) => {
    res.sendFile(__dirname + "/addanime.html")
})

app.post("/addanime", (req,res)=>{
    
    let newName = req.body.Name
    let newEpisodes = req.body.Episodes
    let newCompleted = req.body.Completed
    let newRaiting = req.body.Raiting

    animeList.anime.push({id: animeList.anime.length + 1, Name : newName, Episodes : newEpisodes, Completed: newCompleted, Raiting: newRaiting})
})

app.delete("/animelist/:id", (req, res) => {
    var animeIndex = animeList.anime.findIndex(x => x.id == req.params.id)
    if(animeIndex < 0){
        return res.status(404).send("anime not found")
    }

    animeList.anime.splice(animeIndex , 1)
    res.send("Anime Deleted!")
})

app.listen(PORT,() =>{
    console.log("Listening to port " + PORT)
})