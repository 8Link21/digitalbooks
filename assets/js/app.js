
const Home = {
  template: ` 
  <div>

  <div class="container-fluid p-0">
    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">

      <div class="carousel-inner wxc-caroussel">
        <div class="carousel-item active" data-interval="3000">
          <img src="../assets/img/lect1.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
          </div>
        </div>
        <div class="carousel-item" data-interval="3000">
          <img src="../assets/img/lect2.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h3>Partout avec vous</h3>
          </div>
        </div>
        <div class="carousel-item" data-interval="3000">
          <img src="../assets/img/lect3.png" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h3>En sécurité ...</h3>
          </div>
        </div>
        <div class="carousel-item" data-interval="3000">
          <img src="../assets/img/lect4.png" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h3>Dans votre poche</h3>
          </div>
        </div>
      </div>
    </div>

  </div>

<div class="jumbotron jumbotron-fluid bg-light">
  <div class="container">
    <h1 class="display-4">Digitalise ta bibliotèque</h1>
    <p class="lead">Share it and Make money</p>
    <p>DigitalBooks met à disposition des ouvrages scannés avec soin pour le plaisir de tous.</p>
    <button class="btn btn-outline-success">Comming Soon</button>
  </div>
</div>

</div>`
};


const Shop = {
  template: `<div>
  <main id="main" v-show='!finish'>
  <h1>
      Merci de votre visite.
  </h1>
</main>
  <main id="main" v-show='finish'>
  <div class="row">
      <div class="col-9 p-0">
          <div class="Shop container" v-if='sweech'>
              <div>
                  <div>
                      <select class="form-control form-control-sm mb-3 w-25" v-model="selected">
                          <option disabled value="">Catégorie</option>
                          <option>manga</option>
                          <option>humour</option>
                          <option>aventure</option>
                      </select>

                  </div>

                  <input type="text" placeholder="search your book" v-model="inputSearch" v-show="!selected" />
                  <p v-show="!selected" v-if="filterSearch == 0">
                      Aucune correspondance de votre livre: '{{ inputSearch }}'
                  </p>

                  <h2>Nos ouvrages</h2>
                  <div class="cardz d-flex flex-row flex-wrap justify-content-around">
                      <div v-for="book in filterSearch" :key="book.index">

                          <div class="card bg-light m-3" style="width: 11rem;">
                              <img class="card-img-top w-100 cardzimg" :src="book.img" />
                              <div class="card-body vert">
                                  <h5 class="card-title">{{ book.titre }}</h5>
                              </div>
                              <ul class="list-group list-group-flush">
                                  <li class="list-group-item p-1">parution: {{ book.date }}</li>
                                  <li class="list-group-item p-1">{{ book.stock }} en stock</li>
                              </ul>
                              <div class="card-body p-2">
                                  <button href="#" class="card-link btn vert"
                                      @click="updateCartDB(book)">{{ book.prix }} €</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>


      <div class="Shop container" v-if='!sweech'>

      <div class="row">
          <div class="col">
              <h1 class="mt-5">Pour valider votre panier veuillez suivre les indications.</h1>
          </div>
          <form class='w-75'>
              <div class="form-row">
                  <input type="text" required class="form-control m-5" placeholder="Nom" v-model="FNom">
                  <input type="text" required class="form-control m-5" placeholder="Prénom" v-model="FPrenom">
                  <input type="number" required class="form-control m-5" placeholder="Age" v-model="FAge">
                  <button @click.prevent="sendForm()" class="btn btn-block btn-success w-50 mt-3 mx-auto">send</button>
                  <div v-if='!sweech2'>
                      <h3 class="text-center"> Votre panier est de {{Total}}€ TTC</h3>
                      <input type="text" required class="form-control m-5" placeholder="Adress" v-model="FAdress">
                      <input type="number" required class="form-control m-5" placeholder="Code Postal" v-model="FCP">
                      <input type="text" required class="form-control m-5" placeholder="Ville" v-model="FVille">
                      <button @click.prevent="sendForm2()" class="btn btn-block btn-success w-50 mt-3 mx-auto">Finish</button>
                  </div>
              </div>
          </form>
      </div>
      </div>




      <div class="col-12 col-sm-3 order-2 p-0">
    <transition name="slide-fade">

        <!-- <Cart /> -->

        <div class="Shopp d-flex flex-column justify-content-center" v-if="cart.length > 0 && sweech ">
            <h2 class="mt-0">Panier de </h2>
            <h5>{{ssTotal}}€ HT</h5>
            <button class="btn btn-outline-success mb-3" @click.prevent='sweech=!sweech'>Buy</button>
            <div v-for='(c, id) in cart' :key='c.id'>
                <div class="border-success">
                    <img class="cardzimg2" :src="c.img">
                    <span class=" d-flex flex-column">
                        {{c.titre}}
                        {{c.prix}}€
                        x{{c.qtt}}
                    </span>
                    <div class="btn-group-sm mb-3" role="group" aria-label="Basic example">
                        <button type="button" class="btn py-0 btn-success" @click="plusQtt(c)">+</button>
                        <button type="button" class="btn py-0 btn-warning" @click="moinsQtt(c,id)">-</button>
                        <button type="button" class="btn py-0 btn-danger" @click="noQtt(id)">del</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
      </div>
  </div>
</main>
</div>`,
  data: () => {
    return {
      books: [
        {id: 1,titre: "Lord of the Ring v2",cat: "aventure",stock: 92,date: "21/11/1999",prix: 19,etat: "neuf",img: "../assets/img/aventure1.jpg"},
        {id: 2,titre: "Lord of the Ring v3",cat: "aventure",stock: 59,date: "21/11/1989",prix: 19,etat: "neuf",img: "../assets/img/aventure1.jpg"},
        {id: 3,titre: "Lord of the Ring v4",cat: "aventure",stock: 29,date: "21/11/1988",prix: 19,etat: "neuf",img: "../assets/img/aventure1.jpg"},
        {id: 4,titre: "Lord of the Ring v5",cat: "aventure",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/aventure1.jpg"},
        {id: 5,titre: "Terry Pratchett v1",cat: "aventure",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/aventure2.jpg"},
        {id: 6,titre: "Terry Pratchett v21",cat: "aventure",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/aventure2.jpg"},
        {id: 7,titre: "Terry Pratchett",cat: "aventure",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/aventure2.jpg"},
        {id: 8,titre: "Terry Pratchett",cat: "aventure",stock: 52,date: "21/03/2001",prix: 19,etat: "neuf",img: "../assets/img/aventure2.jpg"},
        {id: 9,titre: "Huxley",cat: "aventure",stock: 52,date: "21/03/2001",prix: 19,etat: "neuf",img: "../assets/img/aventure3.jpg"},
        {id: 10,titre: "Huxley",cat: "aventure",stock: 52,date: "21/03/2014",prix: 19,etat: "neuf",img: "../assets/img/aventure3.jpg"},
        {id: 11,titre: "Huxley",cat: "aventure",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/aventure3.jpg"},
        {id: 12,titre: "Huxley",cat: "aventure",stock: 52,date: "21/03/2014",prix: 19,etat: "neuf",img: "../assets/img/aventure3.jpg"},
        {id: 13,titre: "c rigolo v1",cat: "humour",stock: 52,date: "13/10/2016",prix: 19,etat: "neuf",img: "../assets/img/humour1.jpg"},
        {id: 14,titre: "c rigolo v2",cat: "humour",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/humour1.jpg"},
        {id: 15,titre: "l'humour c'est la vie v1",cat: "humour",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/humour1.jpg"},
        {id: 16,titre: "l'humour c'est la vie v1",cat: "humour",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/humour1.jpg"},
        {id: 17,titre: "c rigolo v7",cat: "humour",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/humour2.jpg"},
        {id: 18,titre: "c rigolo v4",cat: "humour",stock: 52,date: "13/10/2016",prix: 19,etat: "neuf",img: "../assets/img/humour2.jpg"},
        {id: 19,titre: "c rigolo v1",cat: "humour",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/humour2.jpg"},
        {id: 20,titre: "l'humour c'est la vie v1",cat: "humour",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/humour2.jpg"},
        {id: 21,titre: "l'humour c'est la vie v1",cat: "humour",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/humour3.png"},
        {id: 22,titre: "c rigolo v1",cat: "humour",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/humour3.png"},
        {id: 23,titre: "c rigolo v1",cat: "humour",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/humour3.png"},
        {id: 24,titre: "c rigolo v1",cat: "humour",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/humour3.png"},
        {id: 26,titre: "Lesnuls",cat: "manga",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/manga1.jpg"},
        {id: 27,titre: "c rigolo v1",cat: "manga",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/manga1.jpg"},
        {id: 28,titre: "Lesnuls",cat: "manga",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/manga1.jpg"},
        {id: 29,titre: "ples + nuls",cat: "manga",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/manga3.jpg"},
        {id: 30,titre: "Lesnuls",cat: "manga",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/manga2.jpg"},
        {id: 31,titre: "Best of Nuls",cat: "manga",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/manga2.jpg"},
        {id: 32,titre: "Lesnuls",cat: "manga",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/manga2.jpg"},
        {id: 33,titre: "nulls",cat: "manga",stock: 52,date: "21/11/2001",prix: 19,etat: "neuf",img: "../assets/img/manga3.jpg"}
      ],
      inputSearch: "",
      cart: [],
      selected: null,
      sweech: true,
      sweech2: true,
      finish: true,
      FNom: "",
      FPrenom: "",
      FAge: null,
      FAdress: "",
      FCP: null,
      FVille: "",
    };
  },
  computed: {
    // books() {
    //   return this.$store.state.books;
    // },
    // cart() {
    //   return this.$store.state.me.cart;
    // },
    filterSearch() {
      if (!this.selected) {
        return this.books.filter((book) => {
          return (
            book.titre.toLowerCase().indexOf(this.inputSearch.toLowerCase()) !==
            -1
          );
        });
      } else {
        return this.books.filter((book) => {
          return book.cat.toLowerCase().includes(this.selected);
        });
      }
    },
    ssTotal() {
      let sum = 0;
      for (pan in this.cart) {
        sum += this.cart[pan].qtt * this.cart[pan].prix;
      }
      return sum;
    },
    Total() {
      let ssT = this.ssTotal;
      return (ssT += ssT / 5);
    },
  },
  methods: {
    updateCartDB(book) {
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id == book.id) {
          if (this.books.stock == 0) {
            alert("Victime de son succès !");
          } else {
            this.books.stock--;
            return this.cart[i].qtt++;
          }
        }
      }
      // book.qtt = 1;
      // this.$store.commit({
      //   type: 'UPD_CART',
      //   amount: {
      //     id: book.id,
      //     titre: book.titre,
      //     prix: book.prix,
      //     img: book.img,
      //     qtt: 1
      //   }
      //   });
      this.cart.push({
        id: book.id,
        titre: book.titre,
        prix: book.prix,
        img: book.img,
        qtt: 1,
      });
      localStorage.setItem("jsonCart", JSON.stringify(this.cart));
    },
    clearCartDB() {
      // -------------------------------------->>>> A POSER APRES LA VALIDATION D'ACHAT
      this.cart = [];
      localStorage.clear();
    },
    plusQtt(pan) {
      pan.qtt += 1;
    },
    moinsQtt(pan, id) {
      if (pan.qtt == 1) {
        this.noQtt(id);
      } else {
        pan.qtt -= 1;
      }
    },
    noQtt(id) {
      this.$delete(this.cart, id);
    },
    sendForm() {
      this.sweech2 = !this.sweech2;
    },
    sendForm2() {
      this.clearCartDB();
      localStorage.clear();
      this.finish = !this.finish;
    },
  },
  mounted: function () {
    // will execute at pageload
    // (!localStorage.jsonCart) ? localStorage.setItem("jsonCart", []) : this.cart = JSON.parse(localStorage.getItem("jsonCart"))
    if (!localStorage.jsonCart) {
      localStorage.setItem("jsonCart", []);
    } else {
      this.cart = JSON.parse(localStorage.getItem("jsonCart"));
    }
  },
};

const Contact = {
  template: `
<div>
<div class="container d-flex justify-content-center">
<div class="row">
    <div class="w-50" v-if="Tog">
        <h2> Restons en contact </h2>
        <form>
            <div class="form-row">
                <input type="text" required class="form-control m-5" placeholder="prenom" v-model="nameC">
                <input type="text" required class="form-control m-5" placeholder="mail" v-model="mailC">
            </div>
        </form>
    </div>
    <textarea v-model="msgC" class="form-control w-50"
        placeholder="C'est ici que vous pouvez écrire le roman de votre vie. Nous prendrons grand plasir à ne jamais le lire mais nous comptons sur vous pour vous engager. Allez ... 😘 "
        required>
    </textarea>
    <button @click="sendContact()" class="btn btn-block btn-success mt-3 mx-auto">send</button>
    <div class="container" v-if="!Tog">
        <div class="row justify-content-center">
            <div class="col w-25 vh-100 d-flex flex-column text-center">

            </div>
        </div>
    </div>
</div>
</div>
</div>`,
  data: function () {
    return {
      nameC: "",
      mailC: "",
      msgC: "",
      Tog: true,
    };
  },
  methods: {
    sendContact() {
      if (this.nameC && this.mailC && this.msgC) {
        this.msgC = "see you ✌🏼";
        this.Tog = !this.Tog;
      } else {
        this.nameC = "";
        this.mailC = "";
        this.msgC = "recommence ...";
      }
    },
  },
};

const GoldenBook = {
  template: `
    <div id="goldenbook">
    <div class="GoldenBook d-flex flex-column h-100 justify-content-around">

    <div class="container wxc-com w-50 overflow-auto align-items-start" v-show='!toggleForm'>

        <div class="card text-center m-0 p-0" v-for='gold in goldenbook' :key='gold.index'>
            <div class="card-header bg-light">
                {{gold.nick}}
            </div>
            <div class="card-body text-center m-1 p-0">
                <p class="card-text">{{gold.com}}</p>
            </div>
            <div class="card-footer text-muted mx-center m-1 p-0">
                {{gold.date}}
            </div>
        </div>

    </div>

    <div class="container w-50 px-5 mb-5 align-items-end">

        <div v-show='toggleForm'>
            <h3>un mot à nous partager ?</h3>
            <p>ceux qui l'ont fait ont passé une meilleure journée </p>
        </div>

        <form>
            <input type="text" class="mb-2" placeholder="Manon Laconde" required @keyup.enter="checkName()" v-model="nick">
            <textarea class="form-control" id="formGoldenBook" type="text" @keyup.enter="checkCom()" rows="3" v-model="com"
                placeholder="Dites quelque chose de gentil..."></textarea>

            <button type="reset" class="w-25 mx-3 mt-3 btn btn-danger" @click.prevent='onReset' >Reset</button>
            <button type="submit" class="w-25 mx-3 mt-3 btn btn-success" @click.prevent='onSubmit' v-show='this.toggleForm'>Merci</button>
        </form>

    </div>

</div>
    </div>`,
  data: () => {
    return {
      toggleForm: true,
      goldenbook: [
        { nick: "Los del rio", date: "12/10/2020", com: "C'est génial" },
        {
          nick: "Harwey Specter",
          date: "10/10/2020",
          com: "Si vous continuez come ça je vais me remettre à lire",
        },
        {
          nick: "Lisa J. Tee ",
          date: "9/10/2020",
          com: "Pil ce qu'il me fallait !",
        },
      ],
      nick: null,
      date: null,
      com: null,
    };
  },
  computed: {
    // isValid : function() {
    //   (this.checkName && this.checkCom) ? !this.isValid : this.isValid
    // }
  },
  methods: {
    checkName() {
      let x = this.nick;
      return x && typeof x === "string" && x.length > 3 && x.length < 16
        ? true
        : false;
    },
    checkCom() {
      let x = this.com;
      return x && typeof x === "string" && x.length >= 7 && x.length < 175
        ? true
        : false;
    },
    onSubmit() {
      if (this.checkName(this.nick) && this.checkCom(this.com)) {
        let d = new Date();
        var date =
          d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
        this.date = date;
        this.goldenbook.push({ nick: this.nick, date: date, com: this.com });
        this.toggleForm = !this.toggleForm;
        this.nick = "";
        this.date = null;
        this.com = "";
      } else {
        return false;
      }
    },
    onReset() {
      this.nick = "";
      this.date = null;
      this.com = "";
      // Trick to reset/clear native browser form validation state
      this.toggleForm = false;
      this.$nextTick(() => {
        this.toggleForm = true;
      });
    },
  },
};

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/shop", name: "Shop", component: Shop },
  { path: "/contact", name: "contact", component: Contact },
  { path: "/goldenbook", name: "GoldenBook", component: GoldenBook },
];

const router = new VueRouter({
  routes: routes,
});

var vm = new Vue({
  el: "#app",
  data: {},
  components: {},
  router: router,
});
