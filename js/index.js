document.addEventListener("DOMContentLoaded", () => {
    const movieTitlesListContainer = document.querySelector("div.list-container");
    const movieTitlesList = document.getElementById("films");
    const movieCard = document.querySelector("div.card")

    function initialFetch() {
        fetch("http://localhost:3000/films")
        .then(response => response.json())
        .then(movies => {
            movies.forEach(movie => {
                // console.log(movie)
                displayMovieTitle(movie)
                if (parseInt(movie.id) === 1) {
                    displayMovieInfo(movie)
                }
            })
        })
    }

    initialFetch()

    function displayMovieTitle(movie) {
        let item = document.createElement("li")
        let delBtn = document.createElement("button")
        delBtn.innerText = "Delete"
        delBtn.addEventListener("click", () => {
            item.remove()
            deleteMovie(movie.id)
        })
        item.setAttribute("class", "film item")
        item.innerText = movie.title
        movieTitlesList.append(item)
        movieTitlesList.appendChild(delBtn)

        const remainingTickets = getRemainingtickets(movie);
        if(remainingTickets === 0) {
            item.setAttribute("class", "sold-out film item")
        }

        item.addEventListener("click", function(){
            displayMovieInfo(movie)
        })
        
    }

    function getRemainingtickets(movie){
        return movie.capacity - movie.tickets_sold
    }

    function displayMovieInfo(movie) {
        const imageTag = document.getElementById("poster")
        imageTag.setAttribute("src", movie.poster)
        imageTag.setAttribute("alt", movie.title)

        const availableTickets = getRemainingtickets(movie)
        const movieInfo = `
            <div id="title" class="title">${movie.title}</div>
            <div id="runtime" class="meta">${movie.runtime} minutes</div>
            <div class="content">
            <div class="description">
                <div id="film-info">${movie.description}</div>
                <span id="showtime" class="ui label">${movie.showtime}</span>
                <span id="ticket-num">${availableTickets}</span> remaining tickets
            </div>
            </div>
            <div class="extra content">
            <button id="buy-ticket" class="ui orange button">
                Buy Ticket
            </button>
            </div>
        `
        movieCard.innerHTML = movieInfo

        const buyTicketBtn = movieCard.querySelector("button#buy-ticket")
        if(availableTickets === 0){
            buyTicketBtn.disabled = true
            buyTicketBtn.innerText = "Sold Out"
        }
        else {
            buyTicketBtn.addEventListener("click", () => {
                purchaseTicket(movie)
            })
        }
    }

    function purchaseTicket(movie) {
        fetch(`http://localhost:3000/films/${movie.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: movie.title,
                runtime: movie.runtime,
                capacity: movie.capacity,
                showtime: movie.showtime,
                description: movie.description,
                poster: movie.poster,
                tickets_sold: ++movie.tickets_sold
            })
        })
        .then(response => response.json())
        .then(movie => {
            displayMovieInfo(movie)
            movieTitlesList.innerHTML = ''
            initialFetch()
        })
    }

    function deleteMovie(id) {
        fetch(`http://localhost:3000/films/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(movie => movie)
    }
})