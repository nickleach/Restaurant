// $(document).ready( function () {


      //Pulls latest news from API
  newsURL = 'http://private-anon-fb178ad55-restaurantapi.apiary-mock.com/news/latest';

  $.getJSON(newsURL).success(function(response) {
    $('.news').html('<div class="titleDate"><span class="postTitle">' + response.title + '</span><span class="postDate"> ' + response.date_published + '</span></div><p class="postContent">' + response.post + '</p><a href="#"><span class="readMore">...Read More</span></a> ');
  }
    );


  //Pulls menu info from API
  menuURL = 'http://private-anon-fb178ad55-restaurantapi.apiary-mock.com/menu-1';


      //Pulls appetizers from API
  var appTemplate = _.template($('#app-template').text());

  $.getJSON(menuURL, function(items){
    processApps(items.appetizers);
    });

  function processApps(items) {
    items.forEach(function(app){
      var $element = appTemplate(app);
      $('.app').append($element);
  });
    }


      //Pulls entrees from API
  var entTemplate = _.template($('#ent-template').text());

  $.getJSON(menuURL, function(items){
    processEnts(items.entrees);
    });

  function processEnts(items) {
    items.forEach(function(ent){
      var $element = entTemplate(ent);
      $('.ent').append($element);
  });
    }



      //Pulls sides from API
  var sideTemplate = _.template($('#side-template').text());

  $.getJSON(menuURL, function(items){
    processSides(items.sides);
    });

  function processSides(items) {
    items.forEach(function(side){
      var $element = sideTemplate(side);
      $('.sides').append($element)
  });
    }



  //Pulls special from menu API

  specialURL = 'http://private-anon-fb178ad55-restaurantapi.apiary-mock.com/menu/special';
  var specialID;

  $.getJSON(specialURL).success(function(response) {
    specialID = response.menu_item_id;
  }
    );

  $.getJSON(menuURL).success(function(response) {
    response.entrees.filter(function(x) {
      if(x.id == specialID) {
        $('.special').html('<span class="specialTitle">' + x.item + '</span><span>.........</span><span class="specialPrice"> ' + x.price + '</span><p class="specialDesc">' + x.description + '</p>');
      }
    })
  });


//Hides and displays content sections

  $('#menu').on ('click', function() {
    $('#menu').removeClass('border');
    $('#story').addClass('border');
    $('#reserve').addClass('border');
    $('.our-story').removeClass('displayedsection').addClass('hiddensection');
    $('.reservations').removeClass('displayedsection').addClass('hiddensection');
    $('.menu').addClass('menudisplayedsection')
  });

  $('#story').on ('click', function() {
    $('#story').removeClass('border');
    $('#reserve').addClass('border');
    $('#menu').addClass('border');
    $('.menu').removeClass('menudisplayedsection').addClass('hiddensection');
    $('.reservations').removeClass('displayedsection').addClass('hiddensection');
    $('.our-story').addClass('displayedsection')
  });

  $('#reserve').on ('click', function() {
    $('#reserve').removeClass('border');
    $('#story').addClass('border');
    $('#menu').addClass('border');
    $('.our-story').removeClass('displayedsection').addClass('hiddensection');
    $('.menu').removeClass('menudisplayedsection').addClass('hiddensection');
    $('.reservations').addClass('displayedsection')
  });

  $('.section-headers span').on('click', function(){
    $('.section-headers span').removeClass('section-clicked');
    $(this).addClass('section-clicked');
  });



  //Reservation Form
  var reservation = [
    { type: 'text', CSS: 'fullName', label: 'Full Name' },
    { type: 'number', CSS: 'guestNum', label: 'Number of Guests' },
    { type: 'date', CSS: 'reserveDate', label: 'Date' },
    { type: 'text', CSS: 'specialNotes', label: 'Special Notes' },
    { type: 'text', CSS: 'seatPref', label: 'Seating Preference'},
    { type: 'Submit', CSS: 'submitBtn', label: 'Reserve Table'}
  ];

  function formBuilder(data) {

    var formHTML = '<form>';

    data.forEach( function (elem) {

      if (elem.type === 'submit') {

        formHTML += '<input type="' + elem.type + '" value="' + elem.label + '" />';

      } else {

        formHTML += '<label class="formLabel">' + elem.label + '</label>';
        formHTML += '<input class="' + elem.CSS + '" type="' + elem.type + '" />';
        formHTML += '</br></br>';

      }

    });

    formHTML += '</form>';

    $('.reservations').html(formHTML);

  }

  formBuilder(reservation);


// Flickr stuff



var flickrKey = '4f3a84c85117987d979fb17d63397301';

var galleryID;

var flickrUrl = function(galleryID){
  return 'https://api.flickr.com/services/rest/?&method=flickr.galleries.getPhotos&api_key=' + flickrKey +
'&gallery_id='+ galleryID+ '&extras=url_m&format=json&nojsoncallback=1';
}

// Food Images
var foodImages = _.template($('#food-images').text());


 $.getJSON(flickrUrl('132848138-72157651339894593')).success(function(x) {
   var pics = x.photos.photo;
   foodPics(pics);
 })


function foodPics(pics) {
 pics.forEach(function(pic) {
   var $element = foodImages(pic);
   $('.food-pics').append($element);
 });
};
// Special Image
var specialImage = _.template($('#special-image').text());

$.getJSON(flickrUrl('132848138-72157653720385806')).success(function(x){
  var pics = x.photos.photo;
  specialFlickr(pics);
});

function specialFlickr(pics){
  pics.forEach(function(pic){
    var $element = specialImage(pic);
    $('.special-images').append($element);
  });
};

// })
