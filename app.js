var RecipeRequest_URL = 'http://food2fork.com/api/get';
var SearchRequest_URL = 'http://food2fork.com/api/search';

//array to hold selected ingredients
var selected = []; 

//show nav after leaving homepage and remove homepage buttons
$('body').on('click', 'button#recipe-search, button#ingredient-search', function(event) {
  $('nav').removeClass('hidden');
  $('div.home-container').addClass('hidden');
});

//show recipe search page
$('body').on('click', 'button#recipe-search', function(event) {
  $('#title-searchbar').removeClass('hidden');
  $('div.js-seach-results').removeClass('hidden');
});

//show ingredient search page
$('body').on('click', 'button#ingredient-search', function(event) {
  $('.ingredient-selector').removeClass('hidden');
});

//nav home button
$('nav').on('click', 'button#nav-home', function(event) {
  $('nav').addClass('hidden');
  $('div.home-container').removeClass('hidden');
  $('#title-searchbar').addClass('hidden');
  $('div.js-seach-results').addClass('hidden');
  $('.ingredient-selector').addClass('hidden');
});

//nav recipe search button
$('nav').on('click', 'button#nav-search-recipes', function(event) {
  $('.ingredient-selector').addClass('hidden');
  $('#title-searchbar').removeClass('hidden');
  $('div.js-seach-results').removeClass('hidden');
});

//nav ingredient search button
$('nav').on('click', 'button#nav-ingredient-search', function(event) {
  $('.ingredient-selector').removeClass('hidden');
  $('#title-searchbar').addClass('hidden');
  $('div.js-seach-results').addClass('hidden');
});

//change button color and add ingredient to selected array on click, remove and change color back if clicked again
$('div.ingredient-list').on('click', 'button', function(event) { 
  var curIngredients = $('div#current-ingredients');
  var ingredientVal = $(this).val();
  //regex below replaces spaces in ingredientVal with '-'' for the id
  var ingredientId = ingredientVal.replace(/\s+/g, '-');
  if (!$(this).hasClass('selected-button')) {
    $(this).addClass('selected-button');
    if (ingredientVal=="NaN") {
      return selected;
    } else {
      selected.push(ingredientVal);
      curIngredients.append('<p id=' + ingredientId + '>' + ingredientVal + '</p>'); 
    }
  } else {
    $(this).removeClass('selected-button');
    var removeItemIndex = selected.indexOf(ingredientVal);
    selected.splice(removeItemIndex, 1); 
    var removeIngredient = '"#' + ingredientVal + '"';
    console.log(removeIngredient);
    curIngredients.children().remove('#'+ingredientId);
  }
  return selected;
});

//submit ingredient search
$('body').on('click', 'button#confirm-ingredients', function(event) {
  
});


  

//food2fork recipe search api
function getSearchFromApi(searchTerm, callback) {
  var query = {
    key: '67da4d03f58c56d22ee2072df42106f9',
    q: searchTerm,
  }
  $.getJSON(SearchRequest_URL, query, callback);
}

function displaySearchData(data) {
  var displayElem = $('.js-search-results');
  data.items.forEach(function(item) {
    var elem = $('.js-result-template').children().clone();
    var imageUrl = item.snippet.thumbnails.default.url;
    elem.find('img').attr('src', imageUrl);
    displayElem.append(elem);
  });
}

function clearResults() {
    $('.js-search-results').empty();
 }

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    clearResults();
    var query = $(this).find('.js-query').val();
    getSearchFromApi(query, displaySearchData);
  });
}

$(function() {
    watchSubmit();
});

