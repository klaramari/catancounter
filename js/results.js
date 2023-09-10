




export function toggleResults(){
    if (showresults == 0){
        showresults = 1;
        let results = document.querySelector(".results");
        
        let result = document.createElement("div");
        result.innerText = numbers;
        results.appendChild(result)
    }
    else {
        showresults = 0;
        let results = document.querySelector(".results");
        results.removeChild();
    }

    
}
   