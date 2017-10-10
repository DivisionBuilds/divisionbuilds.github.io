---
---
$(document).ready(function() {
     $(".search").on("keyup change", function() {
          var v = new RegExp("^(?=.*" + $(this).val().toLowerCase().replace(/ /g, ")(?=.*") + ").*$");
          $(".build-list .list-item").each(function() {
               if (v.test($(this).find(".title, .author, .tag").text().toLowerCase()))
                    $(this).css({display: ""});
               else
                    $(this).hide();
          });
          $(".build-list").each(function() {
			if ($(this).children(':visible').length === 0)
          		$(this).prev().hide();
          	else
          		$(this).prev().css({display: ""});
          });
     });
     $(".banner .close").click(function() {
          $(this).parents('.banner').remove();
     });
});