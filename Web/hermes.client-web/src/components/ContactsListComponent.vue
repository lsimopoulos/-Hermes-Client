 <template>
  <div>
    <div class="div-table">
      <div class="div-table-caption">
        <font-awesome-icon icon="address-book" />
        Contacts
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#addContactModal"
        >
          <font-awesome-icon icon="plus" />
          Add
        </button>
      </div>
      <div v-for="contact in contacts" :key="contact">
        <ContactComponent
          :class="contact.id === selectedGuid ? 'highlight-row' : 'table-row'"
          :name="contact.name"
          :hasNewMessages="contact.hasNewMessages"
          :email="contact.email"
          :numberOfUnreadMessages="contact.numberOfUnreadMessages"
          @click="selectContact(contact)"
        >
        </ContactComponent>
      </div>

      <!-- Modal -->
      <div
        class="modal fade"
        id="addContactModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addContactModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addContactModalLabel">
                Add a contact
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <label
                >Enter the email address of the contact you want to add</label
              >
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Email"
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                id="close"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="addContact">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
 import ContactComponent from './ContactComponent.vue'
 export default {
   name: 'ContactsListComponent',
   inject: ['$chatService'],
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
      email: "",
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
           {
            cnt.hasNewMessages = false;
            cnt.numberOfUnreadMessages = 0;

           }
              
        this.$store.commit("user/setSelectedContact",{ contact: contact});
      }
    },
     addContact(){
        if (this.email != "" ) {
          this.$chatService.addContact(this.email)
            .then(response => {
              this.$store.commit("chat/initiateChat", { contactId: response.id });
          this.email = "";
        })
        document.getElementById('close').click();
       }
   },

  
   }
 }
</script>
<style scoped>
.div-table {
  width: 100%;
  display: table;
}
.div-table-caption {
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