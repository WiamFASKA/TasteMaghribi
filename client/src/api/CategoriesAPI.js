import React , {useState, useEffect} from 'react'
import axios from 'axios'

function CategoriesAPI(token) {

    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)
    
    useEffect(() => {
        // Fonction pour obtenir les catégories
        const getCategories = async () => {
          try {
            const res = await axios.get('http://localhost:5000/api/category', {
              headers: {
                Authorization: `Bearer ${token}`, // Inclure le token d'authentification si nécessaire
              },
            });
            
            if (res.status === 200) {
              setCategories(res.data); // Si la réponse est OK, mettre à jour l'état
            } else {
              console.error('Erreur lors de la récupération des catégories:', res);
            }
          } catch (error) {
            console.error('Erreur de requête API:', error);
          }
        };
        
            getCategories();
        
    },[callback, token]); 
    return {
            categories:[categories, setCategories],
            callback:[callback,setCallback]
    }
        
    
}

export default CategoriesAPI