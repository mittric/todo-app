// To-Do-App Funktionalität: Hinzufügen, Löschen, Erledigt markieren

// Annahme: Es gibt folgende HTML-Elemente:
// <input id="todo-input" type="text">
// <button id="add-btn">Hinzufügen</button>
// <ul id="todo-list"></ul>

const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Aufgabe hinzufügen
addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text) {
        addTodoItem(text);
        input.value = '';
        input.focus();
    }
});

// Aufgabe hinzufügen, wenn Enter gedrückt wird
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

function addTodoItem(text) {
    const li = document.createElement('li');
    li.textContent = text;

    // Erledigt markieren
    li.addEventListener('click', () => {
        li.classList.toggle('done');
    });

    // Löschen-Button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Löschen';
    delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
    });

    li.appendChild(delBtn);
    todoList.appendChild(li);
}

// Optional: CSS für erledigte Aufgaben
// .done { text-decoration: line-through; color: gray; }