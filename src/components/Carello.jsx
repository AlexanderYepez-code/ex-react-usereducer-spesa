import { useState } from "react";



export default function ListShop() {
    const products = [
        { name: 'Mela', price: 0.5 },
        { name: 'Pane', price: 1.2 },
        { name: 'Latte', price: 1.0 },
        { name: 'Pasta', price: 0.7 },
    ];

    const [addedProducts, setAddedProducts] = useState([]);
    function addtoCart(product) {

        setAddedProducts(prev => {
            const exist = prev.find(p => p.name === product.name);
            if (exist) {
                return prev.map(p => {
                    if (p.name === product.name) {
                        return {
                            ...p,
                            quantity: p.quantity + 1
                        }
                    } else {
                        return p
                    }
                })
            } else {
                return [
                    ...prev, {
                        ...product,
                        quantity: 1
                    }
                ]
            }

        })

    }

    function removeFromCart (product){
        setAddedProducts(prev =>{
            return prev.map(p=>{
                if(p.name ===product.name){
                    return {
                        ...p,
                        quantity: p.quantity -1
                    }
                }else{
                    return p;
                }
            }).filter(p => p.quantity > 0);
        })


    }

    const Totale = addedProducts.reduce((acc,p)=>{
        return acc + p.price*p.quantity
    },0)



    return (
        <>
            <div>
                <ul>
                    {products.map((p, i) => {
                        return (
                            <li key={i}>
                                <h4>prodotto:{p.name}</h4>
                                <p>Prezzo:{p.price}</p>
                                <button onClick={() => addtoCart(p)}>Aggiungi Carello</button>
                                
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div>
                <h1>carello</h1>
                <p>lista del carello</p>
                <ul>
                    {addedProducts.map((a, index) => {
                        return (
                            <>
                                <li key={index}>Prodotto:{a.name}
                                    <p>prezzo:{a.price}</p>
                                    <p>Quantita:</p>
                                </li>
                                    <input type="number" value={a.quantity} onChange={e => parseInt(e.target.value)} />
                                    <button onClick={()=>removeFromCart(a)}>Rimuovi prodotto</button>
                            </>
                        )
                    })}
                </ul>
            </div>
            <div>
                <h2>Totale Spesa:</h2>
                <p>{Totale.toFixed(2)} EURO</p>

            </div>
        </>
    )

}