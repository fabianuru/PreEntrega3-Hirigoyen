let items = JSON.parse(localStorage.getItem('items')) || [];
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
let actionLog = JSON.parse(localStorage.getItem('actionLog')) || [];
let username = '';


const usernameContainer = document.getElementById('usernameContainer');
const mainContent = document.getElementById('mainContent');
const usernameInput = document.getElementById('username');
const startButton = document.getElementById('startButton');
const createItemForm = document.getElementById('createItemForm');
const modifyItemForm = document.getElementById('modifyItemForm');
const inventoryBody = document.getElementById('inventoryBody');
const selectItem = document.getElementById('selectItem');
const itemQuantity = document.getElementById('itemQuantity');
const actionLogList = document.getElementById('actionLog');
const filterInput = document.getElementById('filterInput');


startButton.onclick = () => {
    username = usernameInput.value.trim();
    if (username) {
        usernameContainer.style.display = 'none';
        mainContent.style.display = 'block';
        renderItemsDropdown();
        renderInventory();
        renderActionLog();
    }
};


function renderItemsDropdown() {
    selectItem.innerHTML = '';
    items.forEach((item, index) => {
        selectItem.innerHTML += `<option value="${index}">${item.name}</option>`;
    });
}


function renderInventory() {
    inventoryBody.innerHTML = '';
    const filterText = filterInput.value.toLowerCase();
    inventory.forEach((item) => {
        if (item.name.toLowerCase().includes(filterText)) {
            inventoryBody.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.lastModified}</td>
                    <td>${item.user}</td>
                </tr>
            `;
        }
    });
}


createItemForm.onsubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById('newItemName').value.trim();
    if (name) {
        items.push({ name });
        localStorage.setItem('items', JSON.stringify(items));
        document.getElementById('newItemName').value = '';
        renderItemsDropdown();
    }
};


function logAction(action, itemName, quantity) {
    const timestamp = new Date().toLocaleString();
    actionLog.push(`${timestamp} - ${username} ${action} ${quantity} de ${itemName}`);
    localStorage.setItem('actionLog', JSON.stringify(actionLog));
    renderActionLog();
}


function renderActionLog() {
    actionLogList.innerHTML = '';
    actionLog.forEach((log) => {
        actionLogList.innerHTML += `<li>${log}</li>`;
    });
}


modifyItemForm.onsubmit = (event) => {
    event.preventDefault();

    const selectedIndex = selectItem.value;
    const selectedItem = items[selectedIndex];
    let quantity = parseInt(itemQuantity.value);

    if (quantity < 0) {
        alert('No se puede añadir una cantidad negativa.');
        return;
    }

    let inventoryItem = inventory.find(item => item.name === selectedItem.name);

    if (inventoryItem) {
        inventoryItem.quantity += quantity;
        inventoryItem.lastModified = new Date().toLocaleString();
        inventoryItem.user = username;
    } else {
        inventory.push({
            name: selectedItem.name,
            quantity: quantity,
            lastModified: new Date().toLocaleString(),
            user: username
        });
    }

    localStorage.setItem('inventory', JSON.stringify(inventory));
    logAction('añadió', selectedItem.name, quantity);
    modifyItemForm.reset();
    renderInventory();
};


document.getElementById('subtractButton').onclick = () => {
    const selectedIndex = selectItem.value;
    const selectedItem = items[selectedIndex];
    let quantity = parseInt(itemQuantity.value);

    if (quantity < 0) {
        alert('No se puede eliminar una cantidad negativa.');
        return;
    }

    let inventoryItem = inventory.find(item => item.name === selectedItem.name);

    if (inventoryItem) {
        if (inventoryItem.quantity < quantity) {
            alert('No se puede eliminar más de lo que hay en inventario.');
            return;
        }
        inventoryItem.quantity -= quantity;
        inventoryItem.lastModified = new Date().toLocaleString();
        inventoryItem.user = username;
    }

    localStorage.setItem('inventory', JSON.stringify(inventory));
    logAction('eliminó', selectedItem.name, quantity);
    modifyItemForm.reset();
    renderInventory();
};


filterInput.oninput = () => {
    renderInventory();
};


renderItemsDropdown();
renderInventory();
renderActionLog();
