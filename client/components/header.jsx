const { useState } = React;
const Header = () => {
  return (
    <>
      <header class="shadow border-secondary border-bottom py-3 mb-4 bg-dark">
        <div class="container-fluid">
          <div class="row align-items-center">
            <div class="col-md-2 col-sm-1 col-xl-1">
              <a
                href="/client/index.html"
                class="text-decoration-none text-white"
              >
                <img class="img-fluid float-start" src="" alt="logo aqui" />
              </a>
            </div>
            <div class="col-md-10 col-sm-11 col-xl-11">
              <a
                href="/client/index.html"
                class="text-white text-decoration-none"
              >
                <h1 class="text-start fs-2">academy help desk</h1>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

const Card1 = () => {
  return (
    <>
      <div class="col-md-4 col-lg-4" style={{ width: "15rem" }}>
        <div class="card rounded">
          <div class="card-body text-center">
            <img
              src="/client/public/img/headset.png"
              alt=""
              height="40%"
              width="40%"
            />
            <p class="mt-4" style={{ margin: "0" }}>
              Atendimento
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const Card2 = () => {
  return (
    <>
      <div class="col-md-4 col-lg-4" style={{ width: "15rem" }}>
        <div class="card rounded">
          <div class="card-body text-center">
            <img
              src="/client/public/img/users-avatar.png"
              alt=""
              height="40%"
              width="40%"
            />
            <p class="mt-4" style={{ margin: "0" }}>
              Clientes
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const Card3 = () => {
  return (
    <>
      <div class="col-md-4 col-lg-4" style={{ width: "15rem" }}>
        <div class="card rounded">
          <div class="card-body text-center">
            <img
              src="/client/public/img/documents.png"
              alt=""
              height="40%"
              width="40%"
            />
            <p class="mt-4" style={{ margin: "0" }}>
              Relatorios
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
ReactDOM.render(
  <>
    <Header />
    <div>
      <h1 class="text-center">
        aqui eu vou colocar uma imagem ou um Carrossel, o que voces acham
      </h1>
    </div>
    <div class="container">
      <div class="row g-5 d-flex justify-content-center">
        {/*odeio o react, era para reutilizar os componentes e não repetir eles*/}
        <Card1 />
        <Card2 />
        <Card3 />
      </div>
    </div>
  </>,
  document.getElementById("root")
);
