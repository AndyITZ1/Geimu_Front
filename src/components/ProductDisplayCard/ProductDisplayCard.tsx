import './ProductDisplayCard.css';


const ProductDisplayCard = (props: any) => {
    // products price, name, img
    

    return (
        <div className="display-container" onClick={props.onClick}>
            <div className="product-img-container">
                <img id="product-img" src={props.url} alt="test"/>
            </div>
            <div className="product-content">
                <h3>{props.name}</h3>
                <h2><span id="dollar-sign">$</span>{props.price}</h2>
                <h3>{props.console}</h3>
                <h4>{props.edition} Edition</h4>
            </div>
        </div>
    )
}

export default ProductDisplayCard;