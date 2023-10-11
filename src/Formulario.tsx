import React, { useState } from "react";

interface FormularioProps {
  onSubmit: (datos: {
    titulo: string;
    subtitulo: string;
    texto: string;
  }) => void;
}

const Formulario: React.FC<FormularioProps> = ({ onSubmit }) => {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [texto, setTexto] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ titulo, subtitulo, texto });
    setTitulo("");
    setSubtitulo("");
    setTexto("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="titulo">Título:</label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="subtitulo">Subtítulo:</label>
        <input
          type="text"
          id="subtitulo"
          value={subtitulo}
          onChange={(e) => setSubtitulo(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="texto">Texto:</label>
        <textarea
          id="texto"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
      </div>
      <button type="submit">Agregar</button>
    </form>
  );
};

export default Formulario;
