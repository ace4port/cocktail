import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const CocktailList = () => {
  const {cocktail, loading, setLoading} = useGlobalContext();
  if (loading) {
    return <Loading />
  }
  if (cocktail.length < 1) {
    setLoading(false);
    return <h2 className='section-title'>No cocktail found</h2>
  }
  console.log(cocktail);
  return (
    <section className='section'>
      <h2 className='section-title'></h2>
      <div className='cocktails-center'>
        {cocktail.map((item) => {
          return <Cocktail key='item.id' {...item} />
        })}
      </div>

    </section>
  )
}

export default CocktailList
