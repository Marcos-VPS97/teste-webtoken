const loginForm = document.getElementById('login-form');
const divLogin = document.querySelector("[data-js='loginAacess']")

const acessarRecursoButton = document.getElementById('acessar-recurso');
const acessarRecursoButtonDois = document.getElementById('acessarcaminho');
const serverIP = "192.168.0.113"
const serverPort = "3000"
const token = localStorage.getItem('token');


if (token) {
     acessarRecursoButton.style.display = 'block';
     acessarRecursoButtonDois.style.display = 'block';
} else {
     divLogin.style.display = "block"
}

// Manipulador de evento para o formulário de login
loginForm.addEventListener('submit', async (e) => {
     e.preventDefault();

     const username = document.getElementById('username').value;
     const password = document.getElementById('password').value;

     const data = {
          "nome": username,
          "senha": password
     }

     console.log(data)

     /* Fazer uma solicitação POST para o servidor para fazer login
     const response = await fetch(`http://${serverIP}:${serverPort}/login`, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
     });
     */



     axios.post(`http://${serverIP}:${serverPort}/login`, data)
          .then((response) => {


               /**/
               console.log(response.data)
               const token = response.data.token;

               // Armazenar o token no localStorage (ou em um local seguro)
               localStorage.setItem('token', token);

               // Mostrar o botão de acesso ao recurso protegido
               acessarRecursoButton.style.display = 'block';

          }).catch((error) => {
               alert('Falha no login. Credenciais inválidas.');
          });


});

// Manipulador de evento para o botão de acesso ao recurso protegido
acessarRecursoButton.addEventListener('click', () => {
     const token = localStorage.getItem('token');


     axios.get(`http://${serverIP}:${serverPort}/recurso-protegido`, {
          headers: {
               'Authorization': `Bearer ${token}`
          }
     })
          .then((response) => {

               console.log(response)
               alert(response.data.message)

          }).catch((error) => {
               const msg = error.response.data.message
               alert(`Falha ao acessar o recurso protegido.
                         \n messagem do servidor:
                         \n ${msg}  Voçe Não Tem Autorização`);

          });

});


// Manipulador de evento para o botão de acesso ao recurso protegido
acessarRecursoButtonDois.addEventListener('click', () => {
     const token = localStorage.getItem('token');


     axios.get(`http://${serverIP}:${serverPort}/rota-protegida`, {
          headers: {
               'Authorization': `Bearer ${token}`
          }
     })
          .then((response) => {

               console.log(response)
               alert(response.data.message)

          }).catch((error) => {
               const msg = error.response.data.message
               alert(`Falha ao acessar o recurso protegido.
                         \n messagem do servidor:
                         \n ${msg}  Voçe Não Tem Autorização`);

          });

});
