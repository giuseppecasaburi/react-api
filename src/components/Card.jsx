function Card ( {curPost, apiUrl, deletePost} ) {
    return(
        <div className="card">
                <div className="card-body">
                  <h4>{curPost.title}</h4>
                  <img src={`${apiUrl}/${curPost.image}`} alt="" />
                  <p>{curPost.content}</p>
                  <p>Categoria: {curPost.category}</p>
                  <button
                    onClick={() => deletePost(curPost.id)}
                    className="btn btn-danger"
                  >
                    Cancella
                  </button>
                </div>
              </div>
    )
}

export default Card;