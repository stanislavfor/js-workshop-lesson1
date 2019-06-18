"use strict";

const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=f886e2f8806929d35a37da17de1bd745&language=ru&query=' + searchText;
    requestApi(server);
}
searchForm.addEventListener('submit', apiSearch);

function requestApi(url) {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.addEventListener('readystatechange', function () {
        if (request.readyState !== 4) return;
        if (request.status !== 200){
            console.log('error: ' + request.status);
            return;
        }
        const output = JSON.parse(request.responseText);
        let inner = '';
        output.results.forEach(function (item){
            let nameItem = item.name || item.title;
            let dateItem = item.release_date || item.first_air_date;
            inner += '<div class="col-12 col-md-4 col-xl-3">' + '<strong>' + nameItem + '</strong>' + '<br>' + 'дата выхода: ' + dateItem + '<br><br>' + '</div>';
        });
        movie.innerHTML = inner;
    });
}