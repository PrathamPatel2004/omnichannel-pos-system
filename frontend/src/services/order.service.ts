import axios from "axios";

export const createOrder = async (items:{productId: number, quantity: number}[]) =>{
    const response = await axios.post(
        "http://localhost:5000/api/auth/orders", {items}
    )
    return response.data
}