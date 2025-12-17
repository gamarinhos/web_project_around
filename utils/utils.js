/**
 * Faz bind dos métodos de uma classe
 * @param {Object} context - O contexto (this) da classe
 * @param  {string[]} methods - Nomes dos métodos
 */
export function bindMethods(context, ...methods) {
  methods.forEach((method) => {
    context[method] = context[method].bind(context);
  });
}
