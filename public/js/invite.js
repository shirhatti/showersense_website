var obj = $.ajax({
    type: 'GET',
    url: '../api/friends',
    dataType: 'json',
    success: function(){},
    data: {},
    async:false
  }).responseJSON.data;
var names = [];

$(document).ready(function(){
  // use this hash to cache search results
  $.each(obj, function(){
    names.push(this.name);
  });

  $('#name').typeahead({
    source: names
  });
});
