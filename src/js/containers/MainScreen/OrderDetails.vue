<template>
  <div>
    <h4 class="font-bold text-xs uppercase mb-4">Order details</h4>
    <Notification title="Missing some required fields" :messages="errorMessages" v-if="errorMessages.length" />
    <div class="mt-4">
      <div>
        <InputDate v-model="selectedOrderDate" label="Order Date" />
      </div>
      <div class="mt-4">
        <InputSelect :options="clients" v-model="selectedClient" label="Client" />
      </div>
      <div class="mt-4">
        <InputSelect :options="contacts" v-model="selectedContact" label="Contact" />
      </div>
      <div class="flex justify-end items-center mt-4">
        <span class="mr-auto uppercase font-bold" v-bind:class="{ 'text-green-600': status === 'saved', 'text-red-600': status !== 'saved' }">Status: {{status}}</span>
        <Button :onClick="handleSave">Save</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapGetters, mapActions, mapMutations } from 'vuex'

// Components
import InputDate from '@/components/InputDate.vue'
import InputSelect from '@/components/InputSelect.vue'
import Button from '@/components/Button.vue'
import Notification from '@/components/Notification.vue'

// Veux
import { storeName as orderStoreName, types as orderTypes } from '@/store/modules/order'
import { storeName as clientsStoreName, types as clientTypes, Client } from '@/store/modules/clients'
import { storeName as contactsStoreName, types as contactTypes, Contact } from '@/store/modules/contacts'

// Types
type Status = 'unsaved' | 'saved'

@Component({
  components: {
    InputDate,
    InputSelect,
    Button,
    Notification
  },

  computed: {
    ...mapGetters(clientsStoreName, {
      clients: clientTypes.getters.ALL_CLIENTS
    }),
    ...mapGetters(contactsStoreName, {
      contacts: contactTypes.getters.ALL_CONTACTS
    }),
    ...mapGetters(orderStoreName, {
      savedStatus: orderTypes.getters.GET_SAVED_STATUS
    })
  },

  methods: {
    ...mapActions(clientsStoreName, {
      fetchClients: clientTypes.actions.GET_CLIENTS
    }),
    ...mapActions(contactsStoreName, {
      fetchContacts: contactTypes.actions.GET_CONTACTS
    }),
    ...mapMutations(orderStoreName, {
      setClientId: orderTypes.mutations.SET_CLIENT,
      setContactId: orderTypes.mutations.SET_CONTACT,
      setOrderDate: orderTypes.mutations.SET_ORDER_DATE,
      setOrderDetailsSaved: orderTypes.mutations.SET_ORDERDETAILS_SAVE
    })
  }
})
export default class Wrapper extends Vue {
  private clients!: Client[]
  private contacts!: Contact[]
  private selectedOrderDate: string = new Date().toISOString().substr(0, 10)
  private selectedClient: null | number = null
  private selectedContact: null | number = null
  private errorMessages: string[] = []
  private status: Status = 'unsaved'
  private savedStatus!: { seller: boolean; order: boolean }

  private fetchClients!: () => Promise<void>
  private fetchContacts!: (id: number) => Promise<void>
  private setClientId!: (id: number) => void
  private setContactId!: (id: number) => void
  private setOrderDate!: (date: string) => void
  private setOrderDetailsSaved!: (saved: boolean) => void

  async mounted() {
    await this.fetchClients()
    this.$parent.$on('save-all', this.handleSave)
  }

  handleSave() {
    this.errorMessages = []

    this.selectedOrderDate
      ? this.setOrderDate(this.selectedOrderDate)
      : this.errorMessages = this.errorMessages.concat('Please select a order date')

    this.selectedClient
      ? this.setClientId(Number(this.selectedClient))
      : this.errorMessages = this.errorMessages.concat('Please select a Client')

    this.selectedContact
      ? this.setContactId(Number(this.selectedContact))
      : this.errorMessages = this.errorMessages.concat('Please select a Contact')

    if (this.errorMessages.length === 0) {
      this.status = 'saved'
      this.setOrderDetailsSaved(true)
    } else {
      this.$emit('savingFailed')
    }
  }

  resetStatus() {
    this.errorMessages = []
    this.status = 'unsaved'
    if (!this.savedStatus.order) {
      this.setOrderDetailsSaved(false)
    }
  }

  @Watch('selectedClient')
  onClientChanged() {
    if (!this.selectedClient) return
    this.fetchContacts(this.selectedClient)
    this.resetStatus()
  }

  @Watch('selectedContact')
  onContactChanged() {
    this.resetStatus()
  }

  @Watch('selectedOrderDate')
  onDateChanged() {
    this.resetStatus()
  }

  @Watch('savedStatus', { deep: true })
  onStatusChange() {
    this.status = this.savedStatus.order ? 'saved' : 'unsaved'
  }
}
</script>
