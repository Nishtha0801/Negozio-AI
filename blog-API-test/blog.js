fetch('https://gnews.io/api/v4/search?q=nutrition&token=66fda1f4f854e1b91a11f6cd5c11b0f0')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        displayArticles(data);
    });

let container = document.querySelector('.grid'); 

function displayArticles(data){
  let displayHTML = "";
  shuffleArray(data.articles);
  data.articles.forEach(element => {
    console.log(element.title);
    displayHTML += `
        <a class="grid__item" href="#">
            <h2 class="title title--preview">${element.title}</h2>
            <div class="loader"></div>
                <span class="category">Nutrition</span>
            <div class="meta meta--preview">
                <img class="meta__avatar" src="" alt="${element.title} Image" /> 
                <span class="meta__date"><i class="fa fa-calendar-o"></i>${element.publishedAt}</span>
                <span class="meta__reading-time"><i class="fa fa-clock-o"></i>${element.source.name}</span>
            </div>
        </a>    
    `
  }); //lets nacho - you figured it out!  
  container.innerHTML = displayHTML;
}

//Shuffling the array of articles
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}