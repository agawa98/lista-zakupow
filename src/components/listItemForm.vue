<template>
    <form id="listItem" class="leftForm">
        <label>wpisz produkt na listę zakupów</label><hr class="labelLine">
        <label>produkt: </label><input autocomplete="off" id="listItemInput" @click="checkAutoSuggestion" @input="autoSuggest" v-model="listItemInputValue">
        <label> | </label><input type="checkbox" id="pilneCheckbox" v-model="pilneCheckbox"><label> pilne </label>
        <div id="suggestContainer"></div>
        <button type="button" @click="listItem">wpisz</button>

    </form>
</template>
<script>
/* eslint-disable */

//firebase setup
import { numberLiteralTypeAnnotation } from "@babel/types";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, collection, doc, getDocs, setDoc, query, where, updateDoc, arrayUnion } from "firebase/firestore";

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


//jesli kliknie sie poza suggest menu to sie zamyka
document.onclick = function(e){
  if(e.target.id!=="suggestContainer" && e.target.id!=="listItemInput" || e.target.className == "suggestOption"){
    document.getElementById("suggestContainer").style.display = "none";
  }
}



export default {
    data(){
        return{
            itemArray: [],
            listItemInputValue:"",
            pilneCheckbox:false
        }
    },
    methods:{
        async listItem(){
            await updateDoc(doc(db,"items",this.listItemInputValue),{
                onList: true
            })
            if(this.pilneCheckbox==true){
                await updateDoc(doc(db,"items",this.listItemInputValue),{
                pilne: true
            })
            }

            //form reset
            this.listItemInputValue=""
            this.pilneCheckbox=false
        },
        autoSuggest(){
            //czyszczenie suggest boxa
            document.getElementById("suggestContainer").innerHTML = ""

            //dodawanie opcji 
            let i = 0
            while(i!=this.itemArray.length){

                
                document.getElementById("suggestContainer").style.left = document.getElementById("listItemInput").getBoundingClientRect().x+"px";
                document.getElementById("suggestContainer").style.width = document.getElementById("listItemInput").getBoundingClientRect().width

                if(document.documentElement.clientWidth >= 800){
                    document.getElementById("suggestContainer").style.top = document.getElementById("listItemInput").getBoundingClientRect().y+document.getElementById("listItemInput").getBoundingClientRect().height+"px";
                }

                //spraw aby na tel suggestbox sie wyswietlal nad inputem
                if(document.documentElement.clientWidth < 800){
                    document.getElementById("suggestContainer").style.top = document.getElementById("listItemInput").getBoundingClientRect().top+window.scrollY-document.getElementById("suggestContainer").getBoundingClientRect().height+"px";
                }

                if(this.itemArray[i].includes(this.listItemInputValue)==true){
                    document.getElementById("suggestContainer").style.display = "block"
                    var suggestOption = document.createElement("div")
                    suggestOption.className = "suggestOption"
                    suggestOption.textContent = this.itemArray[i]
                    suggestOption.onclick = (val = suggestOption.textContent)=>{
                        console.log(val)
                        this.listItemInputValue = val.srcElement.innerText
                    }
                    document.getElementById("suggestContainer").appendChild(suggestOption)
                }
                if(this.listItemInputValue==""){
                    document.getElementById("suggestContainer").style.display = "none"
                }

                
                i++
            }
        },

        //sprawdzanie czy itemArray zawiera wszystkie itemki
        async checkAutoSuggestion(){

            //pobieranie danych z firebase wykonuje sie tylko gdy itemArray jest pusty
            if(this.itemArray.length > 0){
                return
            }

            //aktualna liczba itemkow w bazie
            const counterValue = await getDoc(doc(db, "itemsmeta", "itemcounter"))
            .catch(()=>{console.log("get itemcounter sperdolil")})

  

            //pobierz array itemkow z bazy
            const itemArrayBase = await getDoc(doc(db, "itemsmeta", "itemarray"))
            .catch(()=>{console.log("get itemarray sperdolil")})


            //check czy counter itemkow sie zgadza z dlugoscia arraay itemklow
            if(counterValue.data().counter!=itemArrayBase.data().array.length){
                
                //czyszczenie lokalnego arraya
                this.itemArray=[]

                //pobieranie wszystkich itemkow
                const q = query(collection(db,"items"), where("category", "!=" ,"hhhhhhh"))

                const allItems = await getDocs(q)


                //wrzucanie wszystkicj itemkow do arrata
                allItems.forEach((data)=>{
                    updateDoc(doc(db, "itemsmeta", "itemarray"),{
                        array: arrayUnion(data.id)
                    })
                    this.itemArray.push(data.id)
                })

                if(this.itemArray.length!=counterValue.data().counter){
                    return
                }
                if(this.itemArray.length==counterValue.data().counter){
                    this.itemArray = itemArrayBase.data().array
                }

            }
            if(counterValue.data().counter==itemArrayBase.data().array.length){
                this.itemArray = itemArrayBase.data().array
            }
            
        }

    }
    
}



</script>