$(document).ready(function() {
     $.ajax({
          url: "https://api.github.com/repos/Zerthox/zerthox.github.io/contents/division/builds",
          success: function(result) {
               for (i = 0; i < result.length; i++) {
                    var n = result[i].name;
                    if (n.slice(-5) === ".json") {
                         $.ajax({
                         url: "https://raw.githubusercontent.com/Zerthox/zerthox.github.io/master/division/builds/" + n,
                         success: function(result) {
                              var u = this.url.split("/");
                              $(".build-list").append('<a href="build?id=' + u[u.length - 1].slice(0, -5) + '"></a>');
                              var r = JSON.parse(result);
                              var s = '<div class="list-item"><div class="title">' + r.title + '</div><div class="info">';
                              if (r.hasOwnProperty("author"))
                                   s += 'Author: <a href="' + r.link + '" target="_blank"><span class="author">' + r.author + '</span></a>';
                              else
                                   s += 'Author: <i>Unknown</i>';
                              if (r.hasOwnProperty("date"))
                                   s += '<span class="date">Last updated: ' + r.date + '</span>';
                              s += '</div>';
                              if (r.hasOwnProperty("tags")) {
                                   s += '<div class="tags">'
                                   for (i = 0; i < r.tags.length; i++) {
                                        s += '<span class="tag">' + r.tags[i] + '</span>';
                                   }
                                   s += '</div>';
                              }
                              s += '</div>';
                              $(".build-list > a:last").html(s);
                              }
                         });
                    }
               }
          }
     });
     $(".search").on("keyup", function() {
          var v = new RegExp("^(?=.*" + $(this).val().toLowerCase().replace(/ /g, ")(?=.*") + ").*$");
          $(".build-list .list-item").each(function() {
               if (v.test($(this).find(".title, .author, .tag").text().toLowerCase()))
                    $(this).css({display: ""});
               else
                    $(this).hide();
          });
     });
});
