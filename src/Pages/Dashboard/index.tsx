import React, { useState, useEffect } from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import Header from '../../Components/Header/Index';
import './stylesDash.css';

interface Order {
  id: number;
  PC17Pedido: string;
  PC17DTEmi: string;
}

export default function Dashboard() {
  const [numPedidos, setNumPedidos] = useState<number>(0);
  const [pedidosPorMes, setPedidosPorMes] = useState<Record<string, Order[]>>({});
  const [ano, setAno] = useState<string>('');
  const [busca, setBusca] = useState<string>('');

  const handleAnoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAno(event.target.value);
  };

  const handleBuscarClick = () => {
    setBusca(ano);
  };

  useEffect(() => {
    if (busca !== '') {
      fetch('https://apimocha.com/elanto/orders')
        .then(response => response.json())
        .then((data: { Orders: Order[] }) => {
          const orders = data.Orders.filter(
            (order: Order) => order.PC17DTEmi.startsWith(`${busca}`)
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
        })
        .catch(error => console.log(error));
    }
  }, [busca]);

  return (
    <>
      <Header />

      <div className="busca">
        <input
          type="text"
          value={ano}
          onChange={handleAnoChange}
          className="pesquisa"
          placeholder="Digite o ano que deseja pesquisar"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleBuscarClick}
          className="send"
        >
          Buscar
        </Button>
      </div>

      <div className="container">
        <h1 className="titulo">
          {busca === '' ? 'Busque os pedidos por ano' : `Total de Vendas no ano: ${numPedidos}`}
        </h1>
        {/* exibe os pedidos por mês */}
        {Object.entries(pedidosPorMes).map(([month, orders]) => (
          <Grid key={month} className="grid">
            <Paper elevation={5} className="paperDash">
              <h2 className="month">
                {new Date(2004, Number(month)).toLocaleString('default', { month: 'long' })}
              </h2>
              <ol className="listContanier">
                {orders.map(order => (
                  <li key={order.id}>
                    <h4 className="listTitle">Número do Pedido:</h4> {order.PC17Pedido}
                    <br />
                    <h4 className="listTitle">Data do Pedido:</h4>{' '}
                    {new Date(order.PC17DTEmi).toLocaleDateString()}
                  </li>
                ))}
              </ol>
              <h4 className="total">Total de vendas no mês:  {orders.length} </h4>
            </Paper>
          </Grid>       
        ))}
      </div>
    </>
  );
}
