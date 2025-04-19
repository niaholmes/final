const enter = document.getElementById("enter")

enter.addEventListener("click", async function(){
    let goBack = document.getElementById("go-back");
    goBack.style.display = "block";

    console.log("successful")
    const userInput = document.getElementById("search-box");
    let url = "https://www.omdbapi.com/?apikey=3bdcfb65&s=" + userInput.value;
    console.log(url);
    try{
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        console.log(json);

        // displaying results

        for(let i = 0; i < json.Search.length; i++){
            console.log(json.Search[i])
            
            let theResults = document.getElementById("results");
            let newLi = document.createElement("li");
            let newPara = document.createElement("p");
            let newDiv = document.createElement("div");
            // let newBtn = document.createElement("button");
    
            theResults.appendChild(newLi);
            newLi.appendChild(newPara);
            newLi.appendChild(newDiv);
            // newLi.appendChild(newBtn);

            // newBtn.innerText = "Show More";

            let hidden = document.getElementById("hidden-para");

            hidden.innerHTML = "Here are the results for \"" + userInput.value + "\"";

            hidden.style.display = "block";
            hidden.style.textAlign = "center";

            let hidden2 = document.getElementById("hid-txt");

            hidden2.style.display = "block";
            hidden2.style.textAlign = "center";

            
            newPara.innerText = json.Search[i]["Title"];

            newPara.addEventListener("click", async function () {
                console.log("successful")
                try {
                    const movieId = json.Search[i]["imdbID"];
                    let url = "https://www.omdbapi.com/?apikey=56f156a5&i=" + movieId;
                    console.log(url);
            
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }
            
                    const movieData = await response.json();
                    console.log(movieData);

                    // let info = movieData.value;
                    // newDiv.innerText = info;

                    hidden.style.display = "none";

                    hidden2.style.display = "none";

                    let specificInfo1 = document.getElementById("one");

                    let specificInfo2 = document.getElementById("two");

                    let specificInfo3 = document.getElementById("three");

                    let specificInfo4 = document.getElementById("four");

                    let theList = document.getElementById("results");
                    theList.style.display = "none";

                    let info1 = "Released: " + movieData.Released + "\n" +
                    "Type: " + movieData.Type + "\n" +
                    "Runtime: " + movieData.Runtime + "\n" +
                    "Available Languages: " + movieData.Language;

                    let info2 = "Main Actors: " + movieData.Actors + "\n" +
                    "Director(s): " + movieData.Director + "\n" +
                    "Writer(s): " + movieData.Writer;

                    let info3 = "Genre: " + movieData.Genre + "\n" +
                    "Rated: " + movieData.Rated + "\n" +
                    "IMDb's Rating: " + movieData.imdbRating + "\n" +
                    "Awards: " + movieData.Awards;
                    
                    let info4 = "Plot: " + movieData.Plot;

                    specificInfo1.classList.add("reveal-box");
                    specificInfo2.classList.add("reveal-box");
                    specificInfo3.classList.add("reveal-box");
                    specificInfo4.classList.add("reveal-box");

         
                    specificInfo1.innerText = info1;

                    specificInfo2.innerText = info2;

                    specificInfo3.innerText = info3;

                    specificInfo4.innerText = info4;
         

                

                } catch (error) {
                    console.error(error);
                    document.querySelector("#results").innerText =
                        "We are sorry. We could not find information on your input.";
                }

            });
        };
        
    }
    catch{
        document.querySelector("#results").innerText = "We are sorry. We could not find information on your input."
    };
});


const goBackBtn = document.getElementById("go-back");

goBackBtn.addEventListener("click", function(){
    setTimeout(function () {
        location.reload();
      }, 300);
});