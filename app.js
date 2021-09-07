// var vueApplication = new Vue({
//     el: "#app_basic",
//     data: {
//       message: `🐵 Hello World ${new Date().toLocaleString()}🔮`,
//     },
//   })
  /* =================================================================== Jqurey Menu ==================================================================== */
  $(function() {
    $('body').addClass('js');
  
    var $hamburger = $('.hamburger'),
        $nav = $('#site-nav'),
        $masthead = $('#masthead');
  
    $hamburger.click(function() {
      $(this).toggleClass('is-active');
      $nav.toggleClass('is-active');
      $masthead.toggleClass('is-active');
      return false; 
    })
});
  /* =================================================================== Jqurey Menu ends ==================================================================== */
  /* =================================================================== Get recepi ==================================================================== */


  function GetRandomRecipes(){
   
      
      const url= `https://cors.bridged.cc/https://handla.api.ica.se/api/recipes/random?numberofrecipes=1`;
      fetch(url)
      .then((resp)=>resp.json())
      .then(function(data){
        console.log("WORKING")
        
      console.log(data.Recipes)
        
      })
          .catch(error => {
              if (typeof error.json === "function") {
                  error.json().then(jsonError => {
                      console.log("Json error from API");
                      console.log(jsonError);
                  }).catch(genericError => {
                      console.log("Generic error from API");
                      console.log(error.statusText);
                  });
              } else {
                  console.log("Fetch error");
                  console.log(error);
              }
          })
  };







    /* =================================================================== Get recepi ends ==================================================================== */