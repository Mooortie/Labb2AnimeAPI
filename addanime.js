document.getElementById('submit').addEventListener('click', async () => {
    const Data = {
        anime: document.getElementById('name').value,
        episodes: document.getElementById('episodes').value,
        completed: document.getElementById('completed').value,
        raiting: document.getElementById('raiting').value
    }
    const req = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(Data)
    }
    console.log(req)
    const res = await fetch('/addanime', req)
    console.log(res)
    if(res.ok){
        document.getElementById('result').innerText = 'Anime successfully added.'
    }
    else{
        document.getElementById('result').innerText = 'Nope'
    }
})