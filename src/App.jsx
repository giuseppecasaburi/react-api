import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Card from "./components/Card";


const initialFormData = {
  title: "",
  content: "",
  image: "",
  tags: ""
};

const apiUrl = "http://localhost:3000";

function App() {
  const [posts, setPosts] = useState([]); // Usa postsArray come stato iniziale
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false); // Stato per tracciare se il form è stato inviato

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = () => {
    axios.get(`${apiUrl}/posts`).then((resp) => {
      console.log(resp.data.data);
      setPosts(resp.data.data)
    })
  }

  // Funzione per gestire l'invio del form
  const handlePostForm = (event) => {
    event.preventDefault();

    axios.post(`${apiUrl}/posts`, formData).then((resp) => {
      console.log(resp);

      const newArray = [...posts, resp.data]; // Creo un nuovo array dove unisco il vecchio al nuovo elemento

      setPosts(newArray); // Aggiorno l'array iniziale

      setFormData(initialFormData);// Reset del form
    })

  };

  // Funzione per gestire la cancellazione dei post
  const deletePost = (id) => {                                  // CHIEDERE ID //
    axios.delete(`${apiUrl}/posts/${id}`).then((resp) => {
      console.log(resp);
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
    })
  }

  // Gestisce il cambio dei valori degli input
  const handleInputChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    const newValue =
      type === "file" ? files[0] : type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  return (
    <div className="container">
      <section>
        <h3>Aggiungi un nuovo post</h3>
        <form onSubmit={handlePostForm}>
          <div className="mb-3">
            <label htmlFor="title">Titolo del post</label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="content">Contenuto del post</label>
            <textarea
              name="content"
              id="content"
              className="form-control"
              value={formData.content}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="image">Immagine</label>
            <input
              type="file"
              className="form-control"
              name="image"
              id="image"
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Salva
          </button>
        </form>
      </section>

      <section>
        <h2>I nostri post</h2>

        <div className="row row-cols-2 row-cols-lg-3">
          {posts.map((curPost) => (
            <div className="col" key={curPost.id}>
              <Card curPost={curPost} apiUrl={apiUrl} deletePost={deletePost} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;