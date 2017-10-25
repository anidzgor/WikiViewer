$(document).ready(function(){
    $("#icon").click(function() {
		$("#icon").fadeTo("slow", 0.2);
		$(".search-box").fadeIn(1000);
		icon.disabled = true;
	});

	document.getElementById("mySearch").addEventListener("search", findArticules);
	function findArticules() {
		var icon = document.getElementById("icon");
		if (icon != null)
			icon.parentNode.removeChild(icon);

      console.log($("#mainContent").children().length);
      var countChild = $("#mainContent").children().length;
      if(countChild > 10) {
        var child = $("#mainContent").children("a[id^=blok]");
          $(child).each(function(index, item) {
            var elem = $(item).attr('id');
            $(this).remove();
          });
      }


         $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&titles=" + $("#mySearch").val() + "&generator=search&exchars=500&exlimit=max&exintro=1&explaintext=1&inprop=url&gsrsearch=" + $("#mySearch").val() + "&gsrlimit=10&callback=?", function(data) {
            $.each(data.query.pages, function(index, value) {

                  var element = document.createElement('div');
                  element.id = "blokDiv";
              		element.style.width = '100%';
              		element.style.height = '150px';
                  element.style.margin = "10px";
                  element.style.padding = "20px";
              		element.style.background = '#FFFFFF';
                  element.innerHTML = value.extract;
                  element.style.boxShadow = "5px 5px 5px black";
                  element.style.borderRadius = "20px";

                  var link = document.createElement('a');
                  link.id = "blok";
                  link.setAttribute('href', value.fullurl);
                  link.setAttribute('target', '_blank');
                  link.style.textDecoration = 'none';

              		var parent = document.getElementById("mainContent");
              		parent.appendChild(link);
                  link.appendChild(element);
           });
         });
	}
});
