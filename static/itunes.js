/**
 * @author: Brian Schultz <wannabesrevenge>
 * @date: 2015-12-02
 * 
 * iTunes API Helper
 */
function initApp() {
   function clear() {
      rawData.empty();
      userRating.empty();
      contentRating.empty();
      title.empty();
   }

   function searchDone(data) {
      console.log(data);
      rawData.text(JSON.stringify(data));

      if(data.resultCount < 1) return userRating.text('No results');
      if(data.resultCount > 1) return userRating.text('Mulitple results returned');

      title.text(data.results[0].trackName);
      userRating.text(data.results[0].averageUserRating);
      contentRating.text(data.results[0].contentAdvisoryRating);
   }

   var app = $('#app'),
      search = $('#search'),
      searchBtn = $('#search-btn'),
      userRating = $('#ur'),
      contentRating = $('#cr'),
      rawData = $('#data'),
      title = $('#title');

   searchBtn.click(function(e) {
      clear();

      itunes.query(search.val())
         .done(searchDone)
         .fail(function(data) {
            console.error('Error response', data);
            title.text('There was an error with the request');
            rawData.text(JSON.stringify(data));
         });
   });
}

function askApple(id) {
   itunes.query(id).done(function(data){
      
   }).fail(function(data) {

   });
}

$(document).ready(initApp);

var itunes = {
   query: function(id) {
      var url='/api/' + id;
      return  $.get(url);
   }

};
