import { useState, useEffect } from "react";
import img from "./assets/freddie.png";
import { nanoid } from "nanoid";

function App() {
  const [formData, setFormData] = useState({
    id: nanoid(),
    endorsement: "",
    from: "",
    to: "",
    isLiked: false,
    likes: 0,
  });

  // const [like, setLike] = useState(false);

  const [endorsementArray, setEndorsementArray] = useState(
    JSON.parse(localStorage.getItem("endorsementArray")) || []
  );

  // localStorage.clear();

  useEffect(() => {
    localStorage.setItem("endorsementArray", JSON.stringify(endorsementArray));
  }, [endorsementArray]);

  function handleChange(event) {
    const { value, name } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formData.endorsement) {
      setEndorsementArray((prev) => [formData, ...prev]);
      setFormData({
        id: nanoid(),
        endorsement: "",
        from: "",
        to: "",
        isLiked: false,
        likes: 0,
      });
    }
  }

  function toggleLike(id) {
    const tempArr = endorsementArray.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isLiked: !item.isLiked,
          likes: item.isLiked ? item.likes - 1 : item.likes + 1,
        };
      }
      return item;
    });
    setEndorsementArray(tempArr);
  }

  const endoElement = endorsementArray.map((item, index) => (
    <li key={index}>
      <h4>To {item.to}</h4>
      <p>{item.endorsement}</p>
      <div className="like-wrapper">
        <h4 className="like-wrapper-from">From {item.from}</h4>
        <h4>{item.likes > 0 && item.likes}</h4>
        <i
          onClick={() => toggleLike(item.id)}
          className={item.isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
        ></i>
      </div>
    </li>
  ));

  return (
    <div className="container">
      <img src={img} alt="" />
      <h1>We are the Champions</h1>
      <form method="post" onSubmit={handleSubmit}>
        <textarea
          className="textarea"
          name="endorsement"
          value={formData.endorsement}
          placeholder="Write your endorsement here"
          onChange={handleChange}
        />
        <div className="inp-wrapper">
          <input
            className="input-text"
            type="text"
            name="from"
            placeholder="From"
            value={formData.from}
            onChange={handleChange}
          />
          <input
            className="input-text"
            type="text"
            name="to"
            placeholder="To"
            value={formData.to}
            onChange={handleChange}
          />
        </div>
        <button>Publish</button>
      </form>
      <h3>- Endorsements - </h3>
      <ul>{endoElement}</ul>
    </div>
  );
}

export default App;
