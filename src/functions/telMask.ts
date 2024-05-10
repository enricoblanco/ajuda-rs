export const telMask = (value: string) => {
  const onlyNumbers = value.replace(/\D/g, ""); // Remove todos os caracteres que não são dígitos
  const formatted = onlyNumbers
    .replace(/^(\d{2})(\d)/g, "($1) $2") // Insere parênteses após os primeiros 2 dígitos
    .replace(/(\d{4,5})(\d)/, "$1-$2"); // Insere o hífen após os próximos 4 ou 5 dígitos

  return formatted.slice(0, 15); // Limita o tamanho do número de telefone a 15 caracteres
};
