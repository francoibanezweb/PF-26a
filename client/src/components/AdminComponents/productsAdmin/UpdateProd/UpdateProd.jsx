import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import FileBase from "react-file-base64";
import Carousel from "react-bootstrap/Carousel";
import { getProductsById } from "../../../../redux/actions";

const UpdateProd = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // let actualProduct = useSelector((state) => state.detail);
  // console.log(actualProduct);
  const { id } = useParams();

  // dispatch(getProductsById(id));

  const categoriesArray1 = useSelector((state) => state.categories);
  const categoriesArray = categoriesArray1.sort();
  const sizesArray = ["xs", "s", "l", "m", "xl", "xxl", "xxxl", "único"];
  const [input, setInput] = useState({
    name: "",
    price: 0,
    description: "",
    color: "",
    image: "",
    image2: "",
    image3: "",
    image4: "",
    rating: 0,
    categories: [],
    product_values: [],
  });
  console.log(input);
  const [productsValues, setProductsValues] = useState({});

  const stockArray = [];
  for (let i = 0; i <= 100; i++) {
    stockArray.push(i);
  }

  const [errors, setErrors] = useState();

  const handleKick = async () => {
    const check = await JSON.parse(localStorage.getItem("isAdmin"));
    if (!check) {
      history.push("/login");
    }
  };
  useEffect(() => {
    handleKick();
  }, []);
  useEffect(() => {
    dispatch(getProductsById(id));
  }, [dispatch, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "size") {
      setProductsValues({ [name]: value });
    }
    if (name === "stock") {
      setProductsValues({ ...productsValues, [name]: value });
    }
    // if (name === "categories") {
    //   if (input.categories.length < 3) {
    //     setInput({
    //       ...input,
    //       categories: [...input.categories, { name: e.target.value }],
    //     });
    //   }
    // } else {
    //   setInput({ ...input, [name]: value });
    // }
  };

  const handleSubmit = () => {};

  const submitButtonBoolean =
    input.name === "" ||
    input.price === 0 ||
    input.description === "" ||
    input.color === "" ||
    input.image === "" ||
    input.categories.length === 0 ||
    input.product_values.length === 0
      ? true
      : false;

  return (
    <div className="productCreationContainer">
      <Link to="/admin/products">
        <button id="back-button">Regresar al tablero de control</button>
      </Link>
      <div className="productFormContainer">
        <div className="creation_form">
          <h2 id="title">Creá un producto:</h2>
          <div id="error_container">
            <ul className="error">
              {errors && errors.name && (
                <li className="errorCreation">{errors.name}</li>
              )}
              {errors && errors.description && (
                <li className="errorCreation">{errors.description}</li>
              )}
              {errors && errors.price && (
                <li className="errorCreation">{errors.price}</li>
              )}
              {errors && errors.color && (
                <li className="errorCreation">{errors.color}</li>
              )}
            </ul>
          </div>
          <form className="formContainer" onSubmit={(e) => handleSubmit(e)}>
            <div className="sepatarionContainer">
              <fieldset className="fieldset rowItems">
                <legend>Ingresá un título:</legend>
                <input
                  className=""
                  type="text"
                  placeholder="Título..."
                  name="name"
                  id="name-input"
                  onChange={(e) => handleInputChange(e)}
                ></input>
              </fieldset>

              <fieldset className="fieldset rowItems">
                <legend>Ingresá el precio:</legend>
                <input
                  id="price-input"
                  type="number"
                  placeholder="Precio..."
                  name="price"
                  min="0"
                  max="9999.99"
                  step=".01"
                  onChange={(e) => handleInputChange(e)}
                ></input>
              </fieldset>
            </div>

            <fieldset className="fieldset">
              <legend>Ingresá la descripción:</legend>
              <textarea
                id="textarea"
                className=""
                placeholder="Descripción..."
                name="description"
                rows="2"
                cols="50"
                onChange={(e) => handleInputChange(e)}
              ></textarea>
            </fieldset>

            <fieldset className="fieldset">
              <legend>Ingresá los colores:</legend>
              <input
                id="color-input"
                className=""
                type="text"
                placeholder="Color..."
                name="color"
                onChange={(e) => handleInputChange(e)}
              ></input>
            </fieldset>

            <div className="sepatarionContainer">
              <fieldset id="image1" className="fieldset">
                <legend htmlFor="image1">Imagen 1: </legend>
                <FileBase
                  id="image1"
                  name="image1"
                  type="image"
                  multiple={false}
                  onDone={({ base64 }) => setInput({ ...input, image: base64 })}
                />
              </fieldset>

              <fieldset id="image2" className="fieldset">
                <legend htmlFor="image2">Imagen 2: </legend>
                <FileBase
                  name="image2"
                  type="image"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setInput({ ...input, image2: base64 })
                  }
                />
              </fieldset>
            </div>

            <div className="sepatarionContainer">
              <fieldset id="image3" className="fieldset">
                <legend htmlFor="image3">Imagen 3: </legend>
                <FileBase
                  name="image3"
                  type="image"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setInput({ ...input, image3: base64 })
                  }
                />
              </fieldset>

              <fieldset id="image4" className="fieldset">
                <legend htmlFor="image4">Imagen 4: </legend>
                <FileBase
                  name="image4"
                  type="image"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setInput({ ...input, image4: base64 })
                  }
                />
              </fieldset>
            </div>

            <fieldset id="categories" className="fieldset">
              <legend htmlFor="categories">Categorías:</legend>
              <select
                className=""
                name="categories"
                onChange={(e) => handleInputChange(e)}
              >
                <option key={"21a"}>--Elegí las categorías--</option>
                {categoriesArray &&
                  categoriesArray?.map((elm, index) => {
                    return (
                      <option value={elm} key={index}>
                        {elm}
                      </option>
                    );
                  })}
              </select>
            </fieldset>
            {/* <span>In order to add a size-stock pair succesfully, you must first select only one size and then select only one quantity. You'll know you did it well if a phrase appears bellow the stock select.</span> */}
            <br />

            <fieldset id="size_stock" className="fieldset">
              <div className="sepatarionContainer">
                <div className="fieldset rowItems">
                  <legend htmlFor="size_stock">Talle y stock:</legend>
                  <select
                    className=""
                    name="size"
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option key={"22a"}>--Seleccioná un talle--</option>
                    {sizesArray &&
                      sizesArray?.map((elm, index) => {
                        return (
                          <option value={elm} key={index}>
                            {elm}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="fieldset rowItems">
                  <label>Stock:</label>
                  <select
                    className=""
                    name="stock"
                    onChange={(e) => handleInputChange(e)}
                  >
                    {stockArray &&
                      stockArray.map((elm, index) => {
                        return <option key={index}>{elm}</option>;
                      })}
                  </select>
                </div>
              </div>
            </fieldset>

            <input
              disabled={submitButtonBoolean}
              id="submit-button"
              type="submit"
              value="Submit"
              className="submitBtn"
            />
          </form>
        </div>
      </div>
      <div className="productView">
        <h2 id="title">Previsualización:</h2>
        <div className="background">
          <div className="imagesCreate">
            <Carousel fade>
              {input.image && (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={input.image}
                    alt="not found"
                  />
                </Carousel.Item>
              )}
              {input.image2 && (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={input.image2}
                    alt="not found"
                  />
                </Carousel.Item>
              )}
              {input.image3 && (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={input.image3}
                    alt="not found"
                  />
                </Carousel.Item>
              )}
              {input.image4 && (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={input.image4}
                    alt="not found"
                  />
                </Carousel.Item>
              )}
            </Carousel>
          </div>

          {input.name.length !== 0 && <h2>{input.name}</h2>}

          {input.price.length !== 0 && <h3>${input.price}</h3>}

          {input.description.length !== 0 && <p>{input.description}</p>}

          {input.color.length !== 0 && <span>Color: {input.color}</span>}

          <br />

          {input.categories.length !== 0 && (
            <label htmlFor="categories-list" id="categories-list-label">
              Categorías:
            </label>
          )}

          <ul className="categories" id="categories-list">
            {input.categories &&
              input.categories.map((elm, index) => {
                return <li key={index}>{elm.name}</li>;
              })}
          </ul>
          <ul className="size-stock">
            {input.product_values &&
              input.product_values.map((elm, index) => {
                return (
                  <li key={index}>
                    Hay <mark>{elm.stock}</mark> unidades del talle{" "}
                    <mark>{elm.size}</mark>{" "}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UpdateProd;