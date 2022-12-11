<template>
    <div class="filterBox">
        <form id="listFilter">
            <label id="filtrujLabel">filtruj</label><br><hr class="labelLine">
            <label>kategoria:</label><br>
                <select v-model="filterCategory">
                    <option value="-">-</option>
                    <option value="art-biurowe">art. biurowe</option>
                    <option value="chemia">chemia</option>
                    <option value="do-wypiekow">do wypieków</option>
                    <option value="inne">inne</option>
                    <option value="kawa-i-herbata">kawa i herbata</option>
                    <option value="konserwy">konserwy</option>
                    <option value="kosmetyki">kosmetyki</option>
                    <option value="mięso">mięso</option>
                    <option value="mrozonki">mrożonki</option>
                    <option value="nabial">nabiał</option>
                    <option value="napoje">napoje</option>
                    <option value="owocewarzywa">owoce i warzywa</option>
                    <option value="pieczywo">pieczywo</option>
                    <option value="przetwory">przetwory</option>
                    <option value="przyprawy">przyprawy</option>
                    <option value="reksio">reksio</option>
                    <option value="slodycze">słodycze</option>
                    <option value="sosy">sosy</option>
                    <option value="sypkie">sypkie</option>
                    <option value="wedliny">wędliny</option>
                </select><br>
            <label>preferowany sklep:</label><br>
                <select v-model="filterPreferredShop">
                    <option value="-">-</option>
                    <option value="auchan">Auchan</option>
                    <option value="bazarek">bazarek</option>
                    <option value="leclerc">Leclerc</option>
                    <option value="putka">Putka</option>
                    <option value="kazdy">każdy</option>
                </select><br>
            <input type="checkbox" v-model="filterPilne"><label> pilne</label>
            <button @click="getListItems" type="button">pokaż</button>
        </form>
    </div>
    <div id="listContainer">

    </div>
    <div id='deleteCheckedButton' @click='deleteChecked'>
        usuń zaznaczone
    </div>
    
</template>
<script>
/* eslint-disable */

//firebase setup
import { initializeApp } from "firebase/app";
import { getFirestore, query, where, collection, getDocs, updateDoc, doc} from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyB4M5htVbUrlakcoTI1BBxZ8PmNRR5cLN8",
  authDomain: "lista-zakupow-cca0b.firebaseapp.com",
  projectId: "lista-zakupow-cca0b",
  storageBucket: "lista-zakupow-cca0b.appspot.com",
  messagingSenderId: "1056747706154",
  appId: "1:1056747706154:web:61df158fcbbf4fcd86f053",
  measurementId: "G-GJKM4Z4741"
  });
  
const db = getFirestore(app)






