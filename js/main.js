let page = 1;
let perPage = 10;
let url = "https://wicked-pocketbook-yak.cyclic.app";




function loadMovieData(title = null) {
    let URL = title
    ? `${url}/api/movies?page=${page}&perPage=${perPage}&title=${title}`
    : `${url}/api/movies?page=${page}&perPage=${perPage}`;
    // if (title != null) {
    //     url += "&title=" + title;
    //     page = 1;
    //     document.querySelector(".pagination").classList.add("d-none");
    // } else {
    //     document.querySelector(".pagination").classList.remove("d-none");
    // }

    if (title) {
        document.querySelector(".pagination").classList.add("d-none");
    } else {
        document.querySelector(".pagination").classList.remove("d-none");
    }

    let modal = new bootstrap.Modal(document.getElementById("detailsModal"));
    fetch(URL)
        .then((res) => res.json())
        .then((data) => {

            console.log(data);



            let movies = `${data.map(
                    (movie) =>
                        `<tr data-id="${movie._id}">
                        <td>${movie.year}</td>
                        <td>${movie.title}</td>
                        <td>${movie.plot ? movie.plot : "N/A"}</td>
                        <td>${movie.rated ? movie.rated : "N/A"}</td>
                        <td>${Math.floor(movie.runtime / 60) + ":" + (movie.runtime % 60).toString().padStart(2, "0")}</td></tr>
                      `).join("")}`;

            document.querySelector("#moviesTable tbody").innerHTML = movies;
            document.querySelectorAll("#moviesTable tbody tr").forEach((row) => {
                row.addEventListener("click", (event) => {
                    
                    fetch(`https://wicked-pocketbook-yak.cyclic.app/api/movies/${row.dataset.id}`)
                    
                    .then((res) => res.json())
                        .then((data) => {
                            console.log(data);
                            document.querySelector("#detailsModal .modal-title").textContent = data.title;
                            document.querySelector("#detailsModal .modal-body").innerHTML = `<img class="img-fluid w-100" src="${data.poster ? data.poster : ""
                                }"><br><br>
                                <strong>Directed By: </strong>${data.directors}<br><br>
                                <p>${data.fullplot}</p>
                                <strong>Cast: </strong>${data.cast ? data.cast : "N/A"
                                }<br><br>
                                <strong>Awards: </strong>${data.awards.text}<br>
                                <strong>IMDB Rating: </strong>${data.imdb.rating} (${data.imdb.votes
                                } votes)`;
                            modal.show();


                        });

                });
            });
            }

            );
        }



        
document.addEventListener("DOMContentLoaded", () => {
    let title = document.querySelector("#title");
    document.querySelector("#current-page").textContent = page;
    loadMovieData("");
    document.querySelector("#searchForm").addEventListener("submit", (event) => {
        event.preventDefault();
        page = 1;
        loadMovieData(title.value);
    });

    document.querySelector("#previous-page").addEventListener("click", (event) => {
        event.preventDefault();
        page--;
        document.querySelector("#current-page").textContent = page;
        loadMovieData();
    });

    document.querySelector("#next-page").addEventListener("click", (event) => {
        event.preventDefault();
        page++;
        document.querySelector("#current-page").textContent = page;
        loadMovieData();
    });

    document.querySelector("#clearForm").addEventListener("click", (event) => {
        document.querySelector("#title").value = "";
        page = 1;
        document.querySelector("#current-page").textContent = page;
        loadMovieData();
    });
});












