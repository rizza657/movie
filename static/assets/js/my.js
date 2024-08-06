console.log($)
dashboardcontent = document.getElementById("dashcont")
$("#upload-movie").on("click", function(){
dashboardcontent.innerHTML = `
<form  action="/imageupload" method="post" class="form">
<div class="form-group">
<label>Movie image</label>
<input type="file" class="form-control">
</div>
<div class="form-group">
<label>Movie title</label>
<input type="text" class="form-control">

</div>
<div class="form-group">
    <label>Genre</label>
    <input type="text" class="form-control">
</div>
<div class="form-group">
    <label>Movie description</label>
    <textarea class="form-control" ></textarea>
</div>
<button class="btn btn-dark" i>Upload</button>
</form>
`
})


$("#view-movies-button").on("click", function(){
const movieStore = [
{
"id": 1,
"imgSrc": "https://images.unsplash.com/photo-1642456074142-92f75cb84533?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
"title": "Spider Man",
"genre": "Action",
"description": "A thrilling action-packed adventure."
},
{
"id": 2,
"imgSrc": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRahMdIAUM-EOFYqEUdg55XHG4JQYaskXKhDG8WeHkyZH2DXZVz",
"title": "Inception",
"genre": "Science Fiction",
"description": "A mind-bending journey through dreams."
},
{
"id": 3,
"imgSrc": "https://m.media-amazon.com/images/S/pv-target-images/338a7d1850e45f4e63f1997f01ddbdb5ab3141f06bd518fe4395c751498f4a18.jpg",
"title": "The Dark Knight",
"genre": "Action",
"description": "A gripping tale of heroism and sacrifice."
},
{
"id": 4,
"imgSrc": "https://m.media-amazon.com/images/M/MV5BYjg1YmIyOTUtYTEwMS00ZjRmLWE5NTgtZWJjY2Q3NDBmMTNhL2ltYWdlXkEyXkFqcGdeQXVyNzE4NDc2Mjc@._V1_.jpg",
"title": "Interstellar",
"genre": "Science Fiction",
"description": "A breathtaking exploration of space and time."
},
{
"id": 5,
"imgSrc": "https://assets-prd.ignimgs.com/2022/06/30/matrix-thumbnail-1656609365858.jpg",
"title": "The Matrix",
"genre": "Action",
"description": "A revolutionary science fiction classic."
},
{
"id": 6,
"imgSrc": "https://parade.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk0OTMxNTc0Njc1NzQzOTA2/avatar-3-evil-navi-james-cameron.jpg",
"title": "Avatar",
"genre": "Science Fiction",
"description": "A visually stunning epic adventure."
},
{
"id": 7,
"imgSrc": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.foxnews.com%2Fentertainment%2Ftitanic-movie-25th-anniversary-kate-winslet-leonardo-dicaprio-more-cast-then-now&psig=AOvVaw0X7CB-HpsYAuJYJdPnNako&ust=1720793266988000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjbzcyUn4cDFQAAAAAdAAAAABAf",
"title": "Titanic",
"genre": "Romance",
"description": "A timeless love story set against tragedy."
},
{
"id": 8,
"imgSrc": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.foxnews.com%2Fentertainment%2Ftitanic-movie-25th-anniversary-kate-winslet-leonardo-dicaprio-more-cast-then-now&psig=AOvVaw0X7CB-HpsYAuJYJdPnNako&ust=1720793266988000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjbzcyUn4cDFQAAAAAdAAAAABAf",
"title": "Jurassic Park",
"genre": "Adventure",
"description": "A thrilling adventure with dinosaurs."
},
{
"id": 9,
"imgSrc": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRS2jXYLmWn1BZjljgMFQx0znSPiS5WrRrFhdYtRxpGbuYFeJWY6tZZrSy6nnJ45II1XXvjPE13kYlgrtd56YIs4BtyIy_2fIxtQQCpfyE",
"title": "The Lion King",
"genre": "Animation",
"description": "A heartwarming story of courage and destiny."
},
{
"id": 10,
"imgSrc": "https://cdn.aarp.net/content/aarpe/en/home/entertainment/movies-for-grownups/info-2022/forrest-gump/_jcr_content/root/container_main/container_body_main/container_body1/container_body_cf/container_image/articlecontentfragment/cfimage.coreimg.50.932.jpeg/content/dam/aarp/entertainment/movies-for-grownups/2022/03/1140-forrest-gump-bench.jpg",
"title": "Forrest Gump",
"genre": "Drama",
"description": "An inspiring tale of an extraordinary man."
},
{
"id": 11,
"imgSrc": "https://cdn.britannica.com/93/77293-050-CF984388/Russell-Crowe-Gladiator.jpg",
"title": "Gladiator",
"genre": "Action",
"description": "A powerful story of vengeance and honor."
},
{
"id": 12,
"imgSrc": "https://m.media-amazon.com/images/M/MV5BNjQ2NDA3MDcxMF5BMl5BanBnXkFtZTgwMjE5NTU0NzE@._V1_QL75_UX500_CR0,47,500,281_.jpg",
"title": "The Shawshank Redemption",
"genre": "Drama",
"description": "A story of hope and resilience in prison."
}
]

let dashcont = movieStore.map(each_item => {
    return `
       <div>
            <div class="card" style="width: 300px;">
                <img src="${each_item.imgSrc}" class="card-img-top" style="width: 100%; height: 300px">
                <div class="card-body">
                    <h5 class="card-title">${each_item.title}</h5>
                    <small class="text-muted">${each_item.genre}</small>
                    <p class="card-text">${each_item.description}</p>
                </div>
            </div>
        </div>
    `;
}).join('');
document.getElementById("dashcont").innerHTML = `<div style="display: flex; flex-wrap: wrap; gap: 20px;">${dashcont}</div>`
})

