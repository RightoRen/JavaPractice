// Defining our const variables this is always first

const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
// making an array of carousel children which as the LI elements
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft;

//get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

//insert copies of the last few cards to beginning of carousel thus creating an infinite scroll
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
})
//insert copies of the first few cards to end of carousel thus creating an infinite scroll
carouselChildrens.slice(0, cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
})

// Declaring functions
// Defining the dragging function here
// JavaScript methods are actions that can be performed on objects =>

function dragStart(e) {
    isDragging = true;
    // classList.add adds a new class to your html while doing the event
    carousel.classList.add("dragging");


    // This is storing the X coordinate of the carousel when first clicked
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // e.pageX returns the horizontal coordinate of the mouse pointer
    if(!isDragging) return; // if isDragging is false return from here
    
    // scrollLeft sets or returns the number of pixels, an elements content is scrolled horizontally
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};


// When the dragging stops we remove the dragging class
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging"); 
}

const infiniteScroll = () => {
    // if carousel is at the start scroll to end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } 
        // if carousel is at the end scroll to start
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
}


// Making a listener so that when the mouse drags the pictures left or right it will slide correctly, this is always last
// In this case the function is actually dragging, mouse move is just the descriptor used
// Always defining the second thing in the event listener

//EvenListener for left and right arrows
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // console.log(btn.id);
        // three equal signs means the type and value must be equal
        // the ? condition is used to shorten the if...else statement into one line of code(basically a shortcut)
       // if the button is clicked left subtract first card width if not add to it
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
});

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

