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

  var getData = new Vue({
    
    el: "#showData",
    
    data: {

      result: "",
      img: "",
      ingredients: [],
      cookingSteps: "",
      responseAvailable: "false"
     },
     

     methods: {
 
      GetRandomRecipes(){

         this.responseAvailable = false;
        
          
           const url= `https://cors.bridged.cc/https://handla.api.ica.se/api/recipes/random?numberofrecipes=1`;
          
           fetch(url)
           .then((resp)=> {
            if(resp.ok){
              return resp.json();
            }
            else{
              alert("Server returned " + response.status + " : " + response.statusText);
                }                
          })

          .then(resp =>{

              this.result = resp.Recipes[0];
              this.img = resp.Recipes[0].ImageUrl;
              this.ingredients = [];
              this.cookingSteps = resp.Recipes[0].CookingSteps;
              for (let index = 0; index <resp.Recipes[0].IngredientGroups[0].Ingredients.length; index++) {
                this.ingredients.push(resp.Recipes[0].IngredientGroups[0].Ingredients[index].Text)
              }
              this.responseAvailable = true;
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
       }
     },

   })

 



    /* =================================================================== Get recepi ends ==================================================================== */