import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class CartService {

  constructor(private toastr: ToastrService) {
  }
  private cart: any[] = [];




  initCart() {
    if(!localStorage.getItem("cart")){
      localStorage.setItem("cart", "[]");
    }
    this.cart = JSON.parse(localStorage.getItem("cart") as any || []);

  }



 addToCart(productID: String, quantity: number) {

   let res = this.cart.find(element => element.productID === productID);
   if(res === undefined) {
    this.cart.push({productID, quantity});
   this.toastr.success("Added product to your cart!", "Product added!")
   localStorage.setItem("cart", JSON.stringify(this.cart));
   } else {
     res.quantity = quantity;
     localStorage.setItem("cart", JSON.stringify(this.cart));
     this.toastr.success("Adjusted the quantity!", "Quantity adjusted!")
   }
  }


  removeFromCart(productID: String) {
    let res = JSON.parse(localStorage.getItem("cart") as any || []);
    let temp = res.filter((item: any) => item.productID != productID);
    localStorage.setItem("cart", JSON.stringify(temp));
    this.toastr.success("Succesfully removed the product", "Succesfully removed!");
  }

  getCart() {
    return this.cart;
  }
}
