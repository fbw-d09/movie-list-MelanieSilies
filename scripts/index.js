import View from './View.js';
import Client from './Client.js';



// All of your javascript should go here
const view = new View();
const client = new Client();
const input = document.getElementById('input');
const btn_save = document.querySelector('.btn-save');
const btn_reset = document.querySelector('.btn-reset');

const savedMovies = JSON.parse(localStorage.getItem('movies')) || [];

const getMovie = (movie) => {
    client.getMovieData(movie).then(data => {
        view.displayMovieOnPage(data);
    })
}

const showMovies = () => {
    savedMovies.forEach(movie => {
        getMovie(movie);
    });
}

showMovies();

const resetInputfield = () => {
    input.value = '';
    view.removeDisplay();
}

const saveNewData = () => {
    savedMovies.push(input.value);
    localStorage.setItem('movies', JSON.stringify(savedMovies));
}

btn_save.addEventListener('click', (btn_save) => {
    if (input.value !== '' && !savedMovies.includes(input.value)) {
        saveNewData();
        resetInputfield();
        showMovies();
    } else if (savedMovies.includes(input.value)) {
        alert('dieser Titel ist bereits vorhanden!');
    } else if (input.value == '') {
        alert('bitte gib einen Titel ein.')
    }

});

btn_reset.addEventListener('click', () => {
    localStorage.removeItem('movies');
    view.removeDisplay();
    savedMovies.length = 0;
    alert('Movie list reset successfully!');
});
