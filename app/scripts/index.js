let input = document.getElementById("expression-input");

let buttons = document.getElementsByClassName("btn-key");

// Adicionando eventos de click para preencher o textarea com números e símbolos
for (let index = 2; index < buttons.length - 1; index++) {
  const element = buttons[index];
  element.addEventListener("click", (e) => {
    if (input.placeholder.includes("erro")) {
      input.placeholder = "0";
    }
    input.value += e.target.innerHTML;
    input.scrollLeft = input.scrollWidth;
  })
}

// Adicionando evento de click no botão 'CE' (1º botão da calculadora) para limpar toda a expressão
buttons[0].addEventListener("click", (e) => {
  if (input.placeholder.includes("erro")) {
    input.placeholder = "0";
  }
  input.value = "";
})

