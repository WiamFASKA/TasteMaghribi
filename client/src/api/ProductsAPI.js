import React, {useState, useEffect} from 'react'
import axios from 'axios'

function ProductsAPI() {
    const [products, setProducts] = useState([])
    const [callback,setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setpage] = useState(1)
    const [result, setResult] = useState(0)



    useEffect(()=>{
        const getProducts = async()=>{
            let url = `/api/products?limit=${page * 9}`;

            // Ajouter les paramètres de recherche et de catégorie si définis
            if (category) url += `&category=${category}`;
            if (sort) url += `&sort=${sort}`;
            if (search) url += `&title[regex]=${search}`;
            try {
                const res = await axios.get(url);
            setProducts(res.data.products)
            setResult(res.data.result)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        }
        getProducts()
    },[callback,page,category,sort,search])

    return {
       products: [products, setProducts],
       callback:[callback,setCallback],
       category: [category, setCategory], 
    sort: [sort, setSort] ,
    search: [search, setSearch], 
    page: [page, setpage] ,
    result: [result, setResult] 
    }
}

export default ProductsAPI