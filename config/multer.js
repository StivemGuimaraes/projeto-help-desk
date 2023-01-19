const multer = require("multer");
const path = require("path");

const upload_chamado_professor = () =>
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve("./public/upload/chamado_professor"));
      },
      filename: (req, file, cb) => {
        cb(null, Date.now().toString() + "_" + file.originalname);
      },
    }),
    fileFilter: (req, file, cb) => {
      var extensaoImg = path.extname(file.originalname).toLocaleLowerCase();

      if (
        extensaoImg == ".jpg" ||
        extensaoImg == ".png" ||
        extensaoImg == ".jpeg"
      ) {
        return cb(null, true);
      } else {
        cb("Apenas envio de arquivos de imagens", false);
      }
    },
  });

const upload_chamado_aluno = () =>
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "./public/upload/chamado_aluno"));
      },
      filename: (req, file, cb) => {
        cb(null, Date.now().toString() + "_" + file.originalname);
      },
    }),
    fileFilter: (req, file, cb) => {
      const extensaoImg = ["Image/png", "image/jpg", "image/jpeg"].find(
        (formatoAceito) => formatoAceito == file.mimetype
      );

      if (extensaoImg) {
        return cb(null, true);
      } else {
        return cb(null, false);
      }
    },
  });

const upload_aluno = () =>
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "./public/upload/aluno"));
      },
      filename: (req, file, cb) => {
        cb(null, Date.now().toString() + "_" + file.originalname);
      },
    }),
    fileFilter: (req, file, cb) => {
      const extensaoImg = ["Image/png", "image/jpg", "image/jpeg"].find(
        (formatoAceito) => formatoAceito == file.mimetype
      );

      if (extensaoImg) {
        return cb(null, true);
      } else {
        return cb(null, false);
      }
    },
  });

const upload_professor = () =>
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname + "/public/upload/professor"));
      },
      filename: (req, file, cb) => {
        cb(null, Date.now().toString() + "_" + file.originalname);
      },
    }),
    fileFilter: (req, file, cb) => {
      const extensaoImg = ["Image/png", "image/jpg", "image/jpeg"].find(
        (formatoAceito) => formatoAceito == file.mimetype
      );

      if (extensaoImg) {
        return cb(null, true);
      } else {
        return cb(null, false);
      }
    },
  });

module.exports = {
  upload_chamado_professor,
  upload_chamado_aluno,
  upload_aluno,
  upload_professor,
};
