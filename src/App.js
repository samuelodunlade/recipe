import { useEffect, useState } from "react"
import axios from "axios"


import Banner from "./Recipe_components/Banner"
import Copy from "./Recipe_components/Copy"
import Footer from "./Recipe_components/Footer"
import List from "./Recipe_components/List"
import Nav from "./Recipe_components/Nav"


const RecipeApp = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [frecipe, setFRecipe] = useState([]);
    const[keyword, setKeyWord] = useState('');
    
    useEffect(()=>{
      makeApiCall()
    }, [])

  //this function will do the filtering
    const handleFilter = () => {
      
      const filtered_recipes = recipes.filter((recipe)=>{
        return recipe.name.toLowerCase().includes(keyword.toLowerCase())
      })

      setFRecipe(filtered_recipes)
    }
    //make the call and get the data for us
    function makeApiCall(){
        axios.get("https://dummyjson.com/recipes")
        .then(function(resp){
          console.log(resp.data.recipes)
          setLoading(false)
          setRecipes(resp.data.recipes)
        })
        .catch(function(err){
          console.log(err)
          setLoading(false);
          setError(true)
        })
    }




  return (
    <div className="container-fluid">
      <Nav/>
      <Banner setKeyWord={setKeyWord} keyword={keyword} handleFilter={handleFilter}/>
      <List  loading={loading} error={error} recipes={recipes} frecipe={frecipe} keyword={keyword}/>
      <Footer/>
      <Copy/>
    </div>
  )
}

export default RecipeApp