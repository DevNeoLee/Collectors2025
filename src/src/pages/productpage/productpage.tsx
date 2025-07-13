import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft, FaShoppingCart, FaHeart } from 'react-icons/fa';

import productpageStyle from './productpage.module.scss';
import FormButton from '../../components/form-button/form-button';
import { addProduct } from '../../redux/cart/cart-slice';
import { selectCollections } from '../../redux/shop/shop-selectors';
import type { RootState, ShopItem } from '../../types/common';

const Productpage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const collections = useSelector((state: RootState) => selectCollections(state));
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  // Find product from all categories
  const findProduct = (): ShopItem | null => {
    if (!collections || !productId) {
      console.log('Collections or productId is missing:', { collections, productId });
      return null;
    }
    
    console.log('Looking for product with ID:', productId);
    console.log('Available collections:', Object.keys(collections));
    
    for (const category of Object.values(collections)) {
      console.log('Checking category:', category.title, 'with items:', category.items.length);
      const product = category.items.find((item: ShopItem) => {
        console.log('Comparing item ID:', item.id, 'with productId:', productId, 'Type:', typeof item.id, typeof productId);
        return item.id === parseInt(productId);
      });
      if (product) {
        console.log('Found product:', product);
        return product;
      }
    }
    
    console.log('Product not found in any category');
    return null;
  };

  const product = findProduct();

  useEffect(() => {
    if (product) {
      setSelectedImage(product.imageUrl);
      document.title = `${product.name} - Collectors App`;
    } else if (productId) {
      document.title = 'Product Not Found - Collectors App';
    } else {
      document.title = 'Product - Collectors App';
    }
  }, [product, productId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return (
      <div className={productpageStyle.productpage}>
        <div className={productpageStyle.notFound}>
          <h2>Product Not Found</h2>
          <p>The requested product does not exist or may have been removed.</p>
          <button 
            onClick={() => navigate('/')}
            className={productpageStyle.backButton}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addProduct({ ...product, quantity }));
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className={productpageStyle.productpage}>
      <div className={productpageStyle.container}>
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className={productpageStyle.backButton}
        >
          <FaArrowLeft /> Back
        </button>

        <div className={productpageStyle.content}>
          {/* Product image section */}
          <div className={productpageStyle.imageSection}>
            <div className={productpageStyle.mainImage}>
              <img src={selectedImage} alt={product.name} />
            </div>
            <div className={productpageStyle.thumbnailContainer}>
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className={`${productpageStyle.thumbnail} ${selectedImage === product.imageUrl ? productpageStyle.active : ''}`}
                onClick={() => setSelectedImage(product.imageUrl)}
              />
              {/* Additional thumbnails can be added here */}
            </div>
          </div>

          {/* Product information section */}
          <div className={productpageStyle.infoSection}>
            <div className={productpageStyle.header}>
              <h1 className={productpageStyle.title}>{product.name}</h1>
              <div className={productpageStyle.actions}>
                <button className={productpageStyle.wishlistButton}>
                  <FaHeart />
                </button>
              </div>
            </div>

            <div className={productpageStyle.priceSection}>
              <span className={productpageStyle.price}>${product.price}</span>
              <span className={productpageStyle.originalPrice}>${(product.price * 1.2).toFixed(2)}</span>
              <span className={productpageStyle.discount}>20% OFF</span>
            </div>

            <div className={productpageStyle.description}>
              <h3>Product Description</h3>
              <p>
                {`This ${product.name} is a premium item for collectors. 
                Made with high-quality materials, it can be preserved for a long time and 
                will add value to any true collector's collection.`}
              </p>
            </div>

            <div className={productpageStyle.specifications}>
              <h3>Product Information</h3>
              <div className={productpageStyle.specGrid}>
                <div className={productpageStyle.specItem}>
                  <span className={productpageStyle.specLabel}>Category:</span>
                  <span className={productpageStyle.specValue}>Collectibles</span>
                </div>
                <div className={productpageStyle.specItem}>
                  <span className={productpageStyle.specLabel}>Material:</span>
                  <span className={productpageStyle.specValue}>Premium Materials</span>
                </div>
                <div className={productpageStyle.specItem}>
                  <span className={productpageStyle.specLabel}>Warranty:</span>
                  <span className={productpageStyle.specValue}>1 Year</span>
                </div>
                <div className={productpageStyle.specItem}>
                  <span className={productpageStyle.specLabel}>Shipping:</span>
                  <span className={productpageStyle.specValue}>Free Shipping</span>
                </div>
              </div>
            </div>

            <div className={productpageStyle.quantitySection}>
              <h3>Quantity</h3>
              <div className={productpageStyle.quantityControls}>
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className={productpageStyle.quantityButton}
                >
                  -
                </button>
                <span className={productpageStyle.quantityDisplay}>{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                  className={productpageStyle.quantityButton}
                >
                  +
                </button>
              </div>
            </div>

            <div className={productpageStyle.totalSection}>
              <span className={productpageStyle.totalLabel}>Total:</span>
              <span className={productpageStyle.totalPrice}>${(product.price * quantity).toFixed(2)}</span>
            </div>

            <div className={productpageStyle.actionButtons}>
              <button 
                onClick={handleAddToCart}
                className={`${productpageStyle.addToCartButton} ${productpageStyle.actionButton}`}
              >
                <FaShoppingCart /> Add to Cart
              </button>
              
              <button 
                onClick={() => {
                  handleAddToCart();
                  navigate('/checkout');
                }}
                className={`${productpageStyle.buyNowButton} ${productpageStyle.actionButton}`}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productpage; 