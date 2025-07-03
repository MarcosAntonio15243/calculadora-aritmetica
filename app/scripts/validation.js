import { log } from "./util.js";

// Função para validar a expressão digitada antes de computá-la
function validateExpression(expression) {
  log("Iniciando validação de expressão aritmética...");

  // Remove espaços para análise sintática mais simples
  const expr = expression.replace(/\s+/g, '');
  log(`Removendo espaços da expressão para análise sintática mais simples: exp="${expr}"`);

  if (expr.length == 0) {
    log("Validação de expressão aritmética finalizada");
    return true;
  }

  // Regex para aceitar apenas números e símbolos válidos: "(", ")", "/", "*", "+", "-" e "."
  const regexCaracteres = /^[0-9+\-*/().\s]+$/;
  if (!regexCaracteres.test(expr)) {
    log(`Expressão inválida "${expression}": A expressão deve conter apenas números e símbolos pré-definidos: "(", ")", "/", "*", "+", "-" e ".".`, "ERRO");
    return false;
  }

  // Checa se a expressão inicia com "*" ou "/"
  if (/^[*/]/.test(expr)) {
    log(`Expressão inválida "${expression}": Não pode começar com operadores "*" ou "/"`, "ERRO");
    return false;
  } 

  // Checa parênteses balanceados
  let balance = 0;
  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    if (char === '(') balance++;
    if (char === ')') balance--;
    if (balance < 0) {
      log(`Expressão inválida "${expression}": Parênteses não devem ser fechados antes de abri-los`, "ERRO");
      return false; // há algum parênteses que fecha antes de abrir
    }
  }
  // Checa se todos os parênteses abertos foram fechados
  if (balance !== 0) {
    log(`Expressão inválida "${expression}": Existem parênteses abertos que não foram fechados`, "ERRO");
    return false;
  }

  // Checa parênteses vazios
  if (expr.includes('()')) {
    log(`Expressão inválida "${expression}": Parênteses devem conter pelo menos um número ou expressão entre si`, "ERRO");
    return false;
  }

  // Checa operadores duplicados (++, --, **, //)
  if (/([+\-*/]{2,})/.test(expr)) {
    log(`Expressão inválida "${expression}": Operadores duplicados não são permitidos`, "ERRO");
    return false;
  }

  // Checa se termina com operador
  if (/[+\-*/]$/.test(expr)) {
    log(`Expressão inválida "${expression}": Expressão não deve ser finalizada com um operador`, "ERRO");
    return false;
  }

  // Checa operadores logo depois de '(' ou antes de ')'
  if (/\([*/]/.test(expr) || /[+\-\*/]\)/.test(expr)) {
    log(`Expressão inválida "${expression}": Não devem haver operadores "/" ou "*" logo após abertura '(' ou logo antes de fechamento ')' de parênteses`, "ERRO");
    return false;
  }

  // Checa pontos duplicados em um mesmo número (ex: 3..14)
  if (/\d*\.\d*\./.test(expr)) {
    log(`Expressão inválida "${expression}": Não se deve haver mais de um ponto flutuante '.' consecutivamente`, "ERRO");
    return false;
  }

  // A expressão está de acordo com as restrições
  log("Validação de expressão aritmética finalizada");
  return true;
}

export { validateExpression };