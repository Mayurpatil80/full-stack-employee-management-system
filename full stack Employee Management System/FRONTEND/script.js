const apiUrl = 'http://localhost:8080/api/employees';
const adminUrl = 'http://localhost:8080/api/admin/login';

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    showPage('login-page');

    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('employeeForm').addEventListener('submit', handleSave);

    const searchInput = document.getElementById('searchInput');
    if(searchInput) {
        searchInput.addEventListener('keyup', searchEmployees);
    }
});

// --- Navigation Logic ---

function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
        section.classList.add('hidden');
    });

    const target = document.getElementById(pageId);
    if(target) {
        target.classList.remove('hidden');
        target.classList.add('active');
    }
}

// 1. Handle Login (CONNECTED TO DATABASE)
async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('adminName').value;
    const password = document.getElementById('adminPass').value;

    try {
        const response = await fetch(adminUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        });

        if (response.ok) {
            // Login Success
            showPage('dashboard-page');
            document.getElementById('loginForm').reset();
        } else {
            // Login Failed
            alert('Invalid Credentials! Please check your database.');
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("Server connection failed.");
    }
}

// 2. Navigation Actions
function goToAddPage() {
    resetForm();
    showPage('add-employee-page');
}

function goToViewPage() {
    getAllEmployees();
    showPage('list-employee-page');
}

function goToDashboard() {
    showPage('dashboard-page');
}

// --- API Logic ---

// 3. Fetch & Render
async function getAllEmployees() {
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        renderTable(data);
    } catch (err) { console.error('Error:', err); }
}

async function searchEmployees() {
    const query = document.getElementById('searchInput').value;
    if (query.length === 0) return getAllEmployees();

    try {
        const res = await fetch(`${apiUrl}/search?query=${query}`);
        const data = await res.json();
        renderTable(data);
    } catch (err) { console.error('Error:', err); }
}

function renderTable(employees) {
    const tableBody = document.getElementById('employeeTableBody');
    tableBody.innerHTML = '';

    if(employees.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" class="text-center">No employees found</td></tr>';
        return;
    }

    employees.forEach(emp => {
        const row = document.createElement('tr');
        row.classList.add('row-enter');
        row.id = `row-${emp.id}`;

        row.innerHTML = `
            <td>${emp.firstName}</td>
            <td>${emp.lastName}</td>
            <td>${emp.email}</td>
            <td class="text-center">
                <button class="action-btn edit-btn" onclick="editEmployee(${emp.id})">
                    <span class="material-icons">edit</span>
                </button>
                <button class="action-btn del-btn" onclick="deleteEmployee(${emp.id})">
                    <span class="material-icons">delete</span>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// 4. Save (Create or Update)
async function handleSave(e) {
    e.preventDefault();
    const id = document.getElementById('employeeId').value;
    const employee = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value
    };

    try {
        if (id) {
            await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employee)
            });
            resetForm();
            goToViewPage();
        } else {
            await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employee)
            });
            resetForm();
            // Stay on Add page
        }

    } catch (err) { console.error(err); }
}

// 5. Edit Helper
async function editEmployee(id) {
    try {
        const res = await fetch(`${apiUrl}/${id}`);
        const emp = await res.json();

        showPage('add-employee-page');

        document.getElementById('employeeId').value = emp.id;
        document.getElementById('firstName').value = emp.firstName;
        document.getElementById('lastName').value = emp.lastName;
        document.getElementById('email').value = emp.email;

        document.getElementById('formTitle').innerText = 'Edit Employee';
        document.getElementById('saveBtn').innerHTML = '<span class="material-icons">update</span> Update';
    } catch(err) { console.error(err); }
}

// 6. Delete
async function deleteEmployee(id) {
    if(!confirm("Are you sure?")) return;

    const row = document.getElementById(`row-${id}`);
    row.classList.remove('row-enter');
    row.classList.add('row-exit');

    setTimeout(async () => {
        try {
            await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
            row.remove();
        } catch (err) {
            console.error(err);
            row.classList.remove('row-exit');
        }
    }, 500);
}

// 7. Reset Form
function resetForm() {
    document.getElementById('employeeForm').reset();
    document.getElementById('employeeId').value = '';
    const title = document.getElementById('formTitle');
    if(title) title.innerText = 'Add New Employee';

    const btn = document.getElementById('saveBtn');
    if(btn) btn.innerHTML = '<span class="material-icons">save</span> Save';
}