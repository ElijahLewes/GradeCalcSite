//Placeholder variables
let courses = [];
var activeCourse;
var activeAssignmentType;
let assignmentTypes = [];
var activeAssignment;
var assignments = [];

//----------------Class break down-----------------------//

//Parent class with courseCode as PK
class Course {
    constructor(courseCode, assignmentTypes, assignments, finalGrade) {
        this.courseCode = courseCode;
        // Array of objects defining assignment types with associated weights
        this.assignmentTypes = assignmentTypes || []; // Default to an empty array if not provided
        this.assignments = assignments || [];
        this.finalGrade = finalGrade;
    }
}

//Class to store assignment weights
class AssignmentType extends Course {
    constructor(courseCode,assignmentType, typeWeight){
        super(courseCode)
        this.assignmentType = assignmentType;
        this.typeWeight = typeWeight;
    }
}

//Class to store assignment instances
class Assignment extends AssignmentType  {
    constructor(assignmentTitle, assignmentType, pointsPossible, pointsRecieved){
        super(assignmentType)
        this.assignmentTitle = assignmentTitle;
        this.pointsPossible = pointsPossible;
        this.pointsRecieved = pointsRecieved;
    }
}

//------------Page Behavior-------------------//

//ADDING CLASSES AND THEIR ASSIGNMENT TYPE WEIGHTS//

//Function to create new course object
function createCourse(){
    let courseInput = document.getElementById("courseCode"); // Get the input field
    let courseCode = courseInput.value.trim(); // Get the input value
    assignmentTypes = []; //resetting 

    activeCourse = new Course(courseCode, assignmentTypes, assignments, 0);
    console.log(activeCourse);
}

    // Function to show the popup
    function openCreateCourse() {
    document.getElementById("createCourseMenu").style.display = "flex";  
    document.getElementById("overlay").style.display = "block"; 
    }

    // Function to close the popup
    function closePopup() {
    document.getElementById("createCourseMenu").style.display = "none";  
    document.getElementById("overlay").style.display = "none"; 
    }

    window.onclick = function(event) {
        var popup = document.getElementById('popup');
        var overlay = document.getElementById('overlay');
        if (event.target == overlay) {
            closePopup();
        }
    }

    // Function to get the newAssignmentType
    function openNewAssignmentType() {
    const addAssignmentTypeDiv = document.querySelector("#newCourse #courseInfoFieldset #addAssignmentTypeDiv");

    const addAssignmentType =[
        { label: "Assignment Type (hw, quiz, assignment, etc):", className: "inputBox", id: "assignmentTypeInput"},
        { label: "Assignment type weight (as a decimal):", className: "inputBox", id: "assignmentWeightInput"}

    ]
        addAssignmentType.forEach(assignmentType => {
            const inputContainer = document.createElement("div");
            inputContainer.className = "inputContainer";

            const label = document.createElement("label");
            label.textContent = assignmentType.label;
            label.setAttribute("for", assignmentType.id);

            const input = document.createElement("input");
            input.type = "text";
            input.className = assignmentType.className;
            input.id = assignmentType.id

            inputContainer.appendChild(label);
            inputContainer.appendChild(input);
            addAssignmentTypeDiv.appendChild(inputContainer);
            addAssignmentTypeDiv.appendChild(document.createElement('br'))
        }
        
        )
        console.log("Labels added:", document.querySelectorAll("label")); // Debugging check
    };
       
    
    //Function to add assignments
   function submitAssignmentType(){
    let assignmentType = document.getElementById("assignmentType");
    let typeWeight = document.getElementById("typeWeight");
    let activeAssignmentType = new AssignmentType(activeCourse.courseCode, assignmentType.value, typeWeight.value);
    assignmentTypes.push(activeAssignmentType);
    activeCourse.assignmentTypes.push(activeAssignmentType); 
    console.log(activeCourse.assignmentTypes);

    //update course info on main page after changes
    
   }

   
     //Function to submit new cou0-opp[;rse instance with associated weights
     function submitNewClass(){
        courses.push(activeCourse);
        console.log(courses);
        closePopup();
    }
    // Function to close newAssignmentType
    function closeNewAssignmentType() {
        submitAssignmentType();
        displayCourseInfo();
        document.getElementById("newAssignmentType").style.display = "none"; 
        document.getElementById("overlay").style.display = "none";
    }    

