
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
    getData.GetData();
  });
  /* =================================================================== Get recepi ==================================================================== */




  var getData = new Vue({
    
    el: "#showData",
    
    data: {

      result: "",
      img: "",
      ingredients: [],
      cookingSteps: [],
      responseAvailable: "false"
     },
     

     methods: {
       GetData(input){
        let url= ``;
         if(input == null){
          url = `https://cors.bridged.cc/https://handla.api.ica.se/api/recipes/random?numberofrecipes=1`
         }
         else if(input == 1){
            url = `https://cors.bridged.cc/https://handla.api.ica.se/api/recipes/searchwithfilters?recordsPerPage=40&pageNumber=1&phrase=under-30-minuter&sorting=0`
         }
       
        fetch(url)
           .then((resp)=> {
            if(resp.ok){
              return resp.json();
            }
            else{
              alert("Server returned " + response.status + " : " + response.statusText);
                }                
          })

       .then((resp) =>{
          console.log("WORKING")
     
          this.GetRandomRecipes(resp.Recipes[0])
        
        })
        .catch((error) => {
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
       
      },


       GetRandomRecipes(data){
             
             const btn = document.querySelector("#refresh");
             btn.classList.add("button--loading");
             
              this.result = data;
              this.img = data.ImageUrl;
              this.ingredients = [];
              this.cookingSteps = data.CookingSteps;

             //fixar till texten
             this.CleanUpText(data.CookingSteps.length, this.cookingSteps);
         

              let counter =data.IngredientGroups.length;
              console.log(counter);
              let number= 0;
              while(number<counter)
              {
                for (let index = 0; index <data.IngredientGroups[number].Ingredients.length; index++) {
                  this.ingredients.push(data.IngredientGroups[number].Ingredients[index].Text)

                }
                number++;
              }
              btn.classList.remove("button--loading");
       },



       GetCategoryRecipes(data){




       },

       CleanUpText(arrayLenght, arrayContent){
        for (let index = 0; index < arrayLenght; index++) {
                  
          var cleanText = arrayContent[index].replaceAll("&aring;", "å")
          cleanText = cleanText.replaceAll("&auml;", "ä");
          cleanText = cleanText.replaceAll( "&ouml;", "ö");
          cleanText= cleanText.replaceAll("&Aring;", "Å");
          cleanText = cleanText.replaceAll("&Auml;", "Ä");
          cleanText = cleanText.replaceAll("&Ouml;","Ö");

         arrayContent[index] = `${index +1 }. ${cleanText} `;
           
        }
        return arrayContent;
       },

     

     
      }

   })

 



    /* =================================================================== Get recepi ends ==================================================================== */
    