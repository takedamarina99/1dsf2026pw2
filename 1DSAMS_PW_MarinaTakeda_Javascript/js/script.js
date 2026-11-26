
//Função para validar as caixas de texto
function validar(){
    let txt_nome = document.querySelector("#txt_nome");
    let txt_email = document.querySelector("#txt_email");
    let txt_email_confirma = document.querySelector("#txt_email_confirma");
    let txt_celular = document.querySelector("#txt_celular");
    let txt_celular_confirma = document.querySelector("#txt_celular_confirma");

    //Receber a variável da caixa de senha da página HTML
    let txt_senha = document.getElementById("txt_senha");

    //Receber a variável da caixa de repetir e confirmar senha da página HTML
    let txt_confirma = document.querySelector("#txt_confirma");

    //Receber a variável da mensagem página HTML
    let mensagem = document.querySelector("#p_mensagem");

    //Cria uma nova tag <ul>
    let lista_tag = document.createElement("ul");
    let item;

    //Cria uma nova tag <li>
    item = document.createElement("li");

    //adiciona o texto na tag: <li>E-mail JS</li>
    item.textContent = "E-mail JS";

    //adiciona a classe na tag: <li class="correto">E-mail JS</li>
    item.classList.add("correto");

    //adiciona o item na lista
    lista_tag.appendChild(item);

    //repetindo o processo
    item = document.createElement("li");
    item.textContent = "Celular JS";
    item.classList.add("erro");
    lista_tag.appendChild(item);

    item = document.createElement("li");
    item.textContent = "Senha JS";
    lista_tag.appendChild(item);

    //fim da repetição do processo

    //Apagando mensagens anteriores
    mensagem.innerHTML = "";

    //Adicionando a lista na mensagem
    mensagem.appendChild(lista_tag);


    //Comparar se o valor das duas caixas de texto estão idênticas
    if(txt_senha.value == "" || txt_confirma.value == ""){
        mensagem.innerHTML = "A senha está vazia";
        mensagem.classList.add("erro");
        mensagem.classList.remove("correto");

        txt_confirma.focus();
    }
    else if (txt_senha.value != txt_confirma.value){
        //Caso FALSO
        mensagem.innerHTML = "As senhas não estão iguais";

        mensagem.classList.add("erro");
        mensagem.classList.remove("correto");

        txt_confirma.focus();
    }
    else if (txt_senha.value == txt_confirma.value){
        //Caso VERDADEIRO
        mensagem.innerHTML = "As senhas estão iguais";

        mensagem.classList.add("correto");
        mensagem.classList.remove("erro");
    }

    //Interromper o envio do formulário
    return false;

    //Exibir cada mensagem de validação de acordo com cada comparação:
    //Se o campo estiver sem texto, Exibir mensagem "[CAMPO] está vazio"
    //Se o campo estiver diferente da repetição, Exibir mensagem "[CAMPO]s são diferentes"
    //Se o campo estiver igual a comparação, Exibir mensagem "[CAMPO]s estão iguais"
}


function limpar(){
    let mensagem = document.querySelector("#p_mensagem");
    mensagem.innerHTML = "";
}


function adicionar_apelido(){
    let txt_apelido = document.querySelector("#txt_apelido");
    let lst_apelido = document.querySelector("#lst_apelido");

    let novo_apelido = document.createElement("option");
    novo_apelido.textContent = txt_apelido.value;
    lst_apelido.appendChild(novo_apelido);

    let p_lista_apelido = document.querySelector("#p_lista_apelido");

    //Alterna entre display = "none" (invisível) para display = "block" (visível)
    p_lista_apelido.style.display = "block";

    //no final, limpar a caixa de texto de apelido
    txt_apelido.value = "";
}



async function gravar_apelido(){

    let opcao = document.querySelector('#lst_apelido option:checked');

    if(opcao == null){
        alert("Selecione um apelido primeiro!");
        return;
    }

    let apelido = opcao.innerText;

    await cookieStore.set("apelido_favorito", apelido);

    //Gravar todos campos do formulário no cookie
    let dados = {
        nome: document.querySelector("#txt_nome").value,
        email: document.querySelector("#txt_email").value,
        celular: document.querySelector("#txt_celular").value
    };

    await cookieStore.set("dados_formulario", JSON.stringify(dados));

    //Gravar lista de apelidos no cookie
    let lst_apelido = document.querySelector("#lst_apelido");

    let apelidos = Array.from(lst_apelido.options).map(opcao => opcao.textContent);

    await cookieStore.set("lista_apelidos", JSON.stringify(apelidos));
}


async function carregar_apelido(){
    let cookie = await cookieStore.get("apelido_favorito");

    if(!cookie){
        alert("Nenhum apelido foi gravado!");
        return;
    }

    let apelido = cookie.value;

    let p_lista_apelido = document.querySelector("#p_lista_apelido");
    p_lista_apelido.style.display = "block";

    let lst_apelido = document.querySelector("#lst_apelido");

    //Carregar lista de apelidos
    let lista = await cookieStore.get("lista_apelidos");

    if(lista){
        let apelidos = JSON.parse(lista.value);

        apelidos.forEach(apelido => {
            let novo_apelido = document.createElement("option");
            novo_apelido.textContent = apelido;
            lst_apelido.appendChild(novo_apelido);
        });
    }
}
/*
async function carregar_apelido(){
    let apelido = (await cookieStore.get("apelido_favorito")).value;

    let p_lista_apelido = document.querySelector("#p_lista_apelido");
    p_lista_apelido.style.display = "block";

    let lst_apelido = document.querySelector("#lst_apelido");

    //Carregar lista de apelidos
    let lista = await cookieStore.get("lista_apelidos");

    if(lista){
        let apelidos = JSON.parse(lista.value);

        apelidos.forEach(apelido => {
            let novo_apelido = document.createElement("option");
            novo_apelido.textContent = apelido;
            lst_apelido.appendChild(novo_apelido);
        });
    }
}*/
