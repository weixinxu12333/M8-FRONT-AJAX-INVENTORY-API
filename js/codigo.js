window.addEventListener("load", carregar);

function carregar() {
    document.getElementById("getAll").addEventListener("click", getAll);
    document.getElementById("postProduct").addEventListener("click", postProduct);
    document.getElementById("getById").addEventListener("click", getById);

    document.getElementById("putById").addEventListener("click", putById);
    document.getElementById("deleteById").addEventListener("click", deleteById);
    document.getElementById("getStock").addEventListener("click", getStock);

    document.getElementById("postToken").addEventListener("click", postToken);
}

// get, delete
function ajaxCall(url, method, p) {
    fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        method: method
    })
        .then(res => res.json())
        .then(data => $(p).text(JSON.stringify(data, null, 2)));
}

// create
function ajaxCreate(url, method, p, x1, x2, x3, x4, x5) {
    fetch(url,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            method: method,
            body: JSON.stringify({
                Name: x1,
                Category: x2,
                Color: x3,
                UnitPrice: parseFloat(x4),
                AvailableQuantity: parseInt(x5)
            })
        })
        .then(res => res.json())
        .then(data => $(p).text(JSON.stringify(data, null, 2)));
}

// update
function ajaxUpdate(url, method, p, x, x1, x2, x3, x4, x5) {
    fetch(url,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            method: method,
            body: JSON.stringify({
                ProductId: parseInt(x),
                Name: x1,
                Category: x2,
                Color: x3,
                UnitPrice: parseFloat(x4),
                AvailableQuantity: parseInt(x5)
            })
        })
        .then(res => res.json())
        .then(data => $(p).text(JSON.stringify(data, null, 2)));
}

//token
function ajaxLogin(url, method, p, x1, x2) {
    fetch(url,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: method,
            body: JSON.stringify({
                email: x1,
                password: x2
            })
        })
        .then(res => res.text())
        .then(token => {
            localStorage.setItem('token', token);
            $(p).text(token);
        });
}

function getAll() {
    ajaxCall('https://localhost:5001/api/Products', 'GET', '#col1');
}

function postProduct() {
    var x1 = document.getElementById("tName").value;
    var x2 = document.getElementById("tCat").value;
    var x3 = document.getElementById("tCol").value;
    var x4 = document.getElementById("tUp").value;
    var x5 = document.getElementById("tAq").value;

    ajaxCreate('https://localhost:5001/api/Products', 'POST', '#col21', x1, x2, x3, x4, x5);
}

function getById() {
    var x = document.getElementById("gId").value;
    ajaxCall('https://localhost:5001/api/Products/' + x, 'GET', '#col33');
}

function putById() {
    var x = document.getElementById("pId").value;
    var x1 = document.getElementById("pName").value;
    var x2 = document.getElementById("pCat").value;
    var x3 = document.getElementById("pCol").value;
    var x4 = document.getElementById("pUp").value;
    var x5 = document.getElementById("pAq").value;

    ajaxUpdate('https://localhost:5001/api/Products/' + x, 'PUT', '#col41', x, x1, x2, x3, x4, x5);
}

function deleteById() {
    var x = document.getElementById("tCode").value;

    ajaxCall('https://localhost:5001/api/Products/' + x, 'DELETE', '#col51');

}

function getStock() {
    var x1 = document.getElementById("stockTrue");
    var x2 = document.getElementById("stockFalse");

    if (x1.checked) {
        ajaxCall('https://localhost:5001/api/Products/stock?inStock=true', 'GET', '#col61');
    } else if (x2.checked) {
        ajaxCall('https://localhost:5001/api/Products/stock?inStock=false', 'GET', '#col61');
    }
}

function postToken() {
    var x1 = document.getElementById("tEm").value;
    var x2 = document.getElementById("tPass").value;

    ajaxLogin('https://localhost:5001/api/Token', 'POST', '#col71', x1, x2);
}