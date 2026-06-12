/* type guard é uma função que retorna um booleano que diz a respeito
 sobre o tipo do parâmetro usado através de type predicate: value is value
 typeof value === "string_do_valor, não ele literal"
 
[
  {
    "Status": "Paga",
    "ID": 32323221,
    "Data": "01/09/2022 01:21",
    "Nome": "Owen Hill",
    "Forma de Pagamento": "Cartão de Crédito",
    "Email": "o.hill@email.com",
    "Valor (R$)": "452,00",
    "Cliente Novo": 1
  }, ]*/
function isInterface(value) {
    if (typeof value === "object" && value !== null) {
        return true;
    }
    return false;
}
function isArrayobj(valor) {
    if (!(Array.isArray(valor))) {
        return false;
    }
    const value = valor;
    if (value.every((x) => isInterface(x))) {
        return true;
    }
    else
        return false;
}
export function isApi(body) {
    const corpo = body;
    if (isArrayobj(corpo)) {
        if (corpo.every(y => typeof y.Status === "string" &&
            typeof y.ID === "number" &&
            typeof y.Data === "string" &&
            typeof y.Nome === "string" &&
            typeof y["Forma de pagamento"] === "string" &&
            typeof y.Email === "string" &&
            typeof y["Valor (R$)"] === "string" &&
            typeof y["Cliente novo"] === "number")) {
            return true;
        }
        else
            return false;
    }
    else
        return false;
}