//DISPLAYING CURRENT CLASS INFO
    function displayCourseInfo(){
        if(activeCourse){
            let currentCourseInfo = document.getElementById("currentCourseInfo");
            currentCourseInfo.innerHTML = "";

            //Get title if active course code is set
            let courseTitle = document.createElement("h3");
            courseTitle.textContent = "Class Code: " + activeCourse.courseCode;
            currentCourseInfo.appendChild(courseTitle);
            
            //makin' a list of assignment Types wahoo
            let assignmentTypeList = document.createElement("ul");

            //Attempt to lop through assignment types and append to list at this late hour
            activeCourse.assignmentTypes.forEach(assignment => {
                let type = document.createElement("li");
                
                //PROBABLY GOING TO HAVE TO COME BACK TO THISD
                type.textContent = `${assignment.assignmentType.value}: ${assignment.typeWeight.value}%`;
                assignmentTypeList.appendChild(type);
            });
        

        //Add do dany DIVeto
        currentCourseInfo.appendChild(assignmentTypeList);
    }
}


//ADDING ASSIGNMENTS AND DISPLAYING ASSIGNMENT LIST//
    function openNewAssignment(){
        document.getElementById("newAssignment").style.display = "block";  
        document.getElementById("overlay").style.display = "block"; 
    }
    
    function closeNewAssignment() {
        document.getElementById("newAssignment").style.display = "none";  
        document.getElementById("overlay").style.display = "none"; 
        }

   
        //Function to add assignments
   function submitNewAssignment(){
    let assignmentTitle = document.getElementById("assignmentTitle");
    let assignmentType = document.getElementById("assignmentTypeSelect");
    let possiblePoints = document.getElementById("possiblePoints");
    let recievedPoints = document.getElementById("recievedPoints");
    let activeAssignment = new Assignment(assignmentTitle.value, assignmentType.value,possiblePoints.value, recievedPoints.value);
    activeCourse.assignments.push(activeAssignment);
    console.log(assignments);
    addAssignmentTable();

    //CHECK FOR DUPLICATES
    //Clearing input
    //NOTE: do this for the other forms alsooo
    


    closeNewAssignment();
   }

//ADD TO ASSIGNMENT TABLE
function addAssignmentTable(){
    var table = document.getElementById(addAssignmentTable);
    let assignmentTitle = document.getElementById("assignmentTitle").value;
    let assignmentType = document.getElementById("assignmentTypeSelect").value;
    let possiblePoints = document.getElementById("possiblePoints").value;
    let recievedPoints = document.getElementById("recievedPoints").value;

    if(assignmentTitle && assignmentType && possiblePoints && recievedPoints) {
    const tableBody = table.getElementsByTagName('tbody')[0];
  
    const newRow = tableBody.createElement("tr");
    
    const cell1 = document.createElement("td");
    cell1.textContent = assignmentTitle;
    newRow.appendChild(cell1);

    const cell2 = document.createElement("td");
    cell2.textContent = assignmentType;
    newRow.appendChild(cell2);

    const cell3 = document.createElement("td");
    cell3.textContent = possiblePoints;
    newRow.appendChild(cell3);

    const cell4 = document.createElement("td");
    cell4.textContent = recievedPoints;
    newRow.appendChild(cell4);

    tableBody.appendChild(newRow);

} else{
    alert("please fill out all fields");
}

//-------------------Mess---------------------------//
//Clear pop-up when done for new assignment
//Create List of submitted classes
// Create table with assignment weights input to make reusable
//create global variables with assignment possible and recieved totals

// on click:
    // store instance of assignment object with associated values


    // add to running possible and recieved totals

    // display assignment info in table --> addRow function called on click

    



}