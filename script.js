const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loaderBtn =document.getElementById('loader');

//get quotes from api

let apiQuotes =[];
//loader
function loading() {
    loaderBtn.hidden = false;
    quoteContainer.hidden = true;
}
//hide loading
function complete(){
    quoteContainer.hidden = false;
    loaderBtn.hidden = true;
}
//show New quote
function newQuote() {
    loading();
    //Pick a random Quote
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    ///check if author field is blank and replace it with a unknown
    if(!quote.author) {
    
    authorText.textContent = 'Unknown';
    } else{
    authorText.textContent = quote.author;
    complete();
    }
//check quote length to detemine styling
    if (!quote.text.length>50) {
    quoteText.classList.add('long-quote');
    } else{
    quoteText.classList.remove('long-quote');
    } 
    //set quote , hide loader
    quoteText.textContent = quote.text;

}


async function getQuote(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
       const response = await fetch(apiUrl);
       apiQuotes = await response.json();
       newQuote();
    }catch (error){

    }
}
    //handle error}

//Tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank')

}
//event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
//on load
getQuote();
