# Aplicação

Foi desenvolvida a aplicação TesteFrontEnd que possui duas páginas, uma página de login, e a página dashboard, na página dashboard é apresentado os dados de acordo com a pesquisa do usuário, a pesquisa fornece o total de vendas, e as vendas por mês onde é apresentado a data de emissão daquele pedido e o número do pedido. 

## Login

O login foi criado com a seguinte lógica, a api fornece os dados do usuário, com isso a aplicação compara o input do usuário com os os dados fornecidos pelo usuário, se a validação for tiver sucesso, é criado um token e é permitido o acesso para próxima pagina, desse modo impede que o usuário desligado acesse a próxima página digitando "/dashboard" por exemplo.

Em uma aplicação que será utlizada de fato na produação, normalmente a lógica de validação de usuário e senha seria executada no servidor e, caso as credenciais fossem válidas, um token JWT (caso esteja feito o uso do JWT) seria gerado e enviado de volta para o usuário. No lado do cliente, a aplicação receberia esse token e armazenaria em um contexto global, acessível de qualquer componente e para acessar as rotas protegidas, o componente que faz a solicitação faria uma chamada à API, enviando o token como um cabeçalho de autorização. No servidor, a validação do token seria feita para verificar se o usuário está autenticado e autorizado a acessar a rota solicitada. Se o token for válido, o servidor responderia com os dados solicitados. Caso contrário, o servidor retornaria um erro e o componente React trataria a resposta de acordo com a situação.


## Dashboard

DashBoard foi desenvolvido pensando na experiência do usuário, foi desenvolvido um layout de fácil entendimento para que o usuário digite o período que deseja fazer a busca e clica em bucas e são apresentado os dados de forma simples. sendo apresentado o total de vendas naquele no período desejado e do outro lado é apresentado os pedidos que foram feito em cada mês do mesmo período mostrando também a data de emissão e o número de cada pedido.



# Bibliotecas 

Além das das que foram apresentadas no desafio, foi utilizado apenas a biblioteca React-Toastify para apresentar mensagens de erros, alertas e sucesso, também foi utulizado a biblioteca react-router-dom para fazer rotas da aplicação e a react-spinners para fazer as animações do loading.
