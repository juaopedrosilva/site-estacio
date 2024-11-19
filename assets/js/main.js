document.addEventListener("DOMContentLoaded", () => {
   const cart = JSON.parse(localStorage.getItem("cart")) || [];

   if(cart.length > 0) {
      document.getElementById('count').innerHTML = `${cart.length} Items`
   }
});
