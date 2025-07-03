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

// Adicionando evento de click no botão 'C' (2º botão da calculadora) para deletar o último caractere digitado
buttons[1].addEventListener("click", (e) => {
  input.value = input.value.slice(0, input.value.length-1);
})


// Função para validar a expressão digitada antes de computá-la
function validarExpressao() {

  // Regex para aceitar apenas números e símbolos válidos: "(", ")", "/", "*", "+", "-" e "."
  const regexCaracteres = /^[0-9+\-*/().\s]+$/;
  if (!regexCaracteres.test(input.value)) {
    return false;
  }

  // Remove espaços para análise sintática mais simples
  const expr = input.value.replace(/\s+/g, '');

  // Checa parênteses balanceados
  let balance = 0;
  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    if (char === '(') balance++;
    if (char === ')') balance--;
    if (balance < 0) {
      return false; // há algum parênteses que fecha antes de abrir
    }
  }
  // Checa se todos os parênteses abertos foram fechados
  if (balance !== 0) {
    return false;
  }

  // Checa parênteses vazios
  if (expr.includes('()')) {
    return false;
  }

  // Checa operadores duplicados (++, --, **, //)
  if (/([+\-*/]{2,})/.test(expr)) {
    return false;
  }

  // Checa se termina com operador
  if (/[+\-*/]$/.test(expr)) {
    return false;
  }

  // Checa operadores logo depois de '(' ou antes de ')'
  if (/\([*/]/.test(expr) || /[*/]\)/.test(expr)) {
    return false;
  }

  // Adicionar outras restrições específicas...

  // A expressão está de acordo com as restrições
  return true;
}


// Adicionando evento de click no botão '=' (último botão da calculadora) para computar a expressão digitada
buttons[buttons.length-1].addEventListener("click", () => {
  if (validarExpressao()) {
    try {
      var expression = input.value;
      input.value = eval(expression);
    } catch (error) {
      input.placeholder = "erro";
      input.value = "";
    }
  } else {
    input.placeholder = "erro";
    input.value = "";
  };
})