document.addEventListener("DOMContentLoaded", () => {
  // getting elements from the DOM
  const moviesListContainer = document.querySelector("#moviesList");
  const movieDetailsContainer = document.querySelector("#movieDetails");

  // getting films data
  fetch("https://flatdango.vercel.app/db.json")
    .then((res) => res.json())
    .then((data) => {
      displayMoviesList(data.films);
    });

  //   displaying movies titles
  function displayMoviesList(data) {
    data.map((movie) => {
      const markUp = `<li class="list-group-item" id="movieList">${movie.title}</li>`;

      // append movie titles
      moviesListContainer.insertAdjacentHTML("afterbegin", markUp);

      // display the first movie details on the list on load of the page
      displayMovieDetails(movie);

      // display movie details on click of the movie titles
      const movieList = document.querySelector("#movieList");
      movieList.addEventListener("click", () => {
        displayMovieDetails(movie);
      });
    });
  }

  // Display movie details
  function displayMovieDetails(movie) {
    const markUp = `<img src="${movie.poster}" alt="">
  <div>
  <h2 id="movieTitle" class= "customtitles">${movie.title}</h2>
  <p id="description">${movie.description}</p>
  <p id="runtime">Length: <span>${movie.runtime} Minutes</span></p>
  <p id="showtime">Show Time: <span>${movie.showtime}</span></p>
  <p id="capacity">Theater capacity: <span>${movie.capacity}</span></p>
  <p id="ticketssold">Tickets sold: <span>${movie.tickets_sold}</span></p>
  <p id="availableTickets">Available tickets: <span>${
    movie.capacity - movie.tickets_sold
  }</span></p>
  <button class="custombtn" id="buyTicket">buy ticket 🎟️</button>
 </div>`;

    movieDetailsContainer.innerHTML = "";
    movieDetailsContainer.insertAdjacentHTML("afterbegin", markUp);

    const btn = movieDetailsContainer.querySelector("button");
    btn.addEventListener("click", () => {
      buyTicket(movie);
    });
  }

  // Buy ticket
  function buyTicket(movie) {
    const ticketsSold = document.querySelector("#ticketssold");
    let remainingTickets = movie.capacity - movie.tickets_sold;
    const btn = movieDetailsContainer.querySelector("button");
    const availableTickets = document.querySelector("#availableTickets");

    if (remainingTickets > 0) {
      movie.tickets_sold++;
      remainingTickets--;
      btn.innerHTML = "buy tickets 🎟️";
    } else {
      btn.innerHTML = "sold out";
      btn.classList.add("soldOut");
    }
    ticketsSold.innerHTML = `Tickets sold: <span>${movie.tickets_sold}</span>`;
    availableTickets.innerHTML = `Available tickets: <span>${remainingTickets}</span>`;
  }
});
//some ideas got from M.saina all rights reserved