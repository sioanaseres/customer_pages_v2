'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////
// Sort & filter

const customers = {
  data:[
    {
      name: "Allianz",
      industry: "Audit",
      country: "Germany",
      relevance: 7,
      image:"img/Allianz.png"
    },
    {
      name: "Deloitte",
      industry: "Banking",
      country: "UK",
      relevance: 7,
      image:"img/Deloitte.png"
    },
    {
      name: "Cathay United Bank",
      industry: "Banking",
      country: "China",
      relevance: 1,
      image:"img/Cathayunitedbank.png"
    },
    {
      name: "Intel",
      industry: "Technology",
      country: "USA",
      relevance: 10,
      image:"img/Intel.png"
    },
    {
      name: "Yale University",
      industry: "Education",
      country: "USA",
      relevance: 10,
      image:"img/Yale.png"
    },
    {
      name: "Orange",
      industry: "Technology",
      country: "France",
      relevance: 9,
      image:"img/Orange.png"
    },
    {
      name: "Johnson & Johnson",
      industry: "Healthcare",
      country: "UK",
      relevance: 8,
      image:"img/Johnson.png"
    },
    {
      name: "Vodafone",
      industry: "Technology",
      country: "UK",
      relevance: 9,
      image:"img/Vodafone.png"
    },
    {
      name: "Accenture",
      industry: "Audit",
      country: "UK",
      relevance: 7,
      image:"img/Accenture.png"
    },
    {
      name: "U.S. Department of Commerce",
      industry: "Government",
      country: "USA",
      relevance: 10,
      image:"img/USDepartment.png"
    },
  ]
}

// Display Cards 
const containerCards = document.querySelector('#customers');
const displayCards = function(card, sort = false){
containerCards.innerHTML=""

card.forEach(element=>{


   const html= `
  <div class="card ${element.country} ${element.industry}">
  <div class="image-container"><img src = "${element.image}" alt = "Card" ></div>
  <div class="customer-container">
  <h3>${element.name}</h3>
  <h3> ${element.industry}</h3>
  </div>
  </div>`
  containerCards.insertAdjacentHTML("afterbegin", html)

  
})}
displayCards(customers.data, false)

// Sort 
const btnSortRelevance = document.getElementById("relevance");

let asc = false;

btnSortRelevance.addEventListener("click", function(){
  console.log(customers.data)
  let arrayClients = sortArrayBy (customers.data, "relevance", asc);
  displayCards(arrayClients);
  btnSortRelevance.classList.add("active");
  btnSortAlphabetical.classList.remove("active");
  asc = !asc;
 

})

const btnSortAlphabetical = document.getElementById("alphabetical");
btnSortAlphabetical.addEventListener("click", function(){
  let arrayClients = sortArrayBy (customers.data, "name", asc);
  displayCards(arrayClients);
  btnSortAlphabetical.classList.add("active");
  btnSortRelevance.classList.remove("active");
  asc = !asc;
 

})

function sortArrayBy (arr, sort, asc) {
arr.sort(function(a,b) {
  if(a[sort] < b[sort ]) return 1;
  if(a[sort] > b[sort ]) return -1;
  return 0;
})

if(asc) arr.reverse()

return arr
}

// Filter 
const filterClient = function(value){
  const buttonValue = document.querySelectorAll(".button-value");

   buttonValue.forEach((button) =>{
  
    if(value.toUpperCase() === button.innerText.toUpperCase()){
      button.classList.add("active")
    } else{
      button.classList.remove("active");
    }
    });
    const elements = document.querySelectorAll(".card");
   
    elements.forEach(element =>{
     
      if(value === "All"){
            element.classList.remove("hide");
      } else {
        if(element.classList.contains(value)){
          element.classList.remove("hide");
          
        } else {
          element.classList.add("hide")
        }
      }
    })
}



window.onload = () => {
  filterClient("All")
}


///////////////////////////////////////
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

////////////////////////////////////////
// Read more
const more = document.querySelector(".more");
const slideDiv = document.querySelector(".slider");
const slideFirst = document.querySelector(".slide__first");
const testimonialLarge = document.querySelector(".testimonial__first");
const less = document.querySelector(".less"); 

more.addEventListener("click", function(e) {
e.preventDefault();
slideDiv.classList.add("active__read");
slideFirst.style.height = "100rem";
testimonialLarge.style.maxHeight = "200rem";
})

less.addEventListener("click", function(e) {
e.preventDefault();
slideDiv.classList.remove("active__read");
slideFirst.style.height = "50rem";
testimonialLarge.style.maxHeight = "22rem";
})


///////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

