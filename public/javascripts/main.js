$(window).scroll(function(){
    if($("#nav-bar").scrollTop() == 0 && $("#nav-bar").css("opacity") != 1 ){
      $("#nav-bar").css("opacity", 0.5);
    }else if( $("#nav-bar").scrollTop() != 0 && $("#nav-bar").css("opacity") != 0.5 ){
      $( "#nav-bar" ).css("opacity", 1);
    }

});