export default {
    data(){
        return{
            filterCategory:"-",
            filterPreferredShop:"-",
            filterPilne:false,
        }
    },
    methods:{
        async deleteChecked(){
            var items = document.getElementsByClassName("listItemCheckbox")
            console.log(items.length)
            
            var i=0
            var confirmDelete = confirm("Czy na pewno chcesz usunąć wybrane elementy z listy?")
            if(confirmDelete){
                //kontynuuj
            }else{
                //przerwij
                return
            }
            while(items.length!=i){
                if(items[i].checked == true){
                    console.log(items[i].parentNode.parentNode.id)
                    var idelement = items[i].parentNode.parentNode.id
                    items[i].parentNode.parentNode.remove()
                    await updateDoc(doc(db,"items",idelement),{
                        onList: false,
                        pilne: false
                    })
                }
                i++
            }
        },
        async getListItems(){
            if(this.filterCategory == "" || this.filterPreferredShop == ""){
                alert("któreś pole jest puste")
                return
            }
            //probowalem zrobic to przez dodawanie stringow ala budowanie kwerendy ale q nie moze byc stringiem albo cos, zwracalo blad
            if(this.filterCategory == "-" && this.filterPreferredShop == "-" && this.filterPilne == false){
                var q = query(collection(db,"items"), where("onList","==",true), where("category", "!=" ,"hhhhhhh"))
            }
            if(this.filterCategory == "-" && this.filterPreferredShop == "-" && this.filterPilne == true){
                var q = query(collection(db,"items"), where("onList","==",true), where("category", "!=" ,"hhhhhhh"), where("pilne", "==" ,true))
            }
            if(this.filterCategory != "-" && this.filterPreferredShop == "-" && this.filterPilne == false){
                var q = query(collection(db,"items"), where("onList","==",true), where("category", "==" ,this.filterCategory))
            }
            if(this.filterCategory != "-" && this.filterPreferredShop == "-" && this.filterPilne == true){
                var q = query(collection(db,"items"), where("onList","==",true), where("category", "==" ,this.filterCategory), where("pilne", "==" ,true))
            }
            if(this.filterCategory == "-" && this.filterPreferredShop != "-" && this.filterPilne == false){
                var q = query(collection(db,"items"), where("onList","==",true), where("preferredShop", "==" ,this.filterPreferredShop))
            }
            if(this.filterCategory == "-" && this.filterPreferredShop != "-" && this.filterPilne == true){
                var q = query(collection(db,"items"), where("onList","==",true), where("preferredShop", "==" ,this.filterPreferredShop), where("pilne", "==" ,true))
            }
            if(this.filterCategory != "-" && this.filterPreferredShop != "-" && this.filterPilne == false){
                var q = query(collection(db,"items"), where("onList","==",true), where("category", "==" ,this.filterCategory), where("preferredShop", "==" ,this.filterPreferredShop))
            }
            if(this.filterCategory != "-" && this.filterPreferredShop != "-" && this.filterPilne == true){
                var q = query(collection(db,"items"), where("onList","==",true), where("category", "==" ,this.filterCategory), where("preferredShop", "==" ,this.filterPreferredShop), where("pilne", "==" ,true))
            }



            document.getElementById("listContainer").innerHTML = ""
            
                        
            const querySnapshot = await getDocs(q)
            if(querySnapshot.empty==true){
                var listItemWarning = document.createElement("div")
                listItemWarning.className = "listItemWarning"
                listItemWarning.textContent = "brak produktów spełniających oczekiwania"
                document.getElementById("listContainer").appendChild(listItemWarning)
            }

            querySnapshot.forEach((a)=>{
                //div na element listy
                var listItemContainer = document.createElement("div")
                listItemContainer.className = "listItemContainer"
                listItemContainer.id = a.id
                listItemContainer.style.order = "5"

                //div na text - lewa strona
                var listItemText = document.createElement("div")
                listItemText.className = "listItemText"
                listItemText.textContent = a.id
                listItemText.isPilne = false
                if(a.data().pilne == true){
                    listItemText.isPilne = true
                    listItemContainer.style.order = "1"
                    listItemText.style.color = "#c90000"
                    listItemText.style.fontWeight = "800"
                }


                //przypnij text
                listItemContainer.appendChild(listItemText)

                //div na checkbox
                var listItemCheck = document.createElement("div")
                listItemCheck.className = "listItemCheck"

                //checkbox
                var listItemCheckElement = document.createElement("input")
                listItemCheckElement.className = "listItemCheckbox"
                listItemCheckElement.id = a.id
                listItemCheckElement.type = "checkbox"
                listItemCheckElement.onclick = ()=>{
                    //odznacz item
                    if(listItemCheckElement.checked == true){
                        listItemContainer.style.order = "10"
                        listItemText.style.color = "gray"
                        listItemText.style.fontWeight = "100"
                    }
                    //wroc item na liste
                    if(listItemCheckElement.checked == false){
                        if(listItemText.isPilne == true){
                            listItemContainer.style.order = "1"
                            listItemText.style.color = "#c90000"
                            listItemText.style.fontWeight = "800"
                        }else{
                            listItemContainer.style.order = "5"
                            listItemText.style.color = "black"
                            listItemText.style.fontWeight = "100"
                        }
                        
                    }
                    
                }
                listItemCheck.appendChild(listItemCheckElement)

                //przypnij checkbox
                listItemContainer.appendChild(listItemCheck)

                //przypnij element
                document.getElementById("listContainer").appendChild(listItemContainer)
            }) 
        }
    }
}

</script>