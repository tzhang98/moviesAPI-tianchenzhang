// let page = 1;
// let perPage = 10;
// let url ="https://wicked-pocketbook-yak.cyclic.app"






// document.querySelector("#previous-page").addEventListener("click", (e) => {
//     if (page > 1) {
//         page--;
//         loadMovieData();
//     }
// }
// );

// document.querySelector("#next-page").addEventListener("click", (e) => {
//     page++;
//     loadMovieData();
// }
// );

// document.querySelector("#searchForm").addEventListener("submit", (e) => {
//     e.preventDefault();
//     let title = document.querySelector("#title").value;
//     loadMovieData(title);
// }
// );

// document.querySelector("#clearForm").addEventListener("click", (e) => {
//     document.querySelector("#title").value = "";
//     loadMovieData();
// }
// );



// function loadMovieData(title = null) {  
//     let url = "https://wicked-pocketbook-yak.cyclic.app/api/movies?page=" + page + "&perPage=" + perPage;
//     if (title != null) {
//         url += "&title=" + title;
//         page = 1;
//         document.querySelector(".pagination").classList.add("d-none");
//     } else {
//         document.querySelector(".pagination").classList.remove("d-none");
//     }
//     fetch(url)
//         .then((res) => res.json())
//         .then((data) => {
//         let movies = data.movies;
//         let total = data.total;
//         let totalPages = Math.ceil(total / perPage);
//         let table = document.querySelector("#movies tbody");
//         table.innerHTML = "";
//         for (let movie of movies) {
//             let row = document.createElement("tr");
//             row.innerHTML = `
//             <tr data-id="${movie._id}">
//                 <td>${movie.year}</td>
//                 <td>${movie.title}</td>
//                 <td>${movie.plot ? movie.plot : "N/A"}</td>
//                 <td>${movie.rated ? movie.rated : "N/A"}</td>
//                 <td>${
//                   Math.floor(movie.runtime / 60) +
//                   ":" +
//                   (movie.runtime % 60).toString().padStart(2, "0")
//                 }</td>
//                 </tr>
//             `;
//             row.addEventListener("click", (e) => {
//             let modal = document.querySelector("#movie-modal");
//             modal.querySelector(".modal-title").innerHTML = movie.title;
//             modal.querySelector(".modal-body").innerHTML = `
//                 <p><strong>Year:</strong> ${movie.year}</p>
//                 <p><strong>Director:</strong> ${movie.director}</p>
//                 <p><strong>Rating:</strong> ${movie.rating}</p>
//             `;
//             let modalFooter = modal.querySelector(".modal-footer");
//             modalFooter.innerHTML = `
//                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//             `;
//             if (movie._id) {
//                 let deleteButton = document.createElement("button");
//                 deleteButton.type = "button";
//                 deleteButton.classList.add("btn", "btn-danger");
//                 deleteButton.innerHTML = "Delete";
//                 deleteButton.addEventListener("click", (e) => {
//                 fetch(url + "/" + movie._id, {
//                     method: "DELETE"
//                 })
//                     .then((res) => res.json())
//                     .then((data) => {
//                     loadMovieData();
//                     modalFooter.innerHTML = `
//                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                     `;
//                     })
//                     .catch((err) => {
//                     console.log(err);
//                     });
//                 });
//                 modalFooter.appendChild(deleteButton);
//             }
//             let modalInstance = bootstrap.Modal.getInstance(modal);
//             modalInstance.show();
//             });
//             table.appendChild(row);

//         }
//         let pagination = document.querySelector(".pagination");
//         pagination.innerHTML = "";
//         for (let i = 1; i <= totalPages; i++) {

//             let pageItem = document.createElement("li");
//             pageItem.classList.add("page-item");
//             let pageLink = document.createElement("a");
//             pageLink.classList.add("page-link");
//             pageLink.href = "#";
//             pageLink.innerHTML = i;
//             pageLink.addEventListener("click", (e) => {
//             e.preventDefault();
//             page = i;
//             loadMovieData();
//             });
//             pageItem.appendChild(pageLink);
//             pagination.appendChild(pageItem);
//         }
//         });
// }




let page = 1;
let perPage = 10;
movieData = [];

function loadMovieData(title = null) {

    let url = (title ?
        `https://wicked-pocketbook-yak.cyclic.app/api/movies?page=${page}&perPage=${perPage}&title=${title}` :
        `https://wicked-pocketbook-yak.cyclic.app/api/movies?page=${page}&perPage=${perPage}`);

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            let movieData =
                `${data.map(movie => (
                `<tr data-id=${movie._id}>
                        <td>${movie.year}</td>
                        <td>${movie.title}</td>
                        <td>${movie.plot ? movie.plot : "N/A"}</td>
                        <td>${movie.rated ? movie.rated : "N/A"}</td>
                        <td>${Math.floor(movie.runtime/60)+":"+(movie.runtime % 60).toString().padStart(2, '0')}</td>
                    </tr>`
            )).join('')}
                `;

            console.log("====================================");
            console.log(`this is the data: ${movieData}`);
            console.log("====================================");
            document.querySelector('#moviesTable tbody').innerHTML = movieData;
            document.querySelector('#current-page').innerHTML = page;


            
            document.querySelectorAll('#moviesTable tbody tr').forEach((row) => {
                row.addEventListener('click', (e) => {
                    let clickedId = row.getAttribute('data-id');
                    console.log(clickedId);
                    fetch(` https://sore-lime-xerus-hat.cyclic.app/api/movies/${clickedId}`)
                        .then((res) => res.json())
                        .then((data) => {
                            console.log(data);
                            let movieList = `
                            <ul class="list-group">
                                ${[data].map(movies => (`
                            <li class="list-group-item">
                                <img class="img-fluid w-100" src=${movies.poster} ><br><br>
                                <strong>Directed By:</strong> ${movies.directors.join(',')}<br><br>
                                <p>${movies.fullplot}</p><br>
                                <strong>Cast:</strong>${movies.cast.join(',')}<br><br>
                                <strong>Awards:</strong>${movies.awards.text}<br>
                                <strong>IMDB Rating:</strong>${movies.imdb.rating +"("+movies.imdb.votes+"votes"+")"}<br/>
                            </li>
                            `)).join('')}
                        </ul>
                        `;

                            document.querySelector('#detailsModal .modal-body').innerHTML = movieList;

                            let modal = new bootstrap.Modal(document.getElementById('detailsModal'), {
                                backdrop: 'static',
                                keyboard: false,
                            });

                            modal.show();
                        });
                });
            });
        });

}




document.addEventListener('DOMContentLoaded', function() {
    loadMovieData();
    document.querySelector('#searchForm').addEventListener('submit', (event) => {
        event.preventDefault();
        loadMovieData(document.querySelector('#title').value);
    });
    document.querySelector('#clearForm').addEventListener('click', (event) => {
        document.querySelector('#title').value = '';
        loadMovieData();
    });
    document.getElementById("next-page").addEventListener("click", function() {
        page += 1;
        loadMovieData();
    });
    document.getElementById("previous-page").addEventListener("click", function() {
        if (page > 1) {
            page -= 1;
            loadMovieData();
        }
    });
});











        














