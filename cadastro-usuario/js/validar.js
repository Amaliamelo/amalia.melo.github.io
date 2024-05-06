//criando os objetos dos elementos de texto do form

var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
nome.addEventListener('focusout', validarNome);

/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/

function validarNome(e){ 
    //declaração da expressão regular para definir o formato de um nome válido
    const regexNome = /^[A-Z][a-z]{6,}$/;
    
    console.log(e); //impressão em console do objeto evento e
    console.log(e.target.value); //impressão em console do valor do objeto 'nome' que originou o evento   

    if(e.target.value.trim().match(regexNome)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "Formato de nome inválido"; 
        nomeHelp.style.color="red";
    }
    else{
        nomeHelp.textContent = "";
    }       
}

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validarNome*/

//declaração de função de forma anônima usando uma expressão de função de seta =>

ano.addEventListener('focusout', () => {
    //declaração da expressão regular para definir o formato de um ano válido
    const regexAno = /^(19[0-9]{2}|20[0-1][0-9]|2022)$/;    
    //tirar (trim) espaços em branco antes e depois da string
    const anoTrimado = ano.value.trim();
    console.log(ano.value);

    if(anoTrimado.match(regexAno)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
        anoHelp.textContent = "Formato de ano inválido";
        anoHelp.style.color="red";
    }
    else{
        //objeto Date
        var date = new Date();
        //obtem o ano atual
        console.log(date.getFullYear()); 
        
        if( parseInt(anoTrimado) > parseInt(date.getFullYear()) ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${date.getFullYear()}.`;
            anoHelp.style.color="red";
        }
        else if( parseInt(anoTrimado) < parseInt(date.getFullYear())-120 ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${date.getFullYear()-120}.`;
            anoHelp.style.color="red";
        }
        else{
            anoHelp.textContent="";
        }        
        
    }
}
);

email.addEventListener('focusout', validarEmail);


function validarEmail(e){ 
    //declaração da expressão regular para definir o formato de um nome válido
    const regexNome = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(com|br|net|org)$/;
    
    console.log(e); //impressão em console do objeto evento e
    console.log(e.target.value); //impressão em console do valor do objeto 'nome' que originou o evento   

    if(e.target.value.trim().match(regexNome)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        emailHelp.textContent = "Formato de email inválido"; 
        emailHelp.style.color="red";
    }
    else{
        emailHelp.textContent = "";
    }       

}

senha.addEventListener('focusout', validarSenha);

function validarSenha(e){ 
    const regexNome = /^(?!.*(?:1234|abcd|senha|password))(?=.*[!@#%&!+])(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;
    
    console.log(e);
    console.log(e.target.value);

    if(e.target.value.trim().match(regexNome)==null){
        inputPasswordHelp.textContent = "Senha inválida"; 
        inputPasswordHelp.style.color="red";
    } else {
        inputPasswordHelp.textContent = "";
    }
    
    // Passa o valor da senha para a função testarSenha
    var nivelSeguranca = testarSenha(e.target.value);
    //console.log("Nível de segurança da senha:", nivelSeguranca);
    var meter = document.getElementById('passStrengthMeter');
    meter.value = nivelSeguranca;

}

function testarSenha(senha) {
    var regexFraca = /^(?=.*[!@#%&!+])(?=.*\d).{1,7}$/;
    var regexModerada = /^(?=.*[!@#%&!+])(?=.*\d)(?=.*[A-Z]).{8,11}$/;
    var regexForte = /^(?=.*[!@#%&!+])(?=.*\d)(?=.*[A-Z]).{12,}$/;

    var nivel = 0;
    if (regexFraca.test(senha)) {
        nivel = 11;
    } else if (regexModerada.test(senha)) {
        nivel = 21;
    } else if (regexForte.test(senha)) {
        nivel = 30;
    }

    return nivel;    
}
