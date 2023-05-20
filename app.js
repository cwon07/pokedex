
// const pokemon = [
//     { slot: 1,  type: {name:  "grass", url: "https://pokeapi.co/api/v2/type/12/"}},
//     { slot: 2,  type: {name: "poison", url: "https://pokeapi.co/api/v2/type/4/"}},
//  ];

//  const newPoke = pokemon.map(item => item.type.name);
 
//  console.log(newPoke)
// ////////////////////// the same as below //////////////////////////

//  console.log(
//     [
//     { slot: 1,  type: {name:  "grass", url: "https://pokeapi.co/api/v2/type/12/"}},
//     { slot: 2,  type: {name: "poison", url: "https://pokeapi.co/api/v2/type/4/"}},
//  ].map(v => v.type.name)
//  );

//  let x = []

const $searchForm = $("form");

$searchForm.on("submit", event => {
    event.preventDefault();
    console.log(event.target);
    const formData = new FormData(event.target);
    // generate data from the target object
    console.log(formData);
    // get the value from the generated data where the namevalue is "pokemon" (on the form)
    // toLowerCase allows items to be searched regardless of alphabet casing
    const pokemon = formData.get("pokemon").toLowerCase();
    console.log(formData.get('pokemon'));
    
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

    console.log(url)

    ////// fetch using AJAX ///////
    // $.ajax(url)
    //     .then(response => console.log(response))
    ///// fetch using JSON ///////
    const $screen = $(".screen")
    const $result = $(".result")

    // empty out the input field
    $('[name="pokemon"]')[0].value = "";
    $screen.empty(); // empties the image from the screen
    $result.html('<div>Loading...</div>') // loading comment 

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            $screen.html(
                `<img src=${data.sprites.front_default} alt=${data.name}>`
            );
            $result.html(
                `<div>
                    <b>name:&nbsp; </b> ${data.name}
                </div>
                <div>
                    <b>id :&nbsp; </b> ${data.id}
                </div>
                <div>
                    <b>weight:&nbsp; </b> ${data.weight}
                </div>
                <div>
                    <b>type:&nbsp; </b> ${data.types.map(v => v.type.name)}
                </div>
            `)
        })
        .catch(() => {
            $result.html(`<div> there was an error...</div>`)
        })
});