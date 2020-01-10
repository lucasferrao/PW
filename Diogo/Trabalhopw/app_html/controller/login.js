window.onload = function() {
    const urlBase = "https://fcawebbook.herokuapp.com"
  
    const btnLogin = document.getElementById("btnLogin")
    
  

}  
btnLogin.addEventListener("click", function() {
    swal({
      title: "Acesso à área de gestão da WebConference",
      html:
      '<input id="txtEmail" class="swal2-input" placeholder="e-mail">' +
      '<input id="txtPass" class="swal2-input" placeholder="password">',      
      showCancelButton: true,
      confirmButtonText: "Entrar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const email = document.getElementById('txtEmail').value
        const pass = document.getElementById('txtPass').value
        return fetch(`${urlBase}/signin`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },          
          method: "POST",
          body: `email=${email}&password=${pass}`
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch(error => {
            swal.showValidationError(`Pedido falhado: ${error}`);
          });
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then(result => {
      console.log(result.value)
      
      if (result.value.sucesss) {                       
          swal({title: "Autenticação feita com sucesso!"})
          window.location.replace("admin/participants.html")  
        } else {
          swal({title: `${result.value.message.pt}`})  
        }
      
    });
  });

