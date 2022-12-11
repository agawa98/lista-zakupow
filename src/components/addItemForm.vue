<template>
    <form id="addItem" class="leftForm">
        <label>dodaj do bazy produktów</label><hr class="labelLine">
        <label>nazwa produktu: </label><input v-model="name"><br>
        <label>kategoria produktu: </label>
        <select v-model="category">
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
        <label>Preferowany sklep: </label>
        <select v-model="preferredShop">
          <option value="auchan">Auchan</option>
          <option value="bazarek">bazarek</option>
          <option value="leclerc">Leclerc</option>
          <option value="putka">Putka</option>
          <option value="kazdy">każdy</option>
        </select>
        <button @click="addItem" type="button"><pre> dodaj </pre></button>
    </form>
</template>
<script>
/* eslint-disable */

//firebase setup
import { advancePositionWithMutation } from "@vue/compiler-core";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

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
  data() {
    return {
      name:"",
      category:"",
      preferredShop:"",
      onList:false,
    }
  },
  methods:{
    //add item to items collection
    async addItem(){
      if(this.category=="" || this.preferredShop=="" || this.name ==""){
        alert("któreś pole jest puste")
        return
      }

       //counter ilosci dokumentow
      var counterValue = await getDoc(doc(db,"itemsmeta","itemcounter"))
      if(counterValue.exists()){
        this.counter = counterValue.data().counter + 1
      }

      await setDoc(doc(db, "items", this.name), {
        category: this.category,
        preferredShop: this.preferredShop,
        onList:false,
        pilne: false
      })

      //dodaj itemek do itemarray
      updateDoc(doc(db, "itemsmeta", "itemarray"),{
        array: arrayUnion(this.name)
      })
      .then(()=>{
        alert("pomyślnie dodano "+this.name)
        document.getElementById("addItem").reset()
        //kurwa probowalem zrobic to inaczej ale pol dnia na tym spedzilem i uznalem ze nie jest to warte ani moich nerwow ani mojego czasu
      })
      .catch(()=>{alert("nie udało się dodać "+this.name)})
      await setDoc(doc(db, "itemsmeta", "itemcounter"), {
        counter: this.counter
      })
      .catch(()=>{console.log("counter nie dziala")})
    }
  }
}

</script>