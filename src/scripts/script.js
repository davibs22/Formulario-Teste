var DadosValidados = 0

//Função para enviar os dados
$("#ButtonEnviar").click(function() {
    var InputName = document.getElementById("InputName").value
    var InputDateOfBirth = document.getElementById("InputDateOfBirth").value
    var InputCPF = document.getElementById("InputCPF").value
    var InputCellPhone = document.getElementById("InputCellPhone").value
    var InputEmail = document.getElementById("InputEmail").value
    var InputCEP = document.getElementById("InputCEP").value
    var InputAddress = document.getElementById("InputAddress").value
    var InputNumber = document.getElementById("InputNumber").value
    var InputComplement = document.getElementById("InputComplement").value
    var InputNeighborhood = document.getElementById("InputNeighborhood").value
    var InputCity = document.getElementById("InputCity").value
    var InputUF = document.getElementById("InputUF").value
    var InputBio = document.getElementById("InputBio").value

    //Validando dados do formulário
    if (InputName == ""){
        alert( "Preencha campo Nome é obrigatório." )
        DadosValidados += 1
    }
    if (InputDateOfBirth == ""){
        alert( "Preencha campo Data de Nascimento é obrigatório." )
        DadosValidados += 1
    }
    if (InputCPF == ""){
        alert( "Preencha campo CPF é obrigatório." )
        DadosValidados += 1
    }
    if (InputCellPhone == ""){
        alert( "Preencha campo Celular é obrigatório." )
        DadosValidados += 1
    }
    if (InputEmail == ""){
        alert( "Preencha campo Email é obrigatório." )
        DadosValidados += 1
    }
    if (InputCEP == ""){
        alert( "Preencha campo CEP é obrigatório." )
        DadosValidados += 1
    }
    if (InputAddress == ""){
        alert( "Preencha campo Logradouro é obrigatório." )
        DadosValidados += 1
    }
    if (InputNumber == ""){
        alert( "Preencha campo Número é obrigatório." )
        DadosValidados += 1
    }
    if (InputNeighborhood == ""){
        alert( "Preencha campo Bairro é obrigatório." )
        DadosValidados += 1
    }
    if (InputCity == ""){
        alert( "Preencha campo Cidade é obrigatório." )
        DadosValidados += 1
    }
    if (InputUF == ""){
        alert( "Preencha campo UF é obrigatório." )
        DadosValidados += 1
    }

    var dados = [
        {
            'Name': InputName,
            'DateOfBirth': InputDateOfBirth,
            'CPF': InputCPF,
            'CellPhone': InputCellPhone,
            'Email': InputEmail,
            'CEP': InputCEP,
            'Address': InputAddress,
            "Number": InputNumber,
            'Complement': InputComplement,
            'Neighborhood': InputNeighborhood,
            'City': InputCity,
            'UF': InputUF,
            'Bio': InputBio 
        }
    ]

    //Condição para imprimir no console os dados já validados
    if (DadosValidados == 0){
        console.log("Dados Corretos")
        console.log(dados)
    }
})

//Função que iniciar após a pagina está totalmente carregada
$(document).ready(function(){

    $("#InputCPF").mask("000.000.000-00")
    $("#InputCellPhone").mask("(00) 00000-0000")
    $("#InputCEP").mask("00000-000")

    $("#formRegister").validate({
        rules:{
            email: {
              required: true,
              email: true  
            }
        }
    })

    function limpa_formulario_cep() {
        // Limpando valores do formulário de cep.
        $("#InputAddress").val("");
        $("#InputNeighborhood").val("");
        $("#InputCity").val("");
        $("#InputUF").val("");
    }

    //Quando o campo cep perde o foco.
    $("#InputCEP").blur(function() {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '')

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Preenche os campos com "..." enquanto consulta webservice.
            $("#InputAddress").val("...")
            $("#InputNeighborhood").val("...")
            $("#InputCity").val("...")
            $("#InputUF").val("...")
            
            //Consulta CEP no Postmon
            fetch("https://api.postmon.com.br/v1/cep/" + cep, {method: "GET"})
                .then(function(response){
                    response.json().then(function(data){

                    //Atualiza os campos com os valores da consulta.
                    $("#InputAddress").val(data.logradouro)
                    $("#InputNeighborhood").val(data.bairro)
                    $("#InputCity").val(data.cidade)
                    $("#InputUF").val(data.estado)
                    })
                })
                //cep é inválido.
                .catch(function(err) {
                    console.log("CEP Invalido")
                })
                           
        } else {
            //cep sem valor, limpa formulário.
            limpa_formulario_cep()
        }
    })


})