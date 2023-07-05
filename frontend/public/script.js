const rootElement = document.querySelector("#root");
const homeButton = document.querySelector("#Home");
const menuButton = document.querySelector("#Menu");

menuButton.addEventListener("click", (event) => {
    // const response = await fetch("/pizza/list");
    // const data = await response.json();
    // window.location = response.url;
    window.location = "http://localhost:5500/pizza/list";
    // console.log(response);
})