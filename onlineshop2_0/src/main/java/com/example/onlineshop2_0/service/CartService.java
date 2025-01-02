package com.example.onlineshop2_0.service;

import com.example.onlineshop2_0.model.CartItem;
import com.example.onlineshop2_0.model.Product;
import jakarta.servlet.http.HttpSession;

import java.util.ArrayList;
import java.util.List;

public class CartService {
    private static final String CART_SESSION_ATTRIBUTE = "cart";

    public void addToCart(HttpSession session, Product product, int quantity) {
        List<CartItem> cart = getCart(session);

        // Check if the product is already in the cart
        for (CartItem item : cart) {
            if (item.getProduct().getId() == product.getId()) {
                item.setQuantity(item.getQuantity() + quantity);
                session.setAttribute(CART_SESSION_ATTRIBUTE, cart);
                return;
            }
        }

        // If the product is not in the cart, add it
        cart.add(new CartItem(product, quantity));
        session.setAttribute(CART_SESSION_ATTRIBUTE, cart);
    }

    public void removeFromCart(HttpSession session, int productId) {
        List<CartItem> cart = getCart(session);
        cart.removeIf(item -> item.getProduct().getId() == productId);
        session.setAttribute(CART_SESSION_ATTRIBUTE, cart);
    }

    public void updateCartItemQuantity(HttpSession session, int productId, int quantity) {
        List<CartItem> cart = getCart(session);
        for (CartItem item : cart) {
            if (item.getProduct().getId() == productId) {
                item.setQuantity(quantity);
                break;
            }
        }
        session.setAttribute(CART_SESSION_ATTRIBUTE, cart);
    }

    public List<CartItem> getCart(HttpSession session) {
        List<CartItem> cart = (List<CartItem>) session.getAttribute(CART_SESSION_ATTRIBUTE);
        if (cart == null) {
            cart = new ArrayList<>();
            session.setAttribute(CART_SESSION_ATTRIBUTE, cart);
        }
        return cart;
    }

    public void clearCart(HttpSession session) {
        session.removeAttribute(CART_SESSION_ATTRIBUTE);
    }
}
