
const textoTextarea = document.getElementById("textarea");
const contador = document.getElementById("contador");

if (textoTextarea && contador) {
  textoTextarea.addEventListener("input", () => {
    contador.textContent = textoTextarea.value.length;
  });
}


function aplicarTema(tema) {
  const preferenciaSistema = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );

  function atualizarTema() {
    if (tema === "sistema") {
      document.documentElement.dataset.tema =
        preferenciaSistema.matches ? "escuro" : "claro";
    } else {
      document.documentElement.dataset.tema = tema;
    }
  }

  atualizarTema();

  preferenciaSistema.onchange = () => {
    if (tema === "sistema") {
      atualizarTema();
    }
  };

  try {
    localStorage.setItem("tema", tema);
  } catch (e) {}
}

try {
  const temaSalvo = localStorage.getItem("tema") || "sistema";
  aplicarTema(temaSalvo);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (localStorage.getItem("tema") === "sistema") {
        aplicarTema("sistema");
      }
    });
} catch (e) {}

async function feedback() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("textarea").value.trim();

  if (nome === "" && email === "" && mensagem === "") {
    alert("Preencha o nome, o e-mail e o feedback.");
    return;
  }

  if (nome === "") {
    alert('O campo "Nome" é obrigatório.');
    return;
  }

  if (email === "") {
    alert('O campo "E-mail" é obrigatório.');
    return;
  }

  if (mensagem === "") {
    alert('O campo "Feedback" é obrigatório.');
    return;
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailValido) {
    alert("Digite um endereço de e-mail válido.");
    return;
  }

  try {
    const resposta = await fetch("https://formspree.io/f/mvkgywwq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
        mensagem: mensagem,
      }),
    });

    if (resposta.ok) {
      alert("Feedback enviado! Obrigado.");

      document.getElementById("nome").value = "";
      document.getElementById("email").value = "";
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
    localStorage.setItem(
      "legendas",
      ligadas ? "ligadas" : "desligadas"
    );
  } catch (e) {}
}

let legendasLigadas = true;

try {
  legendasLigadas =
    localStorage.getItem("legendas") !== "desligadas";
} catch (e) {}

aplicarLegendas(legendasLigadas);

const caixaLegendas = document.getElementById("check-legenda");

if (caixaLegendas) {
  caixaLegendas.checked = legendasLigadas;

  caixaLegendas.addEventListener("change", () => {
    aplicarLegendas(caixaLegendas.checked);
  });
}
