const fs = require('fs');
// Taking the following EDIFACT message text, write some code to parse out the all the LOC segments 
// and populate an array with the 2nd and 3rd element of each segment.  

// Note:  the ‘+’ is an element delimiter
let final_elements = [];

try {  
    // Text file setup and conversion to array
    const data = fs.readFileSync('EDIFACT.txt', 'utf8');
    const content = data.toString().split('\'');
    // Looping array
    for(i in content){
        // If curr element contans LOC
        if(content[i].includes("LOC")){
            // Split on delimiter ‘+’
            const LOC_DATA = content[i].split('+');
            // Add 2nd and 3rd element to final array
            final_elements.push([LOC_DATA[1], LOC_DATA[2].trim()]); 
        }
    }
    // Print final array
    console.log(final_elements);
} catch(error) {
    continue;
}