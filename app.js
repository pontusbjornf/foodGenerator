/* =================================================================== DATABASE  ==================================================================== */

  
  
  
  
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

$("#topFuction").click(function () {
  $("html, body").animate({
    scrollTop: 0
  }, 1000)
})


  /* =================================================================== Jqurey Menu ends ==================================================================== */
  window.addEventListener('load', (event) => {
    getData.GetData(1);
  });
  /* =================================================================== Get recepie ==================================================================== */

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
        let url= ``;
       var prevInput;
       const numberOfRecipes = 1250;
       if(input == null){
         input = this.prevInput;
       }
       url ='/RandomRecipe.json';
       this.prevInput = input;

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
          if(this.prevInput==2) //input är under 30 minuter
          {
            var isUnder30Min = false;
            while (!isUnder30Min) {
              var random =  Math.floor(Math.random() * numberOfRecipes);
           
              if(resp.Recipes[random].CookingTime == "Under 30 minuter"){
                this.GetRandomRecipes(resp.Recipes[random]);
                isUnder30Min = true;
              }
            }
          }
          else if(this.prevInput == 3) //input är vegetarisk
          {

            var isVegetarianRecipe = false;
            while(!isVegetarianRecipe){
              
              var random =  Math.floor(Math.random() * numberOfRecipes);

              resp.Recipes[random].MdsaCategories.forEach(element => {
                
                if(element == "Vegetarisk"){
                  this.GetRandomRecipes(resp.Recipes[random]);
                  isVegetarianRecipe = true;
                }
              });
            } 
          }
          else {
         
            var random =  Math.floor(Math.random() * numberOfRecipes);
            
            this.GetRandomRecipes(resp.Recipes[random]);
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
    


       GetRandomRecipes(data){
              console.log(data)
              this.result = data;
              this.img = data.ImageUrl;
              this.ingredients = [];
              this.cookingSteps = data.CookingSteps;
         
            

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

   Vue.component('popUpLogIn', {
   created(){
    this.$root.$refs.showitems = this;
  },
  updated(){
    this.$root.$refs.showitems = this;
  },
   
data: function(){
  return {
     email: "",
     fullName:"",
     recipes: []
    
  }
},

template:
'<div>'+
' <div class="center">'+
'<input type="checkbox" id="show">'+
'<label for="show" class="show-btn">View Form</label>'+
'<div class="contanThis">'+
   '<label for="show" class="close-btn fas fa-times" title="close"></label>'+
   '<div class="text">Login Form</div>'+
   '<form action="#" class="formStyle">'+
    '<div class="data">'+
         '<label>Email or Phone</label>'+
         '<input type="text" required>'+
     '</div>'+
      '<div class="data">'+
         '<label>Password</label>'+
         '<input type="password" required>'+
      '</div>'+
      '<div class="forgot-pass">'+
         '<a href="#">Forgot Password?</a>'+
      '</div>'+
      '<div class="btn">'+
         '<div class="inner"></div>'+
         '<button type="submit">login</button>'+
      '</div>'+
      '<div class="signup-link">Not a member? <a href="#">Signup now</a>'+
      '</div>'+
   '</form>'+
'</div>'+
'</div>'+
'</div>'
})
  