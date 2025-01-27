'use client'

import { useState, useEffect } from "react"

export default function CrearArticulo() {
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [autor, setAutor] = useState("");
    const [fecha_publicacion, setFecha_publicacion] = useState("");

    useEffect(() => {
        setFecha_publicacion(new Date().toISOString().slice(0, 16)); 
    }, []);

    async function crearArticulo(e) {
        e.preventDefault();

        if (titulo !== "" && contenido !== "" && autor !== "" && titulo.length < 150) {
            const response = await fetch("/api/articulo", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    articulo: {
                        titulo: titulo,
                        contenido: contenido,
                        autor: autor,
                        fecha_publicacion: fecha_publicacion
                    }
                })
            });

            if (response.ok) {
                alert("Artículo creado exitosamente.");
                setTitulo("");
                setContenido("");
                setAutor("");
                setFecha_publicacion(new Date().toISOString().slice(0, 16));
            } else {
                alert("Hubo un error al crear el artículo");
            }
        } else {
            alert("Error al crear el artículo");
        }
    }

    return (
        <div>
            <h1>Añadir artículo</h1>
            <form onSubmit={crearArticulo}>
                <label>
                    Título:
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        maxLength={150}
                        required
                    />
                </label>
                <br />
                <label>
                    Contenido:
                    <input
                        type="text"
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Autor:
                    <input
                        type="text"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Fecha de publicación:
                    <input
                        type="datetime-local"
                        value={fecha_publicacion}
                        onChange={(e) => setFecha_publicacion(e.target.value)}
                        required
                    />
                </label>
                <br />
                <input type="submit" value="Crear artículo" />
            </form>
        </div>
    );
}
