import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams()
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null)

  React.useEffect(() => {
    setLoading(true);
    async function get() {
      try {
        const response = await fetch(`${url}${id}`)
        const data = await response.json();
        if(data.drinks) {
          const {
            strDrink: drink,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: categ,
            strGlass: glass,
            strInstructions: instr,
            strIngredient1: i1,
            strIngredient2: i2,
            strIngredient3: i3,
            strIngredient4: i4,
            strIngredient5: i5,
          } = data.drinks[0];
          const ingredients = [i1, i2, i3, i4, i5]
          const cockTails = {
            drink, image, info, categ, glass, instr, ingredients
          }
          setCocktail(cockTails)
        }
        else {
          setCocktail(null)
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    get();
  }, [id])
  if(loading) {
    return <Loading />
  }
  if(!cocktail) {
    return <h2 className='section-title'>no cocktail to display</h2>
  }

  const {drink, image, info, categ, glass, instr, ingredients} = cocktail;
  return (
    <section className='section cocktail-section'>
      <Link to="/" className='btn btn-primary'>back Home</Link> 
      <h2 className='section-title'>{drink}</h2>
      <div className="drink">
        <img src={image} alt="drink"/>
        <div className="drink-info">
          <p>
            <span className='drink-data'>name: </span>
            {drink}
          </p>
          <p>
            <span className='drink-data'>categ: </span>
            {categ}
          </p>
          <p>
            <span className='drink-data'>info: </span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass: </span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>Instruction: </span>
            {instr}
          </p>
          <p>
            <span className='drink-data'>Ingredients: </span>
            {ingredients.map( (item, index) => {
              return item? <span key={index}>{item}</span>: null;
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
