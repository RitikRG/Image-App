const accessKey ="nFxe0q-EERJ3tib8fDX-bmOsGSRRC_7Nl8eJnVIO1NM";

// importing the html elements

const form = document.querySelector('form');
const input = document.querySelector('#search-input');
const submitBtn = document.querySelector('#submitBtn');
const searchResults = document.querySelector('#container');
const showMore = document.querySelector('#showMoreBtn');


// defining variables
let inputData = "";
let page = 1;


// Defining function

async function searchImages(){
    inputData=input.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`


    const response= await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page===1){
        searchResults.innerHTML="";
    }

    results.map((result)=>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('resultBox');
        const image = document.createElement('img');
        image.src= result.urls.small;
        image.alt = result.alt_description;
        const imageHead = document.createElement('p');
        imageHead.innerText=result.alt_description.toUpperCase()

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageHead);
        searchResults.appendChild(imageWrapper)
    })


    page++;
    if(page>1){
        showMore.style.display = 'inline-block';
    }
}



form.addEventListener('submit', (e)=>{
    e.preventDefault();
    page=1;
    searchImages();
})

showMore.addEventListener('click', ()=>{
    searchImages();
})