const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault(); // by default dropping inside the element is not allowed so it will show a none symbol as a to remove that we have prevent the default behaviour
    const draggingElement = document.querySelector(".dragging");
    const nearestElementBelow = helper(container, e.clientY).element; // e.clientY gives us the pos of scrollbar
    if (nearestElementBelow) {
      container.insertBefore(draggingElement, nearestElementBelow);
    } else {
      container.appendChild(draggingElement);
    }
  });
});

function helper(container, scrollY) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ]; // converting nodelist to array
  return draggableElements.reduce(
    (acc, draggableElement) => {
      const pos = draggableElement.getBoundingClientRect(); // return pos of element related to viewport
      const offset = scrollY - pos.top - pos.height / 2;
      if (offset < 0 && offset > acc.offset) {
        // if offset if negative i.e cursor is above element and  we are searching for the nearest element below the cursor position.
        return {
          offset,
          element: draggableElement,
        };
      } else return acc;
    },
    { offset: Number.NEGATIVE_INFINITY }
  );
}
