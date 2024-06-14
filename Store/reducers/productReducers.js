import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { BASE_URL, END_POINTS } from "../../Network/APIManager"
import axios from "axios"

const initialState = {
    isLoading: false,
    ProductList: [],
    cartProducts: [],
    wishListProducts: []
}

export const fetchProducts = createAsyncThunk('fetchContent',async () => {
    const res = await axios.get(BASE_URL + END_POINTS.products)
    return res.data
})

updateQuantityInCart = (state, index, isAddedToCart) => {
    let item = state.cartProducts[index]
    item.quantity = isAddedToCart ? item.quantity +=1 : item.quantity -=1
    item.price = item.originalPrice * item.quantity
    state.cartProducts[index] = item
}

updateCart = (state, product, isAddedToCart) => {
    let item = {
        ...product,
        isAddedToCart: isAddedToCart
    }
    
    state.ProductList = state.ProductList.map(product => {
        return product.id == item.id ? item : product
    })

    if (isAddedToCart) {
        item = {
            ...item,
            originalPrice: item.price,
            quantity: 1
        }
        state.cartProducts.push(item)
    } else {
       state.cartProducts = state.cartProducts.filter(itemInCart => {
            return itemInCart.id != item.id
        })
    }
}

updateWishList = (state, product, isAddedToWishList) => {
    let item = {
        ...product,
        isAddedToWishList: isAddedToWishList
    }
    
    state.ProductList = state.ProductList.map(product => {
        return product.id == item.id ? item : product
    })

    if(isAddedToWishList) {
        state.wishListProducts = [
            ...state.wishListProducts,
            item
        ]
    } else {
        state.wishListProducts = state.wishListProducts.filter(itemInWishList => {
            return itemInWishList.id != item.id
        })
    }
}

const productSlice = createSlice({
    name: 'productReducer',
    initialState: initialState,
    reducers: {
         updateItemInCart(state, action) {
            updateCart(state, action.payload.product, action.payload.isAddedToCart)
        },
        updateItemInWishList(state, action) {
            updateWishList(state, action.payload.product, action.payload.isAddedToWishList)
        },
        updateItemQuantityAndPrice(state, action){
            updateQuantityInCart(state, action.payload.index, action.payload.isAddedToCart)
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.ProductList = action.payload
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false
        })
    }
})
export const { fetchDataFromServer, updateItemInCart, updateItemInWishList, updateItemQuantityAndPrice } = productSlice.actions
export default productSlice.reducer;