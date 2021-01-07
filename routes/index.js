const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Usuario = require("../models/usuarios");
const passport = require("passport");
const { isAuthenticated, isadmin } = require("./authenticate");
const Articulos = require("../models/articulos");
const Carrito = require("../models/carrito");
const Ventas = require('../models/ventas');
const Cartelera = require('../models/cartelera');

//#region productos
////////////////////////Productos
router.post('/alta_producto',isAuthenticated,isadmin,async(req,res)=>{
const data = new Articulos(req.body);
data.file = req.file.filename;
await data.save();
  res.redirect("/c_productos");
});

router.get('/delete_articulos/:id' ,isAuthenticated,isadmin, async(req,res)=>{
const {id} = req.params;
await Articulos.remove({_id : id});
res.redirect("/c_productos")
});

router.get('/fill_articulos/:id',isAuthenticated,isadmin, async(req,res)=>{
  const {id} = req.params;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const articulo = await Articulos.findById(id);
    if(articulo == null)
    res.redirect("/perfil");
    res.render("crud_productos",{articulo});
  }else{
    res.redirect("/perfil");
  }
  
  });

  router.get('/c_productos',isAuthenticated,isadmin, async (req,res)=>{
    const articulos = await Articulos.find();
    res.render('crud_productos',{articulos});
  });

  router.post('/update_producto',isAuthenticated,isadmin,async (req,res)=>{
    const id = req.query.id;
    const data = req.body;
    data.file = req.file.filename;
    await Articulos.updateOne({_id:id},data);
    console.log(data);
    res.redirect("/c_productos");
  })

/////////////////////Productos
//#endregion productos

router.post("/venta",isAuthenticated,async(req,res)=>{
const data = new Ventas(req.body);


const articulo = await Articulos.findById(data.idproducto);
var u_cant = articulo.cantidad - parseFloat(data.cantidad); 
if(u_cant < 0)
return res.json("no");
if(u_cant <= 0)
u_cant = 0;
await data.save();
await Articulos.updateOne({_id:data.idproducto},{cantidad: u_cant});
  res.json("si");
});

router.get('/tienda',async(req,res)=>{
  const page = parseInt(req.query.page  || 1);
  const articulos = await Articulos.paginate({},{ limit: 9 , sort:{producto:'asc'} , page});
  const articulos2 = await Articulos.find();
  var array = [];
  for(var i = 0 ; i < articulos2.length; i++){
    array.push(articulos2[i].producto);
  }
  res.render('tienda',{articulos,datas:articulos.docs,autocomplete: JSON.stringify(array)});
  });

  router.post('/buscar',async (req,res)=>{
const {buscar} = req.body;
if(buscar == "")
res.redirect('/tienda');
const articulos = await Articulos.find({producto:{ $regex: '.*' + buscar + '.*',$options:"i" }});
const articulos2 = await Articulos.find();
var array = [];
for(var i = 0 ; i < articulos2.length; i++){
  array.push(articulos2[i].producto);
}
res.render('tienda',{articulos:{prevPage:null,nextPage:null},datas:articulos,autocomplete: JSON.stringify(array)});
  });

  router.get('/cartelera',async(req,res)=>{
const carteleras = await Cartelera.find();
    res.render('cartelera',{carteleras});
    });

    router.get('/aboutus',(req,res)=>{
      res.render('about');
      });
  

  router.get('/peliculas',(req,res)=>{
    res.render('index');
    });

    router.get('/series',(req,res)=>{
      res.render('index');
      });

      router.get('/avances',(req,res)=>{
        res.render('index');
        });
    
  router.get('/perfil',isAuthenticated,(req,res)=>{
res.render('404page');
  });
      

  router.post('/tarjeta',(req,res)=>{
    res.json("respuesta");
    });

    router.get('/articulo',isAuthenticated,async(req,res)=>{
      const id =req.query.id;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const articulo = await Articulos.findById(id);
      const page = parseInt(req.query.page  || 1);
      const articulos = await Articulos.paginate({},{ limit: 3 , sort:{producto:'asc'} , page});
      if(articulo == null)
      res.render("404page");
      else
      res.render('articulo',{articulo,articulos});
      }
      else{
        res.render("404page");
      }
      });
    
      router.get('/articulo_addcarrito',isAuthenticated,async(req,res)=>{
        const id =req.query.id;
        const iduser = req.user._id;
        const carrito = new Carrito({idusuario: iduser, idarticulo: id});
        await carrito.save();
        const articulo = await Articulos.findById(id);
        const page = parseInt(req.query.page  || 1);
        const articulos = await Articulos.paginate({},{ limit: 3 , sort:{producto:'asc'} , page});
        res.render('articulo',{articulo,articulos});
        });

  router.get('/carrito',isAuthenticated,async(req,res)=>{
    const id =    req.user._id;

    const idarticulos = await Carrito.find({idusuario:id});
    let array = [];
for(var i = 0; i < idarticulos.length; i++){
  const articulo = await Articulos.findById(idarticulos[i].idarticulo);
  array.push(articulo);
}
    res.render('carrito',{array,array2:JSON.stringify(array)});
    });

