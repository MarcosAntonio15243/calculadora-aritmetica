// Função para exibir mensagens de logs de execução do programa
function log(message, type = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${type}] [${timestamp}] ${message}`;
  if (type.includes("ERRO")) {
    console.error(logMessage)
  } else {
    console.log(logMessage);
  }
}

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


// Função para validar a expressão digitada antes de computá-la
function validarExpressao() {
  log("Iniciando validação de expressão aritmética...");

  // Regex para aceitar apenas números e símbolos válidos: "(", ")", "/", "*", "+", "-" e "."
  const regexCaracteres = /^[0-9+\-*/().\s]+$/;
  if (!regexCaracteres.test(input.value)) {
    log(`Expressão inválida "${input.value}": A expressão deve conter apenas números e símbolos pré-definidos: "(", ")", "/", "*", "+", "-" e ".".`, "ERRO");
    return false;
  }

  // Remove espaços para análise sintática mais simples
  const expr = input.value.replace(/\s+/g, '');
  log(`"Removendo espaços da expressão para análise sintática mais simples: exp="${expr}"`);

  // Checa parênteses balanceados
  let balance = 0;
  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    if (char === '(') balance++;
    if (char === ')') balance--;
    if (balance < 0) {
      log(`Expressão inválida "${input.value}": Parênteses não devem ser fechados antes de abri-los`, "ERRO");
      return false; // há algum parênteses que fecha antes de abrir
    }
  }
  // Checa se todos os parênteses abertos foram fechados
  if (balance !== 0) {
    log(`Expressão inválida "${input.value}": Existem parênteses abertos que não foram fechados`, "ERRO");
    return false;
  }

  // Checa parênteses vazios
  if (expr.includes('()')) {
    log(`Expressão inválida "${input.value}": Parênteses devem conter pelo menos um número ou expressão entre si`, "ERRO");
    return false;
  }

  // Checa operadores duplicados (++, --, **, //)
  if (/([+\-*/]{2,})/.test(expr)) {
    log(`Expressão inválida "${input.value}": Operadores duplicados não são permitidos`, "ERRO");
    return false;
  }

  // Checa se termina com operador
  if (/[+\-*/]$/.test(expr)) {
    log(`Expressão inválida "${input.value}": Expressão não deve ser finalizada com um operador`, "ERRO");
    return false;
  }

  // Checa operadores logo depois de '(' ou antes de ')'
  if (/\([*/]/.test(expr) || /[+\-\*/]\)/.test(expr)) {
    log(`Expressão inválida "${input.value}": Não devem haver operadores "/" ou "*" logo após abertura '(' ou logo antes de fechamento ')' de parênteses`, "ERRO");
    return false;
  }

  // Checa pontos duplicados em um mesmo número (ex: 3..14)
  if (/\d*\.\d*\./.test(expr)) {
    log(`Expressão inválida "${input.value}": Não se deve haver mais de um ponto flutuante '.' consecutivamente`, "ERRO");
    return false;
  }

  // A expressão está de acordo com as restrições
  log("Validação de expressão aritmética finalizada");
  return true;
}


// Adicionando evento de click no botão '=' (último botão da calculadora) para computar a expressão digitada
buttons[buttons.length-1].addEventListener("click", () => {
  if (validarExpressao()) {
    try {
      var expression = input.value;
      input.value = eval(expression);
      log(`Expressão executada: ${expression} = ${input.value}`);
    } catch (error) {
      input.placeholder = "erro";
      input.value = "";
      log(`Erro ao executar eval(): ${error}`, "ERRO");
    }
  } else {
    log("Iniciando limpeza do input da expressão...");
    input.placeholder = "erro";
    input.value = "";
    log("Expressão limpa com sucesso");
  };
});