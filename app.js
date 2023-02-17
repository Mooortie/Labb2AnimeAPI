const express = require('express')
const app = express()

const https = require("https")
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))

const PORT = process.env.PORT ||3000


const animeList = { anime: [
    { id:1, name: "One Piece", episodes: "1050",completed: "Caught Up", raiting: "8/10"},
    { id:2, name: "Bleach", episodes: "379", completed: "Caught Up", raiting: "7/10"},
    { id:3, name: "Dragonball ", episodes: "153", completed: "Caught Up", raiting: "8/10"},
    { id:4, name: "Dragonball Z", episodes: "291", completed: "Caught Up", raiting: "6/10"},
    { id:5, name: "Dragonball Super", episodes: "131", Ccmpleted: "Dropped", raiting: "5/10"},
    { id:6, name: "Attack on Titan", episodes: "87", completed: "Caught Up", raiting: "6/10"},
    { id:7, name: "Code Geass", episodes: "50", completed: "Caught Up", raiting: "10/10"},
    { id:8, name: "BlueLock", episodes: "24", completed: "Caught Up", raiting: "8/10"},
    { id:9, name: "Spy x Family", episodes: "25", completed: "Caught Up", raiting: "6/10"},
    { id:10, name: "Hunter x Hunter", episodes: "148", completed: "Caught Up", raiting: "4/10"},
    { id:11, name: "Steins;Gate", episodes: "24", completed: "Caught Up", raiting: "8/10"},
    { id:12, name: "Your Name", episodes: "Movie", completed: "Caught Up", raiting: "9/10"},
    { id:13, name: "Vinland Saga", episodes: "24", completed: "Caught Up", raiting: "6/10"},
    { id:14, name: "Jujustu Kaisen", episodes: "24", completed: "Dropped", raiting: "5/10"},
    { id:15, name: "Haikyuu", episodes: "85", completed: "Caught Up", Raiting: "8/10"},
    { id:16, name: "Tengen Toppa Gurren Lagann", episodes: "27", completed: "Caught Up", raiting: "9/10"},
    { id:17, name: "Cyberpunk: Edgerunners", episodes: "10", completed: "Caught Up", raiting: "8/10"},
    { id:18, name: "Death Note", episodes: "37", completed: "Caught Up", raiting: "9/10"},
    { id:19, name: "Neon Genesis Evangelion",episodes: "26", completed: "Caught Up", raiting: "7/10"},
    { id:20, name: "JoJo's Bizarre Adventure", episodes: "190", completed: "Caught Up", raiting: "9/10"},
    { id:21, name: "One Punch Man", episodes: "24", completed: "Caught Up", raiting: "6/10"},
    { id:22, name: "Demon Slayer", episodes: "44", completed: "Caught Up", raiting: "8/10"},
    { id:23, name: "K-On", episodes: "39", completed: "Caught Up", raiting: "6/10"}
]
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
    
    let newName = req.body.name
    let newEpisodes = req.body.Episodes
    let newCompleted = req.body.Completed
    let newRaiting = req.body.Raiting

    animeList.anime.push({id: animeList.anime.length + 1, name : newName, Episodes : newEpisodes, Completed: newCompleted, Raiting: newRaiting})
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