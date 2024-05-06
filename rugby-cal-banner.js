const square = document.getElementById("square");

square.animate([
    {
        transform: "translateX(0)",
        opacity: 10,
    },
    {
    transform: "translate(100px)",
    opacity: 0.0,
        }
], {
    duration: 2000,
    fill: "forwards",
});
