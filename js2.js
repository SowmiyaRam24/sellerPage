async function saveToCrudCrud(event){
    try{
        event.preventDefault();
        let form=document.getElementById("forms");
        let name=event.target.name.value;
        let price=event.target.price.value;
        let product={
            name,
            price};
            const response=await axios.post("https://crudcrud.com/api/2dcafabc7870495aa278bb5fc4ff41b7/product",product)
            showDetailsOnScreen(response.data)
        }catch(err){
            document.getElementById("forms").innerHTML=document.getElementById("forms").innerHTML+"<h4>something went wrong</h4>"
               console.log(err)
        }
};
let totalsellingPrice=0;
function displayTotalSellingPrice(){
    let totalsellingPriceDisplay=document.getElementById("AddToCart");
    totalsellingPriceDisplay.innerHTML=`Total Amount:₹${totalsellingPrice}`+".00"
}
async function showDetailsOnScreen(product){
    try{
        let parent=document.getElementById("products");
        let child=document.createElement("li");
        child.textContent="🛒"+product.name+":₹"+product.price;
        totalsellingPrice+=parseInt(product.price);
        displayTotalSellingPrice();

        let deletbtn=document.createElement('input');
        deletbtn.type="button";
        deletbtn.value="Delete❌";
        deletbtn.classList="btn btn-dark ms-1 rounded-pill"
        deletbtn.onclick=async()=>{
            let res=await axios.delete(`https://crudcrud.com/api/2dcafabc7870495aa278bb5fc4ff41b7/product/${product._id}`)
            console.log(res)
            totalsellingPrice-=
            parseInt(product.price);
            displayTotalSellingPrice();
            parent.removeChild(child);
        }
        parent.appendChild(child);
        child.appendChild(deletbtn);
        child.classList="mb-3 mt-3 fs-4"
   }catch(error){
    console.log(err)

   }
}
window.addEventListener("DOMContentLoaded",async(e)=>{
    try{
            const response=await axios.get("https://crudcrud.com/api/2dcafabc7870495aa278bb5fc4ff41b7/product")
            for(let i=0;i<response.data.length;i++){
                showDetailsOnScreen(response.data[i])
            }
            
    }catch(error){
        console.log(error)
    }

})