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

export { log };