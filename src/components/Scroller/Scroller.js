function Scroller() {
  const container = document.querySelector("#scroller-inner");
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener("mousedown", onMousedown);
  container.addEventListener("mouseup", onMouseUp);
  container.addEventListener("mousemove", onMouseMove);

  function onMousedown(event) {
    container.classList.add("scroller:inner--active");
    isDown = true;
    startX = event.pageX;
    scrollLeft = container.scrollLeft;
  }

  function onMouseUp() {
    container.classList.remove("scroller:inner--active");
    isDown = false;
  }

  function onMouseMove(event) {
    if (!isDown) return;
    event.preventDefault();
    container.scrollLeft = scrollLeft - (event.pageX - startX);
  }
}

Scroller();
