import { log } from "./util.js";
import { validateExpression } from "./validation.js";

// Elemento input do textarea que contém a expressão aritmética
let input = document.getElementById("expression-input");
// Lista dos botões da calculadora
let buttons = document.getElementsByClassName("btn-key");

// Adicionando eventos de click para preencher o textarea com números e símbolos
for (let index = 2; index < buttons.length - 1; index++) {
  const element = buttons[index];
  element.addEventListener("click", (e) => {
    log(`Pressionado o botão "${e.target.innerHTML}"`);
    if (input.placeholder.includes("erro")) {
      input.placeholder = "0";
    }
    input.value += e.target.innerHTML;
    input.scrollLeft = input.scrollWidth;
  })
}

// Adicionando evento de click no botão 'CE' (1º botão da calculadora) para limpar toda a expressão
buttons[0].addEventListener("click", (e) => {
  log(`Pressionado o botão "${e.target.innerHTML}"`);
  log("Iniciando limpeza do input da expressão...");
  if (input.placeholder.includes("erro")) {
    input.placeholder = "0";
  }
  input.value = "";
  log("Expressão limpa com sucesso");
})

// Adicionando evento de click no botão 'C' (2º botão da calculadora) para deletar o último caractere digitado
buttons[1].addEventListener("click", (e) => {
  log(`Pressionado o botão "${e.target.innerHTML}"`);
  log("Removendo último dígito da expressão...");
  input.value = input.value.slice(0, input.value.length-1);
  log("Último digito removido com sucesso");
})

// Adicionando evento de click no botão '=' (último botão da calculadora) para computar a expressão digitada
buttons[buttons.length-1].addEventListener("click", () => {
  if (validateExpression(input.value)) {
    try {
      var expression = input.value;
      var result = math.evaluate(expression);
      input.value = result || "";
      if (result) {
        log(`Expressão executada: ${expression} = ${input.value}`);
      }
    } catch (error) {
      input.placeholder = "erro";
      input.value = "";
      log(`Erro ao executar math.evaluate(): ${error}`, "ERRO");
    }
  } else {
    log("Iniciando limpeza do input da expressão...");
    input.placeholder = "erro";
    input.value = "";
    log("Expressão limpa com sucesso");
  };
});