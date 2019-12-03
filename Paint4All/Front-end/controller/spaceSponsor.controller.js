const server = 'http://localhost:8080/spaceSponsors/';
window.onload = function () 
{
    alert("pagina carregada com sucesso!!")
    refreshSpaceSponsors();
    validator();
    document.getElementById("formuser").onsubmit= function(e){
        //validaçao do formulario ao submeter
        validator();
    }
}




//funcao de validaçao
function validator()
{
    //vai selecionar o formulario que tem como nome formNewUser, para fazer a funcao validar 
        let validar = new validar (document.querySelector('form[name="formuser"]'), function (err, res) 
        {
            //se validar() for valido, res retorna true e executa o saveUsers
            if (res)
            {
                saveSpaceSponsors();
            }
        },
            {
            //vamos entao criar algumas regras para verificar se o valor do campo que valida é igual ao campo password
            rules:
            {
                password: function(value)
                {
                    return(value === document.getElementById("password").value);
                }
            },
            messages:
            {
                en: 
                {
                    password:
                    {
                        incorrect: "password nao correspondida"
                    }
                }
            }
            
        });
}


// funcao de gravaçao
function saveSpaceSponsors() 
{ 
    //data é uma variavel para um array, e quer armazenar os dados na data (array) 
    var data = {}; 
    data.nome = document.getElementById("nome").value; 
    data.n_patrocinador = document.getElementById("n_patrocinador").value;
    data.n_espaco = document.getElementById("n_espaco").value; 
    data.preco = document.getElementById("preco").value; 
    data.space_sponsor_date = document.getElementById("space_sponsor_date").value; 
    

    console.log(data); //debugging para ver os dados que foram enviados 


    //chamada fetch para envio dos dados para o servior via POST   
    fetch(server, 
    { 
        //cabecalho
        headers: 
        {
            'Content-Type': 'application/json'
        }, 
        //metodo utilizado
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    .then(function (response) 
    {
        if (!response.ok) 
    { 
            console.log(response.status); //=> number 100–599     
            console.log(response.statusText); //=> String     
            console.log(response.headers); //=> Headers     
            console.log(response.url); //=> String   

        if (response.status === 409) 
        { 
            alert("Duplicated id"); 
        } 
        else 
        { 
            throw Error(response.statusText); 
        } 
    } 
        else 
        { 
            document.getElementById("formuser").reset(); //limpeza dos dados do form 
            alert("submitted with success"); 
            refreshSpaceSponsors(); 
        } 
    }).then(function (result) 
    {
        console.log(result); 
    }).catch(function (err) 
    {
        alert("Submission error"); 
        console.error(err); 
    }); 
}




function refreshSpaceSponsors() {
    async function fetchAsync() {
    const renderSpaceSponsors = document.getElementById("result");
    let txt = "";
    const response = await fetch(server,);
    const spaceSponsors = await response.json();
    //criação de uma tabela para demonstração dos resultados recebidos
    txt += "<table class='table' style='padding:10px; width:70%; margin:0% 15% 0% 15%'>";
    txt += "<thead style='background-color:#607d8b; color:white '>";
    txt += "<tr><th>Name</th><th>Email</th><th>Reg. Date</th></tr></thead><tbody>";
    //percorrer a variável EspacoPatrocinador e por EspacoPatrocinadores cria a linha da tabela com os dados presentes
    for (const spaceSponsor of spaceSponsors) {
    txt += "<tr><td style='text-align:right'>" + user.name + "</td><td>" + user.email + "</td><td>" +
    user.dateReg + "</td></tr>";
    }
    txt += "</tbody></table>";
    //envia a tabela construida para a view e mostra no object com ID result
    renderSpaceSponsors.innerHTML = txt;
    }
    //chama a função fetchAsync()
    fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
}
    

       