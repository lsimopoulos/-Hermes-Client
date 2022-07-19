 <template>
  <div class="container">
    <div class="div-table">
      <div class="div-table-caption">
        Contacts
      </div>
     <div v-for="contact in contacts"
          :key="contact">
      <ContactComponent 
        :class="contact.id === selectedGuid  ? 'highlight-row' : 'table-row'"
        :name="contact.name"
        :hasNewMessages="contact.hasNewMessages"
        :email="contact.email"
        @click="selectContact(contact)" >
      </ContactComponent> 
     </div>
    </div>
  </div>
</template>
<script>
 import ContactComponent from './ContactComponent.vue'
 export default {
   name: 'ContactsListComponent',
   props:{
     contacts:{
          type:  Array
      }
   },
   components:{
    ContactComponent
   },
    data () {
    return {
      selectedGuid: null,
    }},
   methods:{
    selectContact(contact)
    {
      if( this.selectedGuid!=contact.id)
      {
        this.selectedGuid = contact.id;
         var cnt = this.contacts.find((item)=>item.id=== contact.id)
           if(cnt != null)
              cnt.hasNewMessages = false;
        this.$store.commit("user/setSelectedContact",{ contact: contact});
      }
      
    }
  
   }
 }
</script>
<style scoped>
.div-table {
  width: 100%;
  display: table;
}
.div-table-caption{
  display: table-caption;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
.table-row {
  cursor: pointer;
}
.highlight-row {
  background-color: #ddd;
  cursor: pointer;
}
</style>