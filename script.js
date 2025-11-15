// simple cart with quantity
if(!localStorage.getItem("cart")) localStorage.setItem("cart",JSON.stringify([]));

function addToCart(name,price,image){
 let c=JSON.parse(localStorage.getItem("cart"));
 let f=c.find(i=>i.name===name);
 if(f) f.qty++;
 else c.push({name,price,image,qty:1});
 localStorage.setItem("cart",JSON.stringify(c));
 updateCartCount();
}

function updateCartCount(){
 let c=JSON.parse(localStorage.getItem("cart"));
 let t=c.reduce((a,i)=>a+i.qty,0);
 let el=document.getElementById("cart-count");
 if(el) el.textContent=t;
}

function loadCartItems(){
 let c=JSON.parse(localStorage.getItem("cart"));
 let box=document.getElementById("cart-items");
 let totalBox=document.getElementById("total-price");
 if(c.length===0){ box.innerHTML="Cart empty"; totalBox.textContent="0"; return; }
 box.innerHTML=""; let total=0;
 c.forEach((it,i)=>{
  let sub=it.qty*it.price; total+=sub;
  box.innerHTML+=`<div class='item'>
    <img src="${it.image}" class="menu-img">
    <h3>${it.name}</h3>
    <p>Rs ${it.price}</p>
    <p>Qty: ${it.qty}</p>
    <p>Subtotal: Rs ${sub}</p>
    <button onclick="inc(${i})">+</button>
    <button onclick="dec(${i})">-</button>
  </div>`;
 });
 totalBox.textContent=total;
}

function inc(i){let c=JSON.parse(localStorage.getItem("cart"));c[i].qty++;localStorage.setItem("cart",JSON.stringify(c));loadCartItems();updateCartCount();}
function dec(i){let c=JSON.parse(localStorage.getItem("cart"));if(c[i].qty>1)c[i].qty--;else c.splice(i,1);localStorage.setItem("cart",JSON.stringify(c));loadCartItems();updateCartCount();}
updateCartCount();
