/*Não preciso me preocupar de usar métodos com o html, já que o DOM é baixado e colocado no escopo global dos arquivos
documento é o objeto raiz da árvore */
import { pegaDadosApi } from "./api.js";
function insertTable(corpo) {
    const tbody = document.getElementById("data_table");
    if (!(tbody === null)) {
        for (const transacao of corpo) {
            const tr = document.createElement("tr");
            tbody.appendChild(tr);
            const row = [transacao["Nome"], transacao["Email"], transacao["Valor (R$)"],
                transacao["Forma de Pagamento"], transacao["Status"]];
            for (const data of row) {
                const td = document.createElement("td");
                if (data === transacao["Valor (R$)"] && !(Number.isNaN(parseFloat(data)))) {
                    const previoustext = data.replace(/\./g, "").replace(",", ".");
                    td.textContent = Number(previoustext).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                }
                else
                    td.textContent = data;
                tr.appendChild(td);
            }
        }
    }
}
function insertStats(dados, ncorretos) {
    const totais = document.getElementById("transacoes");
    if (totais !== null) {
        const total = ncorretos.reduce((acc, n) => acc + n, 0);
        totais.textContent = total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }
    const acc = dados.reduce((acc, transacao) => {
        acc[transacao["Forma de Pagamento"]] = (acc[transacao["Forma de Pagamento"]] ?? 0) + 1;
        acc[transacao["Status"]] = (acc[transacao["Status"]] ?? 0) + 1;
        return acc;
    }, {});
    const cartao = document.getElementById("cartao");
    const boleto = document.getElementById("boleto");
    if (cartao !== null && boleto !== null) {
        [cartao.textContent, boleto.textContent] = [String(acc["Cartão de Crédito"]), String(acc["Boleto"])];
    }
    const [pagas, recusadas, aguardando, estornadas] = [document.getElementById("pagas"),
        document.getElementById("recusadas"), document.getElementById("aguardando"), document.getElementById("estornadas")
    ];
    if (pagas !== null && recusadas !== null && aguardando !== null && estornadas !== null)
        [pagas.textContent, recusadas.textContent, aguardando.textContent, estornadas.textContent] = [
            String(acc["Paga"]), String(acc["Recusada pela operadora de cartão"]), String(acc["Aguardando pagamento"]),
            String(acc["Estornada"])
        ];
}
function insertMelhorData(dado) {
    const datas = dado.map(x => x["Data"].slice(0, 10));
    const acc = datas.reduce((acc, data) => {
        acc[data] = (acc[data] ?? 0) + 1;
        return acc;
    }, {});
    let maximo = 0;
    for (const [dia, vezes] of Object.entries(acc)) {
        if (vezes >= maximo) {
            maximo = vezes;
        }
    }
    const diaArray = Object.entries(acc).filter((x) => x[1] === maximo);
    const htmldia = document.getElementById("dia");
    if (htmldia !== null && diaArray[0] !== undefined) {
        htmldia.textContent = diaArray[0][0];
    }
}
function correctForm(data) {
    const arraynumeros = data.map(x => Number((x["Valor (R$)"]).replace(/\./g, "").replace(",", ".")));
    const ncorretos = arraynumeros.map(y => Number.isNaN(y) ? 0 : y);
    return ncorretos;
}
async function main() {
    try {
        const dados = await pegaDadosApi();
        const ncorretos = correctForm(dados);
        insertTable(dados);
        insertStats(dados, ncorretos);
        insertMelhorData(dados);
    }
    catch (erro) {
        if (erro instanceof Error) {
            console.error("Erro ao carregar dados:", erro.message);
        }
    }
}
main();
