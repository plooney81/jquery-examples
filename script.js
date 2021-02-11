$(document).ready(() => {
    //! Part 1
    //? Targeting Elements by id
        //* Old way
        const jokeButton = document.querySelector('#jokeButton');
        //* jQuery way
        const $jokeButton = $('#jokeButton');

    //? Targeting Elements by class
        //* Old way
        const items = document.querySelector('.item');
        //* jQuery way
        const $items = $('.item');
    
    //? Creating new elements 
        //* Old way
        const newButton = document.createElement('button');
        //* jQuery way
        const $newButton = $('<button>');
    
    //? Adding properties to the elements
        //* Old way
        newButton.setAttribute('type', 'submit');
        newButton.innerText = "Click Me";

        //* jQuery way 1
        const $newButton2 = $('<button type="submit">Click Me</button>')
        //* jQuery way 2
        const $newButton3 = $('<button>', {
            type: 'submit',
            text: 'Click Me',
        })

    //? Adding styling to the elements
        //* js way
        newButton.style.color = "blue";
        //* jQuery way
        $newButton3.css({
            "color": "blue"
        })
    
    //? Adding the elements to the page
        //* Js way
        // document.querySelector('body').appendChild(newButton);
        //* jQuery way
        // $(document.body).append($newButton3);


    //! Part 2
    
    //? Ajax request that was moved into a function to show promise chaining
    //? and how to call functions that return promises
    const getJoke = () => {
        return $.ajax({
            url: 'https://icanhazdadjoke.com/',
            headers: {
                Accept: 'application/json'
            }
        })
            .then(res => {
                return res.joke
            })
            .catch(e => {
                return "There was an error " + e
            })
    }

    //? Another ajax request function
    const searchJoke = (term) => {
        return $.ajax({
            url: 'https://icanhazdadjoke.com/search?term=' + term,
            headers: {
                Accept: 'application/json'        
            }
        }).then(res => {
            return res.results.map(result => result.joke)
        }).catch(err => {
            console.log(err);
            return 'There was an error making the reqeuest';
        });
    }

    //* Basics
    const $container = $('<div>', {class: 'container'});
    const $h1 = $('<h1>', {text: 'Dad Jokes'});
    
    $(document.body).append($container);
    $container.append($h1);

    $h1.css({
        "color": "red",
        "text-decoration": "underline",
    })

    $h1.on('click', () => {
        $h1.toggleClass('active');
    })

    //* Getting a joke and adding it to the page
    const $jokeButton2 = $("<button>Click for lolz</button>");
    const $iHazJoke = $('<h3>');
    $container.append($jokeButton2)
    $jokeButton2.on('click', () => {
        getJoke()
            .then(joke => {
                $iHazJoke.appendTo($container).hide().text(joke).fadeIn();
            })
    })

    //* Form handling
    const $jokeForm = $('<form>');
    const $jokeInput = $('<input>', {placeHolder: "Enter Search Term"});
    const $submitButton = $('<button type="submit">Search</button>');
    $jokeForm.css({
        "margin-top": "20px"
    })

    //chain block
    $jokeForm
    .append($jokeInput)
    .append($submitButton)
    .appendTo($container)
    .on('submit', (e) => {
        e.preventDefault();
        searchJoke($jokeInput.val())
            .then(jokesArray => {
                console.log(jokesArray)
                //* works like an array method...so we can give it a function
                //* and then we it will run the function for each of the elements in the array
                $(jokesArray).each( (index, joke) => {
                    $('<h3>').appendTo($container).hide().text(joke).fadeIn()
                })
            })
    })
})