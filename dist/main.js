/*Não preciso me preocupar de usar métodos com o html, já que o DOM é baixado e colocado no escopo global dos arquivos
documento é o objeto raiz da árvore */
import { pegaDadosApi } from "./api";
function insertTable(corpo) {
    const tbody = document.getElementById("data_table");
    if (!(tbody === null)) {
        for (const transacao of corpo) {
            const tr = document.createElement("tr");
            tbody.appendChild(tr);
            const row = [transacao.status, transacao.id, transacao.data,
                transacao.nome, transacao.tipo_pgt, transacao.email, transacao.valor, transacao.novo];
            for (const data of row) {
                const td = document.createElement("td");
                td.textContent = String(data);
                tr.appendChild(td);
            }
        }
    }
}
function insertStats(dados, ncorretos) {
    const totais = document.getElementById("transacoes");
    if (totais !== null) {
        const total = ncorretos.reduce((acc, n) => acc + n);
        totais.textContent = total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }
    const acc = dados.reduce((acc, transacao) => {
        acc[transacao.tipo_pgt] = (acc[transacao.tipo_pgt] ?? 0) + 1;
        acc[transacao.status] = (acc[transacao.status] ?? 0) + 1;
        return acc;
    }, {});
    const cartao = document.getElementById("cartao");
    const boleto = document.getElementById("boleto");
    if (cartao !== null && boleto !== null && typeof acc === "object" && acc !== null) {
        [cartao.textContent, boleto.textContent] = [String(acc["Cartão de Crédito"]), String(acc["Boleto"])];
    }
    const [pagas, recusadas, aguardando, estornadas] = [document.getElementById("pagas"),
        document.getElementById("recusadas"), document.getElementById("aguardando"), document.getElementById("estornadas")
    ];
    if (pagas !== null && recusadas !== null && aguardando !== null && estornadas !== null)
        [pagas.textContent, recusadas.textContent, aguardando.textContent, estornadas.textContent] = [
            String(acc["Paga"]), String(acc["Aguardando pagamento"]), String(acc["Estornada"]), String(acc["Recusada"])
        ];
}
function insertTotalCalculus(ncorretos) {
    const total = ncorretos.reduce((acc, x) => acc + x);
    const span = document.getElementById("transacoes");
    if (span !== null) {
        span.textContent = String(total);
    }
}
async function insertMelhorDia() { }
function correctForm(data) {
    const arraynumeros = data.map(x => Number((x.valor).replace(/\./, "").replace(",", "."))); // Só para lembrar que o número precisa estar como 1200.2
    const ncorretos = arraynumeros.map(y => {
        if (!(typeof y === "number")) {
            return 0;
        }
        return y;
    });
    return ncorretos;
}
async function main() {
    const dados = await pegaDadosApi();
}
