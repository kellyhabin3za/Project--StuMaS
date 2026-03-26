

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

    TableBox.appendChild(title);

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

    students.forEach((student, index) => {

        const row = document.createElement('tr');
        row.classList.add('zoomHover');
        row.setAttribute('data-index', index);



        row.innerHTML = `

        <td class="table-rows">${student.names}</td>
        <td class="table-rows">${student.age}</td>
        <td class="table-rows">${student.maths}</td>
        <td class="table-rows">${student.science}</td>
        <td class="table-rows">${student.english}</td>
        <td class="table-rows">${student.average}</td>
        <td class="actions-cell"></td>
        `;
        table.append(row);

        
    });

      table.addEventListener('mouseenter', event => {
    const row = event.target.closest('tr');

    if (row && row.classList.contains('zoomHover') && event.target.tagName === 'TR') {
        event.target.style.background = "azure";
        event.target.style.height = "50px";



            const actionsCell = event.target.querySelector('.actions-cell');


            const editBtn = document.createElement('button');
                    editBtn.setAttribute('id', 'editRow');
                    editBtn.innerText = 'Edit';
            const deleteBtn = document.createElement('button');
                    deleteBtn.setAttribute('id', 'deleteRow');
                    deleteBtn.innerText = 'Delete';
                    actionsCell.appendChild(editBtn);
                    actionsCell.appendChild(deleteBtn);
            
        setTimeout(() => {
    editBtn.style.opacity = '1';
    deleteBtn.style.opacity = '1';
}, 10);
        
            deleteBtn.addEventListener('click', () => {
                const index = event.target.getAttribute('data-index');
                students.splice(index, 1);
                localStorage.setItem("students", JSON.stringify(students));
                renderTable();
            
});

            editBtn.addEventListener('click', () => {
    const index = event.target.getAttribute('data-index');
    const student = students[index];

    row.innerHTML = `
        <td><input class="edit-input" value="${student.names}"></td>
        <td><input class="edit-input" type="number" value="${student.age}"></td>
        <td><input class="edit-input" type="number" value="${student.maths}"></td>
        <td><input class="edit-input" type="number" value="${student.science}"></td>
        <td><input class="edit-input" type="number" value="${student.english}"></td>
        <td></td>
        <td><button class="saveBtn">Save</button></td>
    `;

    // Wire up save button
    row.querySelector('.saveBtn').addEventListener('click', () => {
        const inputs = row.querySelectorAll('.edit-input');
        
        students[index] = {
            names: inputs[0].value,
            age: Number(inputs[1].value),
            maths: Number(inputs[2].value),
            science: Number(inputs[3].value),
            english: Number(inputs[4].value),
            average: Math.round((Number(inputs[2].value) + Number(inputs[3].value) + Number(inputs[4].value)) / 3)
        };

        localStorage.setItem("students", JSON.stringify(students));
        renderTable();
    });
});

    }
}, true);

table.addEventListener('mouseleave', event => {
    if (event.target.tagName === 'TR' && event.target.classList.contains('zoomHover')) {
        event.target.style.background = "";
        event.target.style.height = "";
    }
    const actionsCell = event.target.querySelector('.actions-cell');
    if (actionsCell) actionsCell.innerHTML = "";
}, true);
    

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
