//quando inicia a página faz
window.onload = function () {
    //chama a função para atualizar os users
    //refreshUsers(); //adicionar função de validação ao formulário
    validator();
    document.getElementById("formNewUser").onsubmit = function (e) {
    //validação do formulário ao submeter
    validator();
    };

    //função de validação
function validator() {
    let validator = new Validator(document.querySelector('form[name="formNewUser"]'), function
    (err, res) {
    //se validador for válido, res=true e executa o saveUsers()
    if (res) {
    saveUsers();
    }
    }, {//cria novas regras, verificase o valor do campo que valida é igual ao campo pwd
    rules: {
    password: function (value) {
    return (value === document.getElementById("pwd").value);
    }
    },
    messages: {
    en: {
    password: {
    incorrect: "Password didn't match"
    }
    }
    }
    });
    }

    function saveUsers() {
        var data = {};
        data.name = document.getElementById("name").value;
        data.district = document.getElementById("distrito").value;
        data.birth = document.getElementById("date_birth").value;
        data.gender = document.querySelector('input[name = "genero"]:checked').value;
        data.email = document.getElementById("email").value;
        data.pass = document.getElementById("pwd").value;
        console.log(data); //debugging para ver os dados que foram enviados
        //chamada fetch para envio dos dados para o servior via POST
        fetch('http://localhost:8080/user_profile', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(data)
        }).then(function (response) {
        if (!response.ok) {
        console.log(response.status); //=> number 100–599
        console.log(response.statusText); //=> String
        console.log(response.headers); //=> Headers
        console.log(response.url); //=> String
        if (response.status === 409) {
        alert("Duplicated Email");
        } else {
        throw Error(response.statusText);
        }
        } else {
        document.getElementById("formNewUser").reset(); //limpeza dos dados do form
        alert("submitted with success");
        //refreshUsers();
        }
        }).then(function (result) {console.log(result);
        }).catch(function (err) {alert("Submission error"); console.error(err);
        });
        }
/*
        function refreshUsers() {
            async function fetchAsync() {
            const renderUsers = document.getElementById("result");
            let txt = "";
            const response = await fetch('http://localhost:8080/users');
            const users = await response.json();
            //criação de uma tabela para demonstração dos resultados recebidos
            txt += "<table class='table' style='padding:10px; width:70%; margin:0% 15% 0% 15%'>";
            txt += "<thead style='background-color:#607d8b; color:white '>";
            txt += "<tr><th>Name</th><th>Email</th><th>Reg. Date</th></tr></thead><tbody>";
            //percorrer a variável users e por cada user cria a linha da tabela com os dados presentes
            for (const user of users) {
            txt += "<tr><td style='text-align:right'>" + user.name + "</td><td>" + user.email + "</td><td>" +
            user.dateReg + "</td></tr>";
            }
            txt += "</tbody></table>";
            //envia a tabela construida para a view e mostra no object com ID result
            renderUsers.innerHTML = txt;
            }
            //chama a função fetchAsync()
            fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
            }*/
        }; 