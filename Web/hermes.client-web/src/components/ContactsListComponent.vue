 <template>
  <div class="div-table">
    <div class="div-table-caption">
      <font-awesome-icon icon="address-book" />
      Contacts
      <button
        type="button"
        class="w-10 h-10 bg-blue-700 hover:bg-blue-700 text-white font-bold  rounded transition duration-150 ease-in-out"
        data-toggle="modal" data-target="#addContactModal"
      >
      
        <font-awesome-icon class="w-7 h-7" icon="user-plus" />
      </button>
      
      <button
        type="button" 
        class="w-10 h-10 bg-green-700 hover:bg-green-700 text-white font-bold  rounded"
        data-toggle="modal"
        data-target="#addGroupModal"
        data-bs-toggle="modal" data-bs-target="#addGroupModal"
      >
        <font-awesome-icon class="w-7 h-7" icon="user-group" />
      </button>
    </div>
    <div v-for="contact in contacts" :key="contact" >
      <ContactComponent
        :class="contact.id === selectedGuid ? 'highlight-row' : 'table-row'"
        :name="contact.name"
        :hasNewMessages="contact.hasNewMessages"
        :email="contact.email"
        :isgroup= "contact.isGroup"
        :numberOfUnreadMessages="contact.numberOfUnreadMessages"
        :isonline="contact.isonline"
        @click="selectContact(contact)"
      >
      </ContactComponent>
    </div>

<!-- Modal -->
<div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
  id="addContactModal" tabindex="-1" aria-labelledby="addContactModal" aria-hidden="true">
  <div class="modal-dialog relative w-auto pointer-events-none">
    <div
      class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div
        class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800" id="addContactModalLabel">Add a contact</h5>
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body relative p-4">
         <label
              >Enter the email address of the contact you want to add</label
            >
            <input
              v-model="email"
              type="email"
              class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
              placeholder="Email"
            />
      </div>
      <div
        class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <button type="button" class="px-6
          py-2.5
          bg-purple-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out" data-dismiss="modal">Close</button>
        <button type="button" class="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      ml-1" @click="addContact">Add</button>
      </div>
    </div>
  </div>
</div>
    <div
      class="modal fade"
      id="addGroupModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addGroupModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="aaddGroupModalLabel">Create a group</h5>
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
             <input
              v-model="nameofgroup"
              type="text"
              class="form-control"
              placeholder="Name of group"
            />
            <Multiselect
              v-model="value"
              mode="tags"
              valueProp="id"
              :close-on-select="false"
              placeholder="Add members"
              label="name"
              :searchable="true"
              :createTag="false"
              :options="groupContacts"
            >
            <template v-slot:tag="{ option, handleTagRemove, disabled }">
      <div
        class="multiselect-tag is-user"
        :class="{
          'is-disabled': disabled
        }"
       >
        <img :src="option.image">
        {{ option.name }}
        <span
           v-if="!disabled"
           class="multiselect-tag-remove"
           @mousedown.prevent="handleTagRemove(option, $event)"
        >
          <span class="multiselect-tag-remove-icon"></span>
        </span>
      </div>
    </template>
            </Multiselect>
          </div>
          <div class="modal-footer">
            <button
              type="button"
             class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-gray-600 text-white hover:bg-gray-600"
              data-dismiss="modal"
              id="groupclose"
            >
              Close
            </button>
            <button type="button" class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600" @click="addGroup">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ContactComponent from "./ContactComponent.vue";
import Multiselect from "@vueform/multiselect";
export default {
  name: "ContactsListComponent",
  inject: ["$chatService"],
  props: {
    contacts: {
      type: Array,
    },
  },
   computed: {
    groupContacts() {
      const filteredContacts = this.contacts.filter(contact => !contact.isgroup);
      return filteredContacts.slice(1, filteredContacts.length - 1);
    }
   },
  components: {
    ContactComponent,
    Multiselect,
  },
  data() {
    return {
      email: "",
      selectedGuid: null,
      value: [],
      nameofgroup: ""
    };
  },
  methods: {
    selectContact(contact) {
      if (this.selectedGuid != contact.id) {
        this.selectedGuid = contact.id;
        let cnt = this.contacts.find((item) => item.id === contact.id);
        if (cnt) {
          cnt.hasNewMessages = false;
          // cnt.numberOfUnreadMessages = 0;
        }

        this.$store.commit("user/setSelectedContact", { contact: contact });
      }
    },
    addContact() {
      if (this.email != "") {
        this.$chatService.addContact(this.email).then((response) => {
          this.$store.commit("chat/initiateChat", { contactId: response.id });
          this.email = "";
        });
        document.getElementById("close").click();
      }
    },
     addGroup() {
      if (this.nameofgroup != "" && this.value.length > 0) {
        this.value.push(this.contacts[0].id)
        this.$chatService.addGroup(this.nameofgroup,this.value).then((response) => {
          this.$store.commit("chat/initiateChat", { contactId: response.id });
          this.nameofgroup = "";
          this.value = [];
        });
         document.getElementById("groupclose").click();
      }
    },
  },
};
</script>
<style scoped>
.div-table {
  height: 90vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.div-table-caption {
  display: table-caption;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
.table-row {
  display: flex;
}
.highlight-row {
  background-color: #ddd;
}
</style>
<style src="@vueform/multiselect/themes/default.css"></style>