import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import articleArray from "./data/articleArray";

const initialFormData = {
  title: "",
  content: "",
  category: "General",
  image: "",
  isPublished: false,
  email: "",
};

function App() {
  const [posts, setPosts] = useState(articleArray); // Usa articleArray come stato iniziale
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false); // Stato per tracciare se il form è stato inviato
  const [availableMessage, setAvailableMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  // Funzione per gestire l'invio del form
  const handlePostForm = (event) => {
    event.preventDefault();

    // Crea il nuovo post e aggiungilo all'array dei post
    const newPost = { ...formData, id: Date.now() };
    setPosts((prevPosts) => [...prevPosts, newPost]);

    // Imposta lo stato di submitted a true per mostrare i post
    setSubmitted(true);

    // Reset del form
    setFormData(initialFormData);

    // Messaggi di validazione
    if (!formData.isPublished) {
      setAvailableMessage("Post non pubblicato");
    } else {
      setAvailableMessage("Post pubblicato!");
    }

    if (!formData.email) {
      setEmailMessage("Email mancante");
    } else {
      setEmailMessage("");
    }
  };

  // Funzione per gestire la cancellazione dei post
  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

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

        <div className="mb-3">
          <label htmlFor="email">Email di contatto</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control"
          />
          <p>{emailMessage}</p>
        </div>

        <div className="mb-3">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="General">Generale</option>
            <option value="Technology">Tecnologia</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>

        <div className="my-3">
          <label htmlFor="isPublished">Pubblica il post</label>
          <input
            id="isPublished"
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleInputChange}
          />
          <div>{availableMessage}</div>
        </div>

        <button type="submit" className="btn btn-primary">
          Salva
        </button>
      </form>
    </section>
      <section>
        <h2>I nostri post</h2>
        {submitted ? (
          posts.length > 0 ? (
            <div className="row row-cols-2 row-cols-lg-3">
              {posts.map((curPost) => (
                <div className="col" key={curPost.id}>
                  <div className="card">
                    <div className="card-body">
                      <h4>{curPost.title}</h4>
                      <p>{curPost.content}</p>
                      <p>Categoria: {curPost.category}</p>
                      {curPost.image && (
                        <img
                          src={URL.createObjectURL(curPost.image)}
                          alt="Post"
                        />
                      )}
                      <p>{curPost.isPublished ? "Pubblicato" : "Non pubblicato"}</p>
                      <button
                        onClick={() => deletePost(curPost.id)}
                        className="btn btn-danger"
                      >
                        Cancella
                      </button>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            ) : (
              <p>Nessun post disponibile</p>
            )
          ) : (
          <p>Nessun post disponibile</p>
        )}
      </section>

    </div>
  );
}

export default App;
