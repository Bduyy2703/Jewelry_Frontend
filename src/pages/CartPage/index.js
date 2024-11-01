import React, { useState, useEffect } from "react";
import styles from "./CartPage.module.scss";
import cartEmptyImage from "../../icon/cart-empty.png";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Giỏ hàng" },
  ];

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);

  const handleDecrement = (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleIncrement = (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const updateLocalStorage = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const handleRemoveItem = (itemId) => {
    // Xóa item khỏi state
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

    // Xóa item khỏi localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const totalAmount = cartItems.reduce((total, item) => {
    return (
      total +
      (item.product.product_sale_price || item.product.product_price) *
        item.quantity
    );
  }, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className={styles.wrapper}>
        <span className={styles.nameCart}>Giỏ hàng của bạn</span>
        <div className={styles.cart}>
          <div className={styles.cartLeft}>
            {cartItems.length === 0 ? (
              <>
                <div>
                  <img
                    className={styles.img}
                    src={cartEmptyImage}
                    alt="cart1"
                  />
                </div>
                <div className={styles.empty}>
                  Không có sản phẩm nào trong giỏ hàng của bạn
                </div>
              </>
            ) : (
              <>
                <div className={styles.top}>
                  <div>Thông tin sản phẩm</div>
                  <div className={styles.pricee}>Đơn giá</div>
                  <div>Số lượng</div>
                  <div>Thành tiền</div>
                </div>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles.middle}>
                    <div className={styles.middleRow}>
                      <img
                        className={styles.image}
                        src={
                          item.product.product_details.product_images[0]
                            .secure_url
                        }
                        alt={item.product.product_name}
                      />
                    </div>
                    <div className={styles.content}>
                      <div className={styles.contentLeft}>
                        <div className={styles.name}>
                          {item.product.product_name}
                        </div>
                        <span className={styles.material}>
                          {item.product.product_details.color}
                        </span>
                        <a
                          title="Xóa"
                          className={styles.btn}
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Xóa
                        </a>
                      </div>
                      <div className={styles.contentRight}>
                        <div>
                          <h4 className={styles.price}>
                            {new Intl.NumberFormat("vi-VN").format(
                              item.product.product_sale_price ||
                                item.product.product_price,
                            )}
                            <span className={styles.dong}>đ</span>
                          </h4>
                        </div>
                        <div className={styles.quantityControl}>
                          <button
                            className={styles.quantityButton}
                            onClick={() => handleDecrement(item.id)}
                          >
                            -
                          </button>
                          <span className={styles.quantity}>
                            {item.quantity}
                          </span>
                          <button
                            className={styles.quantityButton}
                            onClick={() => handleIncrement(item.id)}
                          >
                            +
                          </button>
                        </div>
                        <div>
                          <h4 className={styles.price}>
                            {new Intl.NumberFormat("vi-VN").format(
                              (item.product.product_sale_price ||
                                item.product.product_price) * item.quantity,
                            )}
                            <span className={styles.dong}>đ</span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className={styles.bottom}>
                  <Link to="/" className={styles.goOn}>
                    Tiếp tục mua hàng
                  </Link>
                  <div className={styles.subTotal}>
                    <div className={styles.cartSubTotal}>
                      <div>TỔNG TIỀN: </div>
                      <div>
                        <h4 className={styles.price}>
                          {new Intl.NumberFormat("vi-VN").format(totalAmount)}
                          <span className={styles.dong}>đ</span>
                        </h4>
                      </div>
                    </div>
                    <div
                      className={styles.btnCheckout}
                      onClick={handleCheckout}
                    >
                      Thanh toán
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={styles.cartRight}>
            <DiscountCard />
          </div>
        </div>
      </div>
    </>
  );
};

const DiscountCard = () => {
  return (
    <div className={styles.discountCard}>
      <div className={styles.discountCardHeader}>
        <img
          src="//bizweb.dktcdn.net/100/461/213/themes/870653/assets/code_dis.gif?1729756726879"
          alt="Gift Icon"
        />
        <h3>MÃ GIẢM GIÁ</h3>
      </div>
      <div className={styles.discountCardContent}>
        <div className={styles.discountItem}>
          <div className={styles.discountTitle}>GIẢM 10%</div>
          <div className={styles.discountCodeContainer}>
            <div className={styles.discountCode}>
              <span>Top Code</span>
              <span>MUA2GIAM10</span>
              <button className={styles.copyButton}>Copy</button>
            </div>
          </div>
        </div>
        <div className={styles.discountItem}>
          <div className={styles.discountTitle}>FREESHIP</div>
          <div className={styles.discountCodeContainer}>
            <div className={styles.discountCode}>
              <span>Top Code</span>
              <span>FREESHIP950K</span>
              <button className={styles.copyButton}>Copy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
