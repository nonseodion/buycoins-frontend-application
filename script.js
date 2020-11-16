const bigNav = document.querySelector(".lower-navigation-lg");
const smallNav = document.querySelector(".lower-navigation-sm");

//toggle nav
document.querySelector(".header__left button")
  .addEventListener("click", 
    () => document.querySelector(".upper-navigation-sm").classList.toggle("show-upper-navigation-sm")
  );

//fix large inner nav
function throttle (callback, limit) {
  var waiting = false;                     
  return function () {                      
      if (!waiting) {                       
          callback.apply(this, arguments);  
          waiting = true;                   
          setTimeout(function () {          
              waiting = false;              
          }, limit);
      }
  }
}

const fixTopNav = (nav, newClass) => {
  
  if(nav.previousElementSibling.getBoundingClientRect().bottom <= 0){
    nav.classList.add(newClass);
    nav.nextElementSibling.style.marginTop = window.getComputedStyle(nav).height;
    if(document.querySelector(".content__profile-pic img").getBoundingClientRect().bottom 
      <= 0
    ){
      document.querySelector(".lower-navigation-lg .profile")
        .classList.add("profile--show");
    }
    else{
      document.querySelector(".lower-navigation-lg .profile")
      .classList.remove("profile--show");
    }
  }
  else{
    nav.classList.remove(newClass);
    nav.nextElementSibling.style.marginTop = "";
    document.querySelector(".lower-navigation-lg .profile")
      .classList.remove("profile--show");
  }
}

const fixBottomNav = (nav, newClass) =>{
  
  if(nav.parentElement.getBoundingClientRect().top 
    <= 0
  ){
    nav.classList.add(newClass);
    nav.nextElementSibling.style.marginTop = window.getComputedStyle(nav).height;
  }
  else{
    nav.classList.remove(newClass);
    nav.nextElementSibling.style.marginTop = "";
  }
}

document.addEventListener("scroll", (event) => {
  throttle(fixTopNav, 100)(bigNav, "lower-navigation-lg--fixed");
});

document.addEventListener("scroll", (event) => {
  throttle(fixBottomNav, 100)(smallNav, "lower-navigation-lg--fixed");
});