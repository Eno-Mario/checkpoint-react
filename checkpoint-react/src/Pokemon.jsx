import React, { useEffect, useState } from "react";

export default function Pokemon() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {}, []);

  function handleSubmit(event) {
    event.preventDefault();

    fetch(`https://pokeapi.co/api/v2/pokemon/${event.target.pokemon.value}`)
      .then((resp) => resp.json())
      .then((data) => {
        setData({
          img: data.sprites.front_default,
          nome: data.name,
          exp: data.base_experience,
          abb: data.abilities,
        });
      })
      .catch((error) => {
        setData(null);
        setError(error);
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="pokemon" />
        <button>Submit</button>
      </form>
      {data ? (
        <div>
          <img src={data.img} alt="pokemon" />
          <h3>{data.nome}</h3>
          <p>{data.exp}</p>
          <ul>
            {data.abb.map((el, index) => (
              <li key={index}>{el.ability.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>c'è un errore</div>
      )}
    </>
  );
}
