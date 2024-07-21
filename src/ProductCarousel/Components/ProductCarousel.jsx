import { useEffect } from "react";
import { useState } from "react"
import axios from "axios";
import '../Styles/ProductCarousel.css';

export default function ProductCarousel(){
    const[products, setProduct] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const[isRunning, setIsRunning]= useState(true);
    const[btnTxt, setBtnTxt]= useState('Pause');
    const[btnIcon, setBtnIcon]= useState(<span className="bi bi-pause"></span>)
    
    // function GetProduct(){
    //     axios.get("http://fakestoreapi.com/products")
    //     .then(response=>{
    //         setProduct(response.data)
    //     })
    // }

    function GetProduct() {
        axios.get("http://fakestoreapi.com/products", {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            setProduct(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    
    function HandleRangeChange(e){
        setCurrentSlide(parseInt(e.target.value));
    }

    useEffect(() => {
        GetProduct();
        if(isRunning){
            const interval = setInterval(() => {
                setCurrentSlide((prevSlide)=> (prevSlide===products.length-1)?0:prevSlide+1);
            }, 2000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [isRunning,products.length]);
      
    function handleClickPrev(){
        setCurrentSlide((prevSlide)=>(prevSlide===0?products.length-1:prevSlide-1));
    }
    function handleClickNext(){
        setCurrentSlide((prevSlide)=> (prevSlide===products.length-1)?0:prevSlide+1);
    }
    function HandlePlayPause(){
        if(isRunning){
            setIsRunning(false);
            setBtnTxt('Play');
            setBtnIcon(<span className="bi bi-play"></span>);
        }else{
            setIsRunning(true);
            setBtnTxt('Pause');
            setBtnIcon(<span className="bi bi-pause"></span>);
        }
    }

    return(
        <div className="container-fluid">
            <h2 className="text-center mt-4">Product Image Carousel</h2>
            <div className="box" style={{borderRadius:'20px', height:'400px', width:'800px',margin:'auto' ,marginTop:'100px'}}>
                {
                    products.map((product, index) =>
                        <div key={product.id} className="slide" style={{ opacity: index === currentSlide ? '1' : '0' }}>
                            <img src={product.image} alt="Images" height={'400px'} width={'500px'} style={{padding:'50px', marginLeft:'140px'}}/>
                        </div>
                    )
                }
            </div>
            <div className="foot d-flex" style={{margin:'auto',flexDirection:'column', alignItems:'center'}}>
                <input type="range" style={{'width':'800px', marginTop:'10px'}} value={currentSlide} min='0' max={products.length-1} onChange={HandleRangeChange} />
                <div className="buttons mt-2">
                    <button className="btn btn-primary me-4" type="button" onClick={handleClickPrev}><i className="bi bi-skip-backward-fill"></i></button>
                    <button className={`btn ${isRunning ? 'btn-danger' : 'btn-success'}`} style={{width:'100px'}} onClick={HandlePlayPause}>{btnIcon}{btnTxt}</button>
                    <button className="btn btn-primary ms-4" type="button" onClick={handleClickNext}><i className="bi bi-fast-forward-fill"></i></button>
                </div>
            </div>
        </div>
    )
}