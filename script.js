const form = document.getElementById("cadastroForm");

form.addEventListener("submit", function (event) {
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmar_senha").value;

    if (senha !== confirmar) {
        event.preventDefault();
        alert("As senhas não coincidem. Tente novamente!");
    }
});

const campos = form.querySelectorAll("input, select");

campos.forEach(campo => {
    campo.addEventListener("input", () => {
        if (campo.type === "radio" || campo.type === "checkbox") {
            salvarChecks();
        } else {
            localStorage.setItem(campo.name, campo.value);
        }
    });
});

function salvarChecks() {
    const selecionados = {};
    campos.forEach(campo => {
        if ((campo.type === "radio" || campo.type === "checkbox") && campo.checked) {
            if (!selecionados[campo.name]) {
                selecionados[campo.name] = [];
            }
            selecionados[campo.name].push(campo.value);
        }
    });
    localStorage.setItem("checks", JSON.stringify(selecionados));
}

window.addEventListener("load", () => {
    campos.forEach(campo => {
        if (campo.type !== "radio" && campo.type !== "checkbox" && campo.type !== "file" && localStorage.getItem(campo.name)) {
            campo.value = localStorage.getItem(campo.name);
        }
    });

    const checks = JSON.parse(localStorage.getItem("checks")) || {};
    for (let nome in checks) {
        checks[nome].forEach(valor => {
            const campo = document.querySelector(`[name="${nome}"][value="${valor}"]`);
            if (campo) campo.checked = true;
        });
    }
});