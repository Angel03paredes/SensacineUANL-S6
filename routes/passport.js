const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/usuarios");

passport.use(
  new LocalStrategy(
    {
      usernameField: "nickname",
      passwordField: "contra",
    },
    async (nickname, contra, done) => {
      console.log(nickname + contra);
      const user = await User.findOne({ nickname });
      if (!user) {
        console.log("usuario no encontrado");
        return done(null, false, { message: "Usuario no encontrado." });
      } else {
        const match = await user.matchPassword(contra);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Contraseña incorrecta." });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
