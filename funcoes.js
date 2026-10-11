let textoTextarea = document.getElementById("textarea");
let contador = document.getElementById("contador");

textoTextarea.addEventListener("input", () => {
  contador.textContent = textoTextarea.value.length;
});

function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema;
  try {
    localStorage.setItem("tema", tema);
  } catch (e) {}
}

function modoEscuro() {
  aplicarTema("escuro");
}
function modoClaro() {
  aplicarTema("claro");
}

try {
  aplicarTema(localStorage.getItem("tema") || "claro");
} catch (e) {}

async function feedback() {
  const nome = document.getElementById("nome").value.trim();
  const mensagem = document.getElementById("textarea").value.trim();

  if (nome === "" && mensagem === "") {
    alert('Os campos "nome" e "feedBack" são obrigatórios.');
    return;
  }
  if (nome === "") {
    alert('O campo "nome" é obrigatório.');
    return;
  }
  if (mensagem === "") {
    alert('O campo "feedBack" é obrigatório.');
    return;
  }

  try {
    const resposta = await fetch("https://formspree.io/f/mvkgywwq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ nome: nome, mensagem: mensagem }),
    });

    if (resposta.ok) {
      alert("feedBack Enviado! Obrigado.");
      document.getElementById("nome").value = "";
      document.getElementById("textarea").value = "";
      document.getElementById("contador").textContent = "0";
    } else {
      alert("Não foi possível enviar agora. Tente novamente mais tarde.");
    }
  } catch (erro) {
    alert("Erro de conexão. Verifique sua internet e tente de novo.");
  }
}

function aplicarLegendas(ligadas) {
  document.documentElement.dataset.legendas = ligadas
    ? "ligadas"
    : "desligadas";
  try {
    localStorage.setItem("legendas", ligadas ? "ligadas" : "desligadas");
  } catch (e) {}
}

let legendasLigadas = true;
try {
  legendasLigadas = localStorage.getItem("legendas") !== "desligadas";
} catch (e) {}
aplicarLegendas(legendasLigadas);

const caixaLegendas = document.getElementById("check-legenda");
if (caixaLegendas) {
  caixaLegendas.checked = legendasLigadas;
  caixaLegendas.addEventListener("change", () => {
    aplicarLegendas(caixaLegendas.checked);
  });
}