router.get('/delete_carrito',isAuthenticated,async(req,res)=>{
  const id = req.query.id;
  await Carrito.remove({idarticulo:id});
res.redirect("/carrito");
});

router.get('/c_avances',isAuthenticated,isadmin,(req,res)=>{
res.render('crud_avances');
});

router.get('/c_cartelera',isAuthenticated,isadmin,(req,res)=>{
  res.render('crud_cartelera');
});

router.post('/alta_cartelera',isAuthenticated,isadmin,async(req,res)=>{
const cartelera = new Cartelera(req.body);
cartelera.file = req.file.filename;
await cartelera.save();
res.render("crud_cartelera");
});

router.get('/c_noticias',isAuthenticated,isadmin,(req,res)=>{
  res.render('crud_noticias');
});
    
router.get('/c_peliculas',isAuthenticated,isadmin,(req,res)=>{
  res.render('crud_peliculas');
});

router.get('/c_series',isAuthenticated,isadmin,(req,res)=>{
  res.render('crud_series');
});

router.get("/admin",isAuthenticated,isadmin, async (req, res) => {
const ventas = await Ventas.find();
const articulos = await Articulos.find();
  res.render("admin",{ventas: JSON.stringify(ventas),articulos: JSON.stringify(articulos)});
});

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/modalsession", (req, res) => {
  res.render("index");
});

router.get("/falla", (req, res) => {
  res.render("index");
});

//#region session

router.post("/sesion", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (!user) {
      return res.json("error");
    }
    req.logIn(user, (err) => {
      if (err) {
        console.log(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});

router.get("/cerrarsession", async (req, res) => {
  req.logout();
  res.redirect("/");
});

router.post("/registro", async (req, res) => {
  const { correo, nickname, contra, c_contra } = req.body;
  const usuario = new Usuario({ correo, nickname, contra });
  const check_usuario = await Usuario.findOne({nickname});
  usuario.contra = await usuario.encryptPassword(contra);
  if(check_usuario){
    res.json("6");
  }
    else if (contra != c_contra) {
      res.json("3"); //error al confirmar
    
  }else if (contra.length < 8 || contra.length > 20) {
    res.json("4"); //debe ser de 8  - 20 charters
  } else {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sensacinefcfm@gmail.com",
        pass: "sensacine123",
      },
    });
    contenido = `<div style="background-color: #FFC017;width:100%;height:200px;padding-top:100px"><center><img src="https://assets.sensacine.com.mx/skin/img/sensacinemx/logo-main-0798862ef8.svg" style="width:500px; height:100px"></center></div> 
  <div style="background-color:#181818;width:100%;height:auto;padding : 9px"><p style="color:white;font-size:24px"> Hola ${nickname}, gracias por ser parte de nuestro grupo de cinéfilos. Guarda tus datos.</p>
  <p style="color:white;font-size:18px">Nombre de usuario: ${nickname}.</p>
  <p style="color:white;font-size:18px">Contraseña: ${contra}.</p>
  <p style="color:white;font-size:18px">Disfruta de Sensacine México.¡Somos de los tuyos!</p> 
  </br><center><img src="http://k40.kn3.net/taringa/4/1/1/2/9/9/6/delorean31/707.gif?584"></center> </br>
  </div> 
  `;
    const mail = {
      from: '"Jesus Angel Paredes Sauceda 👍🏼" <sensacinefcfm@gmail.com>',
      to: correo,
      subject: "¡ Bienvenido a Sensacine México !",
      html: contenido,
    };

    transporter.sendMail(mail, function (err, res) {
      if (err) res.json("2"); //emailnoexiste
    });

    await usuario.save();
    res.json("1");
    //exitoso
  }
});

router.use(function(req, res, next) {
  if(req.accepts('html') && res.status(404)) {
    
      res.render('404page');
      return;
  }
});
//#endregion session

module.exports = router;
