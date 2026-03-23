let students = [];

const bodyDiv = document.querySelector("#bodyDiv");
const tableContainer = document.querySelector('#tableContainer');
const myAddBtn = document.querySelector("#myAddBtn");

const loadStudents = () => {
    const saved = localStorage.getItem("students");
    if (saved){
        students = JSON.parse(saved);
    }
};

loadStudents();

const renderTable = () => {

    const existing = document.querySelector('#studentsList');
    if (existing) existing.closest('.rendered-table-container').remove();

    const title = document.createElement('h2');
    title.classList.add('renderTable-title');
    title.textContent = `Students list`;
    const table = document.createElement('table');
    table.classList.add('rendered-table');
    table.setAttribute('id', 'studentsList')
    const TableBox = document.createElement('div');
    TableBox.classList.add('rendered-table-container');

    TableBox.appendChild(title)

    table.innerHTML = `
    <tr>
        <th class="table-headers">Student name</th>
        <th class="table-headers">Age</th>
        <th class="table-headers">Maths score</th>
        <th class="table-headers">Science score</th>
        <th class="table-headers">English score</th>
        <th class="table-headers">Average</th>
    </tr> 
    `;

    students.forEach(student => {

        const row = document.createElement('tr');

        row.innerHTML = `

        <td class="table-rows">${student.names}</td>
        <td class="table-rows">${student.age}</td>
        <td class="table-rows">${student.maths}</td>
        <td class="table-rows">${student.science}</td>
        <td class="table-rows">${student.english}</td>
        <td class="table-rows">${student.average}</td>
        
        `;
        table.append(row);

        
    });

        TableBox.appendChild(table)
        tableContainer.appendChild(TableBox);
   
}

if (students.length > 0) renderTable();

const createForm = ()=>{

    

    if (document.querySelector("#studentForm")) return;

    
    
    const form = document.createElement('form');
     form.setAttribute('method' , 'POST');
    form.setAttribute('id', 'studentForm');
    form.classList.add('form-students');

    form.innerHTML = ` 
             <div class="form-content">
                <h1 class = "form-title">Add Student</h1>

            <div class="form-elements">
                <div>
                <label for="fname" class="form-labels">Full names</label> 
                <input type="text" id="fname" name="fname" class="form-inputs">
                </div>
                <div>
                <label for="age" class="form-labels">Age</label>
                <input type="text" id="age" name="age" class="form-inputs">
                </div>
                <div>
                 <label for="maths-course" class="form-labels">Maths</label>
                <input type="text" id="maths-course" name="maths-course" class="form-inputs">
               </div>
                <div>
                  <label for="science-course" class="form-labels">Science</label>
                <input type="text" id="science-course" name="science-course" class="form-inputs">
              </div>
                <div>
                <label for="english-course" class="form-labels">English</label>
                <input type="text" id="english-course" name="english-course" class="form-inputs">
                </div>
            </div>
            
                <button class="form-submit" id ="formSubmit">Submit</button>
                </div>
                `;
    
    tableContainer.appendChild(form);


            const submitBtn = document.querySelector("#formSubmit");

        form.addEventListener('submit', event =>{

            event.preventDefault();

            const names = document.querySelector("#fname").value.trim();
            const age = Number(document.querySelector("#age").value);
            const maths = Number(document.querySelector("#maths-course").value);
            const english = Number(document.querySelector("#english-course").value);
            const science = Number(document.querySelector("#science-course").value);
            const average = Math.round((maths + english + science) / 3);

            if (names === ""){
                alert(`Enter a valid name please !`);
                return;
            }
            if (age === 0){
                alert(`Enter a valid age please !`);
                return;
            }

            const namePattern = /^[A-Za-z\s]+$/;
            if (!namePattern.test(names)) {
               return alert("Name must contain only letters");
            }

            if ((maths > 100 || maths < 0 || Number(maths) === 0) || (english > 100 || english < 0 || Number(english) === 0) || (science > 100 || science < 0 || Number(science) === 0) ){
                alert(`Invalid subject scores !`);
                return;
            }
            
            if (isNaN(maths) || isNaN(english) || isNaN(science) ){
                alert(`Invalid subject scores !`);
                return;
            }

            

            students.push({names, age, maths, science, english, average });
            localStorage.setItem("students", JSON.stringify(students));

            
            renderTable();


        })


    
};


myAddBtn.addEventListener('click', event =>{
    createForm();
});

