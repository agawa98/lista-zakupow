
<template>
  <div id="add-item-container">
    <listItemForm />
    <addItemForm />
    
    
  </div>
  <div id="view-shopping-list-container">
    <displayList />
  </div>
  
</template>

<script>



/* eslint-disable */

import addItemForm from "./components/addItemForm.vue"
import displayList from "./components/displayList.vue"
import listItemForm from "./components/listItemForm.vue"




export default {
  mounted(){
    
  },
  data(){
    return{

    }
  },
  components: {
    addItemForm,
    displayList,
    listItemForm,
  },
  methods:{
  
  }
}
</script>



<style>
@import url('https://fonts.googleapis.com/css2?family=Alata&display=swap');

*{
  overflow: hidden;
  font-family: 'Alata', sans-serif;
  box-sizing: border-box;
  margin:0;
  padding:0;
}
#add-item-container{
  width:50vw;
  height: 100vh;
  float:left;

  padding:2vw;
  text-align: left;

  border-right:2px solid rgb(96, 0, 109);
  background-color: rgba(137, 43, 226, 0.473);
  background-image: linear-gradient(rgba(0, 0, 0, 0.068), rgba(0, 0, 0, 0.562));
}
.leftForm, #listFilter, #listSort{
  font-size: 1.5vw;
  background-color: rgba(0, 0, 0, 0.151);
  border:2px solid rgb(96, 0, 109);
  border-radius: 1vw;
  padding:1vw;
  line-height: 2.5vw;
}
.leftForm input, select{
  font-size:1.4vw;
  border-radius: .5vw;
}
.leftForm button, #listFilter button{
  font-size: inherit;
  float:right;
  padding:.3vw;
  border-radius: .5vw;
}
.leftForm button:active, #listFilter button:active{
  background-image: linear-gradient(rgba(0, 0, 0, 0.048), rgba(0, 0, 0, 0.493));
}
#addItem{
  margin-top: 2.2vw;
}




#view-shopping-list-container{
  width:50vw;
  height:100vh;
  float:right;

  padding:2vw;
  text-align: center;

  border-left:2px solid rgb(96, 0, 109);
  background-color: rgba(137, 43, 226, 0.473);
  background-image: linear-gradient(rgba(0, 0, 0, 0.068), rgba(0, 0, 0, 0.562));
}
#listContainer{
  width:50%;
  height: 90%;
  float: right;
  display:flex;
  flex-direction: column;

  background-color: wheat;
  border-radius: .8vw;

  overflow-y: scroll;
  border: 3px solid black;

/* niewidocznosc scrollbara */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}
#deleteCheckedButton{
  background-color: rgba(182, 0, 0, 0.623);
  border: 2px solid black;
  border-radius: .5vw;

  padding:1vh;

  float: left;

  margin-top: 3vh;
  margin-bottom: 3vh;


}
#listContainer::-webkit-scrollbar{
  display: none;
}
.listItemText{
  border-bottom: 2px solid black;
  font-size: 1.6vw;
  padding:.5vw;
  text-align: left;
  width:85%;
  float:left;
}
.listItemCheck{
  width:15%;
  height: 100%;
  float:right;
  background-color: rgb(139, 0, 0);
  border-left:3px solid black;
  border-bottom:3px solid black;
}
.listItemCheckbox{
  position:relative;
  top:20%;
  height: 60%;
  width: 60%;
}
.listItemWarning{
  color:rgb(190, 0, 0);
  text-align: center;
}
#filtrujLabel{
  margin: 0 auto;
}
.filterBox{
  width:45%;
  float:left;
  text-align: left;
}
#sortBox{
  margin-top:2.2vw;
}
.labelLine{
  border: 1px solid rgba(0, 0, 0, 0.466);
}
hr{
  margin:.5vw;
}



#suggestContainer{
  position: absolute;
  display: none;
  width: 15vw;
  height: 40vh;
  overflow-y: scroll;
  
  background-color:wheat;
  border: 2px solid black;

  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}
#suggestContainer::-webkit-scrollbar{
  display: none;
}
.suggestOption{
  border-bottom: 1px solid black;
  padding: .2vw;
}


@media(max-width:800px){
*{
  overflow-y:scroll;
}
#app{
  display: flex;
  flex-direction: column;

}
#view-shopping-list-container, #add-item-container{
  width:100%;
  height: unset;
  float:left;
  background-color: rgba(84, 13, 150, 0.541);
  background-image: unset;
  display:flex;
  flex-direction: column;
  border: unset;
}
#view-shopping-list-container{
  order:1;
}
#add-item-container{
  order:2;
}
.leftForm, #listFilter, #listSort{
  font-size: 5vw;
  background-color: rgba(0, 0, 0, 0.151);
  border:2px solid rgb(96, 0, 109);
  border-radius: 1vw;
  padding:1vw;
  line-height: 8vw;
}
.leftForm input, select{
  font-size:4vw;
  border-radius: .5vw;
}
.leftForm button, #listFilter button{
  font-size: inherit;
  float:right;
  padding:.3vw;
  border-radius: .5vw;
}
#listItemInput{
  width:40vw;
}
#suggestContainer{
  width: 50vw;
}

.filterBox{
  order:1;
  width:100%;
  margin-bottom: 2.2vw;
}
#listContainer{
  order:2;
  height:80vh;
  width:100%;
  
}
#deleteCheckedButton{
  order:3;
}
.listItemText{
  font-size: 5vw;
  padding: 2vw;
}

#listItem{
  order:1;
}
#addItem{
  order:2;
}

}

</style>





