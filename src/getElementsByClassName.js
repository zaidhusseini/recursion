// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // 1) Start from Top of DOM/current Element and loop through element's children
  // 2) Check if current Element Class List has a value (e.g., NOT undefined)
  // 3) If value exists, check if Value === 'className', if matches add to array of Nodes that Match className
  // 4) If className does NOT match, check 	if Node has children, if it does, recursively call function and go down DOM tree element, repeating loop to check if class Name exists
  // 5) If loop is complete exit recurisive call/function  and return array of nodes with className 
  var arrayOfNodes = [];
  var element = document.body;

  function convertToArray(nodes){
    return Array.prototype.slice.apply(nodes);
  }

  if (convertToArray(element.classList).indexOf(className) !== -1) {
    arrayOfNodes.push(element);
  }

  function recursiveElementsByClassName(element, className){
    
    for (var i=0; i<element.childNodes.length; i++){

    	if (element.childNodes[i].classList !== undefined){
    		if(convertToArray(element.childNodes[i].classList).indexOf(className) !== -1){
    			arrayOfNodes.push(element.childNodes[i]); //if class Name found, add node with class name to array
    		}	
    	}

    	if (element.childNodes[i].hasChildNodes()){
    		recursiveElementsByClassName(element.childNodes[i],className); //recursive call on child nodes of current node
    	}

    }

    return ; // Base Case: once loop is complete exit recursive call

  }

  recursiveElementsByClassName(element, className);

  return arrayOfNodes;


};
