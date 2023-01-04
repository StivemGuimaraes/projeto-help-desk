var matricula = document.getElementById("floatingInput1");
var botao_alterar = document.getElementById("botao_alterar");
var form = document.getElementById("form");
var senha = document.getElementById("floatingPassword2");
var senha2 = document.getElementById("floatingPassword3");
var modal = document.getElementById("exampleModal");
var botao_fechar = document.getElementById("botao_fechar");
var valor_matricula = matricula.value;

form.addEventListener("change", () => {
  if (
    valor_matricula !== matricula.value &&
    senha.value !== "" &&
    senha2.value !== ""
  ) {
    botao_alterar.setAttribute("data-bs-toggle", "modal");
    botao_alterar.setAttribute("data-bs-target", "#exampleModal");
    botao_alterar.removeAttribute("type");
    form.addEventListener("submit", function form_remove(e) {
      e.preventDefault();
      form.removeEventListener("submit", form_remove);

      matricula.addEventListener("change", () => {
        if (valor_matricula === matricula.value) {
          form.removeEventListener("submit", form_remove);
          botao_alterar.setAttribute("type", "submit");
          botao_alterar.removeAttribute("data-bs-toggle");
          botao_alterar.removeAttribute("data-bs-target");
        }
      });
    });
  }
});

modal.addEventListener("click", () => {
  botao_alterar.type = "button";
});
