import React, { useState, useEffect } from 'react';
let totalFantasmasAtivos = 0;

function MouseTracker() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const meuIdOriginal = totalFantasmasAtivos;

    console.log(`⚠️ Fantasma #${meuIdOriginal} criado e escutando o mouse!`);
    // 1. Define a função do evento
    const handleMouseMove = (event) => {
      setCoords({ x: event.clientX, y: event.clientY });
      console.log(`Mouse movendo... Total de fantasmas assombrando a tela: ${totalFantasmasAtivos}`); // Para checar se o evento continua ativo
    };
    totalFantasmasAtivos += 1;
    // 2. Adiciona o listener na janela global
    window.addEventListener('mousemove', handleMouseMove);

    // 3. Função de Limpeza (Cleanup)
    // Roda quando o componente é desmontado para evitar lentidão
    // return () => {
    //   window.removeEventListener('mousemove', handleMouseMove);
    //   totalFantasmasAtivos = 0;
    // };
    
  }, []); // Roda apenas uma vez na inicialização

  return (
    <div >
      <h3>Mova o mouse pela tela</h3>
      <p>Eixo X: {coords.x} | Eixo Y: {coords.y}</p>
    </div>
  );
}

export default MouseTracker;