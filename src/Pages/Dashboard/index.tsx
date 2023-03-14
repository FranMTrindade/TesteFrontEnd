import React, { useState, useEffect } from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import Header from '../../Components/Header/Index';
import './styles.css'
import { ClipLoader } from 'react-spinners';
import { toast } from "react-toastify";

interface Order {
  id: number;
  PC17Pedido: string;
  PC17DTEmi: string;
  data: string;
  numero: string;
}

export default function Dashboard() {
    
  const [numPedidos, setNumPedidos] = useState<number>(0);
  const [pedidosPorMes, setPedidosPorMes] = useState<Record<string, Order[]>>({});
  const [anoInicial, setAnoInicial] = useState<string>('');
  const [anoFinal, setAnoFinal] = useState<string>('');
  const [busca, setBusca] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [ultimaBusca, setUltimaBusca] = useState<string>('');
  
  const handleAnoInicialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnoInicial(event.target.value);
  };
  
  const handleAnoFinalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnoFinal(event.target.value);
  };
  
  const handleBuscarClick = () => {
    if(anoInicial === '' || isNaN(Number(anoInicial)) || anoInicial.trim().length <= 3 || anoInicial.trim().length >= 5 || anoInicial > anoFinal ){
      toast.warning('Data inválida')
      return;
    }
    const novaBusca = `${anoInicial.trim()}-${anoFinal.trim()}`;
    if (novaBusca === ultimaBusca) {
      toast.warning('Essa pesquisa é igual a anterior, faça uma nova busca!')
      return;
    }
    setUltimaBusca(novaBusca);
    setBusca(novaBusca);
    setLoading(true);
  };
  
  useEffect(() => {
    if (busca !== '') {
      fetch('https://apimocha.com/elanto/orders')
        .then(response => response.json())
        .then((data: { Orders: Order[] }) => {
          const orders = data.Orders.filter(
            (order: Order) => {
              const year = Number(order.PC17DTEmi.slice(0,4));
              return year >= Number(anoInicial.trim()) && year <= Number(anoFinal.trim());
            }
          );
          const ordersByMonth = orders.reduce(
            (acc: Record<string, Order[]>, order: Order) => {
              const month = new Date(order.PC17DTEmi).getMonth().toString();
              acc[month] = acc[month] || [];
              acc[month].push(order);
              return acc;
            },
            {}
          );
  
          setPedidosPorMes(ordersByMonth);
          setNumPedidos(orders.length);
          setLoading(false);
        })
        .catch(error => console.log(error));
    }
  }, [busca, anoInicial, anoFinal, ultimaBusca]);
  
  return(
    <>
  <Header />

  <div className='pesquisar'>
   
    <input
      type="text"
      value={anoInicial}
      onChange={handleAnoInicialChange}
      className="busca"
      placeholder="Ano inicial"
    />
  
    <input
      type="text"
      value={anoFinal}
      onChange={handleAnoFinalChange}
      className="busca"
      placeholder="Ano final"
    />

  <Button variant="contained" color="primary" onClick={handleBuscarClick} className="send">
    Buscar
  </Button>
  
  </div>

  

  <Grid container spacing={3}  style={{marginTop: "20px", marginLeft:"10%"}} >
    <Grid item xs={12} sm={4}>
      <Paper className="painel" elevation={15}>
        <h2 className="totalPeriodo">Total de vendas:</h2>
        {loading ? (
          <div className="loading">
            <ClipLoader color="#3f51b5" loading={loading} size={50} />
          </div>
        ) : (
          <div className="dados">
            <span><h1 className="total">{numPedidos}</h1></span>
          </div>
        )}
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Paper className="painel2" elevation={15}>
        <h2 className='totalPeriodo'>Pedidos por mês</h2>
        {loading ? (
          <div className="loading">
            <ClipLoader color="#3f51b5" loading={loading} size={50} />
          </div>
        ) : (
          <div className="dados">
  <ul>
    
  {Object.keys(pedidosPorMes).map((mes, index) => (
  <li key={index}>
    <span><h2 className='month'>{new Date(pedidosPorMes[mes][0].PC17DTEmi).toLocaleString('pt-br', { month: 'long' })}</h2></span>
    <ul>
      {pedidosPorMes[mes].map((pedido, pedidoIndex) => (
        <li key={pedidoIndex}>
          <span><h3 className='nPedidos'>Numero do Pedido: {pedido.PC17Pedido}</h3></span>
          <span><h3 className='dPedidos'>Data de emissão: {new Date(pedido.PC17DTEmi).toLocaleDateString('pt-br', { timeZone: 'UTC' })}</h3></span>
        </li>
      ))}
    </ul>
  </li>
))}

    

  </ul>
</div>

        )}
      </Paper>
    </Grid>
  </Grid>
</>

  )
              }