// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // 1) Check the Typeof passed in Object (e.g., function, object, array, string, null etc)
  // 2) if it's function or undefined then skip (e.g., simple return of string)
  // 3) If it's anything other than Object/Array (e.g., number, string, null) immediately converto to String
  // 4) If it's an array, iterate through array, for each element, recursively call function for each element bounded by appropriate open bracket and commas
  // 5) IF it's an object use simillar approach as array (iterate through object elements) and recursively call function

  var jsonString = ""; 

  function recursiveStringifyJSON(obj){

    //do nothing in these cases
  	if (typeof obj === "function" || typeof obj === "undefined"){
  		return; 
  	} 

    //if obj is non-string primitive type or null, convert to string and add to jsonString variable
  	if (typeof obj === "number" || typeof obj === "boolean" || obj === null){
      jsonString+=String(obj);
  		return;
  	}

  	//if obj is a string, add quotes and add to jsonString variable
    if (typeof obj === "string"){
      jsonString+="\""+ obj + "\""; 
  		return;
  	}

  	//if obj is an array, add brackets and iterate through array; recursively call function for each element in array
    if (Array.isArray(obj)){
    	
    	jsonString+="[";
    	//iterate through each array element and recursively call function on element (excl. last element which will not need a ',' but a ']' instead)
      for (var i=0; i<obj.length-1;i++){
       recursiveStringifyJSON(obj[i]);
       jsonString+=","
      }
      //add last element of array
      recursiveStringifyJSON(obj[obj.length-1]);

      jsonString+="]";
  	} 

    //if obj is an object (not array), add curly bracket and iterate through object keys; recursively call function for each value in object
    if (Array.isArray(obj) === false){
      jsonString+="{";

      //iterate through keys of object addiong keys as string and recursively calling on function for each value of keys
      for (var keys in obj){

       //Ensure that objects do NOT contain a function nor are undefined
       if (typeof obj[keys] !== "function" && typeof obj[keys] !== "undefined"){
	       jsonString+= "\"" + keys + "\":";

	       recursiveStringifyJSON(obj[keys]); //recursive call for values of object

	       if (keys !== Object.keys(obj)[Object.keys(obj).length-1]){
	       	jsonString+=","; //add comma as long as its NOT the last property in obj
         }
       }
      }

      jsonString+="}"; //close obj curly brace

    }

  }

  recursiveStringifyJSON(obj); //Initial recursive function call in main body

  return jsonString;

};
