document.addEventListener("DOMContentLoaded", () => {
   const form = document.getElementById("checkout-form");

   const myCart = JSON.parse(localStorage.getItem("cart"));

   console.log(myCart);

   form.addEventListener("submit", (event) => {
      event.preventDefault(); // Impede o envio padrão do formulário

      // Captura os dados do formulário
      const formData = new FormData(form);
      const name = formData.get("name");
      const phone = formData.get("phone");
      const paymentMethod = formData.get("payment-method");

      // Mensagem formatada para o WhatsApp com emojis
      let message = ` *Novo Pedido!* %0A` +
         ` *Nome*: ${encodeURIComponent(name)}%0A` +
         ` *Telefone*: ${encodeURIComponent(phone)}%0A` +
         ` *Forma de Pagamento*: ${encodeURIComponent(paymentMethod)}%0A`;

      // Adiciona os itens do carrinho à mensagem
      if (myCart && myCart.length > 0) {
         message += ` *Itens no Carrinho*: %0A`;
         myCart.forEach(item => {
            message += ` - ${encodeURIComponent(item.title)} (Preço: ${encodeURIComponent(new Intl.NumberFormat('pt-BR', {
               style: 'currency',
               currency: 'BRL'
             }).format(item.price))})%0A`;
         });
      }

      // Número do WhatsApp (formato internacional)
      const whatsappNumber = "5585996807376";

      // Gera o link do WhatsApp
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

      // Abre o WhatsApp em uma nova aba
      window.open(whatsappLink, "_blank");
   });
});
