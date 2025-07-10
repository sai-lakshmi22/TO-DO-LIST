
  const inputBox = document.getElementById("input-box");
  const listContainer = document.getElementById("list-container");

  function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === '') {
      alert("You must write something");
      return;
    }

    const li = document.createElement("li");

    const taskSpan = document.createElement("span");
    taskSpan.className = "task-text";
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);

    const editBtn = document.createElement("span");
    editBtn.className = "edit";
    editBtn.textContent = "✎";
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "×";
    li.appendChild(deleteBtn);

    listContainer.appendChild(li);
    inputBox.value = '';
    saveData();
  }

  // Event delegation: Handle clicks inside the task list
  listContainer.addEventListener("click", function (e) {
    const target = e.target;

    // DELETE
    if (target.classList.contains("delete")) {
      target.closest("li").remove();
      saveData();
    }

    // EDIT
    else if (target.classList.contains("edit")) {
      const li = target.closest("li");
      const taskSpan = li.querySelector(".task-text");
      const currentText = taskSpan.textContent;
      const newText = prompt("Edit your task:", currentText);
      if (newText !== null && newText.trim() !== "") {
        taskSpan.textContent = newText.trim();
        saveData();
      }
    }

    // TOGGLE CHECK
    else if (
      target.tagName === "LI" ||
      target.classList.contains("task-text")
    ) {
      const li = target.closest("li");
      li.classList.toggle("checked");
      saveData();
    }
  });

  function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
  }

  function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || '';
  }

  showTask();
