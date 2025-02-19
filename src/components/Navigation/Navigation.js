const UPDATE_NAV_STATE = "UPDATE_NAV_STATE";
const NAV_STATE = "NAV_STATE";

function Navigation() {
  const toggles = document.querySelectorAll(".website-navigation-toggle");
  const menu = document.querySelector(`#website-navigation`);

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", onToggle);
  });

  window.addEventListener(UPDATE_NAV_STATE, onNavStateChange);

  async function animateNavigationIn() {
    // Set the menu to display:block;
    menu.setAttribute("aria-hidden", false);
    // Wait a split second
    await new Promise((res) => setTimeout(res, 100));
    // Animate the menu in:
    menu.classList.add("slide-in");
  }

  async function animateNavigationOut() {
    // Animate the menu out:
    menu.classList.remove("slide-in");
    // Wait 300ms for animation to finish:
    await new Promise((res) => setTimeout(res, 300));
    // Set the menu to display:none;
    menu.setAttribute("aria-hidden", true);
  }

  function onNavStateChange({ detail }) {
    const { newState } = detail;
    // Update The Toggle with the new State:
    toggles.forEach((toggle) => toggle.setAttribute("aria-expanded", newState));
    // Update The Menu with the new State:
    if (newState) {
      animateNavigationIn();
    } else {
      animateNavigationOut();
    }
  }

  function onToggle(event) {
    const toggle = event.target;
    // Get the current state:
    const state = toggle.getAttribute("aria-expanded") === "true";
    // Set the new state to the opposite of that:
    const newState = !state;
    // Create a custom event with that new state:
    const updateNavState = new CustomEvent(UPDATE_NAV_STATE, {
      detail: { newState },
    });
    // Dispatch that event:
    window.dispatchEvent(updateNavState);
  }
}

Navigation();
