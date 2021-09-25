
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

  var category = 0;
  var url1 ="";

  var getData = new Vue({
        
    el: "#showData",
    
    data: {

      result: "",
      img: "",
      ingredients: [],
      cookingSteps: [],
      totalingredients:"",
      difficulty:"",
      time:"",
      portions:"",
      responseAvailable: "false"
      
      
     },
     

     methods: {
   
       GetData(input){
        category = input;
        let url= ``;
         if(input == null){
            url = `https://cors.bridged.cc/https://handla.api.ica.se/api/recipes/random?numberofrecipes=1`;
          
         }
         else if(input == 1){
            url = url1;
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
         const btn = document.querySelector("#refresh");
          console.log("WORKING")
          btn.classList.add("button--loading");
          if(category==1)
          {
            console.log(resp)
  
            this.GetRandomRecipes(resp);
            
          }
          else {
            this.GetRandomRecipes(resp.Recipes[0]);
          }

          btn.classList.remove("button--loading");
        
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
      GetData1(){
        
        let url= ``;
      
            url = `Under30.json`;
         
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
        const btn = document.querySelector("#refresh");
      
        btn.classList.add("button--loading");
       

      
        var random =  Math.floor(Math.random() * 40);
        url1 = `https://cors.bridged.cc/https://handla.api.ica.se/api/recipes/recipe/${resp.Recipes[random].Id}`;
        console.log(url1)
        this.GetData(1);
        btn.classList.remove("button--loading");
        
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

              this.result = data;
              this.img = data.ImageUrl;
              this.ingredients = [];
              this.cookingSteps = data.CookingSteps;
              //----------------------------------------Skrivet ut undefined
            

              this.difficulty = `${data.Difficulty}`;
              
              this.time = `${data.CookingTime} `;
              this.portions =`${data.Portions} portioner `;
              

             //fixar till texten
             this.CleanUpText(data.CookingSteps.length, this.cookingSteps);
         

              let counter = data.IngredientGroups.length;
              this.totalingredients = counter;
              console.log(counter);
              let number= 0;
              let numbers= 0;
              while(number<counter)
              {
                for (let index = 0; index <data.IngredientGroups[number].Ingredients.length; index++) {
                  this.ingredients.push(data.IngredientGroups[number].Ingredients[index].Text)
                  numbers++;
                  
                }
                number++;
              }
              this.totalingredients = `${numbers} ingredienser`;
              
       },


       GetId(url){




       },

       CleanUpText(arrayLenght, arrayContent){
        for (let index = 0; index < arrayLenght; index++) {
                  
          var cleanText = arrayContent[index].replaceAll("&aring;", "å")
          cleanText = cleanText.replaceAll("&auml;", "ä");
          cleanText = cleanText.replaceAll( "&ouml;", "ö");
          cleanText= cleanText.replaceAll("&Aring;", "Å");
          cleanText = cleanText.replaceAll("&Auml;", "Ä");
          cleanText = cleanText.replaceAll("&Ouml;","Ö");
          cleanText=cleanText.replaceAll("&eacute;","è")
          cleanText=cleanText.replaceAll("<strong>","")
          cleanText=cleanText.replaceAll("</strong>","")
          cleanText=cleanText.replaceAll("&deg;","°")
          cleanText=cleanText.replaceAll("&ordm;","°")
          cleanText=cleanText.replaceAll("&egrave;","è")
          cleanText=cleanText.replaceAll("&ndash;","/")
          cleanText=cleanText.replaceAll("&nbsp;"," ")

         arrayContent[index] = `${index +1 }. ${cleanText} `;
           
        }
        return arrayContent;
       },

      }

   })

 



    /* =================================================================== Get recepi ends ==================================================================== */
    