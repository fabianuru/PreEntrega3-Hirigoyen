const header = document.querySelector("header");
const main = document.getElementsByTagName("main");
const footer = document.getElementsByTagName("footer");

const nav = document.createElement("nav");
const ul = document.createElement("ul");

const items = [
    {texto: "Home" , href: "/index.html"},
    {texto: "Gestionar Pedidos" , href: "/pages/pedidos.html"},
    {texto: "Gestionar Inventarios" , href: "/pages/inventarios.html"},
    {texto: "Gestionar Producción" , href: "/pages/produccion.html"}
];

items.forEach(item => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = item.texto;
    a.href = item.href;
    li.appendChild(a);
    ul.appendChild(li)
});

nav.appendChild(ul);
header.appendChild(nav);