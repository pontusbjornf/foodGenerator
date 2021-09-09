
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
  window.addEventListener('load', (event) => {
    getData.GetRandomRecipes();
  });
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
             console.log("WORKING")
             const btn = document.querySelector("#refresh");
             btn.classList.add("button--loading");
             
             console.log(resp.Recipes)
              this.result = resp.Recipes[0];
              this.img = resp.Recipes[0].ImageUrl;
              this.ingredients = [];
              this.cookingSteps = resp.Recipes[0].CookingSteps;
              //Fixa array=> ibland är det 3 olika därför skrivs ej allt ut
              for (let index = 0; index <resp.Recipes[0].IngredientGroups[0].Ingredients.length; index++) {
                this.ingredients.push(resp.Recipes[0].IngredientGroups[0].Ingredients[index].Text)
                
              }
             
              btn.classList.remove("button--loading");
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
    