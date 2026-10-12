const addBtn=document.getElementById("addBtn");
const contactForm=document.getElementById("contactForm");
const nameInput=document.getElementById("nameInput");
const phoneInput=document.getElementById("phoneInput");
const emailInput=document.getElementById("emailInput");
const saveBtn=document.getElementById("saveBtn");
const cancelBtn=document.getElementById("cancelBtn");
const contactList = document.getElementById("contactList");
const searchInput=document.getElementById("searchInput");
searchInput.addEventListener("input",function(){
    const searchText=searchInput.value.toLowerCase();
    const cards=contactList.querySelectorAll(".contact-card");
    cards.forEach(function(card){
      const name=card.querySelector("h3").textContent.toLowerCase();
      const phone=card.querySelector("p").textContent.toLowerCase();
        if (name.includes(searchText)||phone.includes(searchText)){
            card.style.display="block";
        }else{card.style.display="none"};
    })
})
let editingCard=null;
contactForm.style.display="none";
addBtn.addEventListener("click",function(){
    contactForm.style.display="block";
})
cancelBtn.addEventListener("click",function(){
    contactForm.style.display="none";
})
saveBtn.addEventListener("click",function(){
    const name=nameInput.value;
    const phone=phoneInput.value;
    const email=emailInput.value;
    if(editingCard){
        editingCard.querySelector("h3").textContent=name;
        editingCard.querySelector("p").textContent=`📞 ${phone}`;
        editingCard.querySelectorAll("p")[1].textContent= `✉️ ${email}`;
        editingCard=null
    }else{
    const card=document.createElement("div");
    card.className="contact-card";
                card.innerHTML =`

             <h3>${name}</h3>

                <p>📞 ${phone}</p>

                <p>✉️ ${email}</p>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>

            `;
            contactList.appendChild(card)}
            
            nameInput.value="";
            phoneInput.value="";
            emailInput.value="";
            contactForm.style.display="none";

})
async function fetchContacts() {

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );
        if(!response.ok){
            throw new Error("Failed to fetch contacts"); 
        }

        const contacts = await response.json();

        contacts.forEach(function(contact) {

            const card = document.createElement("div");

            card.className = "contact-card";

            card.innerHTML =`
             <h3>${contact.name}</h3>
                <p>📞 ${contact.phone}</p>
                <p>✉️ ${contact.email}</p>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;

            contactList.appendChild(card);
        

        });

    } catch (error) {

            console.log("Error fetching contacts:", error);
            contactList.innerHTML=`<p>Unable to load the contact. Please try again</p>`;

    }
}

fetchContacts ();
contactList.addEventListener("click",function(event){
    if(event.target.classList.contains("delete-btn"))
        event.target.parentElement.remove();
})
contactList.addEventListener("click",function(event){
    if(event.target.classList.contains("edit-btn")){
        const card=event.target.parentElement;
        const name= card.querySelector("h3").textContent;
                const phone = card.querySelector("p").textContent.replace("📞 ", "");
        const email = card.querySelectorAll("p")[1].textContent.replace("✉️ ", "");
    
        nameInput.value = name;
        phoneInput.value = phone;
        emailInput.value = email;
        editingCard=card

        contactForm.style.display = "block";
    


    }
    

})