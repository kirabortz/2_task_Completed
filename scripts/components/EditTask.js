import { ActiveCounter } from "./ActiveCounter.js";
import { StorageSet } from "./Storage.js";

export function EditTask(filteredTasks, task, taskDeleteBtn, taskDoneBtn, taskBlock, taskLabel) {
  taskLabel.addEventListener("dblclick", () => {
    let originalTaskText = task.value;

    taskDoneBtn.style.visibility = "hidden";
    taskDeleteBtn.style.display = "none";

    let editTaskInput = document.createElement("input");
    editTaskInput.classList.add("edit_input");
    editTaskInput.id = `${task.id}`;
    editTaskInput.style.border = "1px solid black";
    editTaskInput.value = taskLabel.textContent;

    taskLabel.replaceWith(editTaskInput);
    editTaskInput.focus();

    editTaskInput.onchange = editTaskInput.onkeyup = (e) => {
      if (e.key == "Enter" || e.type == "change") {
        taskDoneBtn.style.visibility = "visible";
        taskDeleteBtn.style.display = "block";
        editTaskInput.replaceWith(taskLabel);
        task.value = editTaskInput.value;
        taskLabel.textContent = task.value;

        if (taskLabel.textContent.length === 0) {
          filteredTasks = filteredTasks.filter((item) => item.id !== task.id);
          taskBlock.remove();
          ActiveCounter(filteredTasks);
        }
      }

      if (e.key == "Escape") {
        taskDoneBtn.style.visibility = "visible";
        taskDeleteBtn.style.display = "block";
        editTaskInput.value = originalTaskText;
        taskLabel.textContent = editTaskInput.value;
        editTaskInput.replaceWith(taskLabel);
      }
      StorageSet(filteredTasks);
    };
  });
}
