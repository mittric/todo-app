// To-Do-App Funktionalität: Hinzufügen, Löschen, Erledigt markieren

// Annahme: Es gibt folgende HTML-Elemente:
// <input id="todo-input" type="text">
// <button id="add-btn">Hinzufügen</button>
// <ul id="todo-list"></ul>

// Aufgaben im Local Storage speichern und laden

// Aufgaben aus Local Storage laden
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.forEach(todo => addTodoItem(todo.text, todo.done));
}

// Aufgaben im Local Storage speichern
function saveTodos() {
    const items = [];
    document.querySelectorAll('#todo-list li').forEach(li => {
        items.push({
            text: li.childNodes[0].textContent,
            done: li.classList.contains('done')
        });
    });
    localStorage.setItem('todos', JSON.stringify(items));
}

// addTodoItem so anpassen, dass Status übernommen werden kann
function addTodoItem(text, done = false) {
    const li = document.createElement('li');
    li.textContent = text;

    if (done) li.classList.add('done');

    // Erledigt markieren
    li.addEventListener('click', () => {
        li.classList.toggle('done');
        saveTodos();
    });

    // Löschen-Button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Löschen';
    delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        saveTodos();
    });

    li.appendChild(delBtn);
    todoList.appendChild(li);
    saveTodos();
}

// Nach dem Laden der Seite Aufgaben laden
window.addEventListener('DOMContentLoaded', loadTodos);

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

// Optional: CSS für erledigte Aufgaben
// .done { text-decoration: line-through; color: gray; }