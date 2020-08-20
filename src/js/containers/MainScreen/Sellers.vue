<template>
  <div class="flex flex-col">
    <div>
      <h4 class="font-bold text-xs uppercase mb-4">Sellers</h4>
      <Notification title="Missing some required fields" :messages="errorMessages" v-if="errorMessages.length" />
      <ul class="mt-4">
        <li v-for="(seller, key) in sellers" :key="key" class="flex border-solid border-2 border-gray-600 rounded p-4 mb-4">
          <div class="w-1/2 mr-2">
            <InputSelect
              :options="employees"
              label="Seller"
              v-bind:value="sellers[key].id"
              v-on:input="onChangeSeller($event, key)"
              />
          </div>
          <div class="w-1/2 ml-2">
            <InputNumber
              label="Percentage"
              placeholder="A number between 0.01 and 100"
              v-model="sellers[key].percentage"
              v-on:blur="onBlurPercentage($event, key)"
              />
          </div>
        </li>
      </ul>
    </div>
    <div class="flex justify-end mt-4 mt-auto">
      <span class="mr-auto uppercase font-bold" v-bind:class="{ 'text-green-600': status === 'saved', 'text-red-600': status !== 'saved' }">Status: {{status}}</span>
      <Button :onClick="addSeller">Add seller</Button>
      <div class="ml-2">
        <Button :onClick="saveSellers">Save seller(s)</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapGetters, mapActions, mapMutations } from 'vuex'

// Components
import Button from '@/components/Button.vue'
import InputSelect from '@/components/InputSelect.vue'
import InputNumber from '@/components/InputNumber.vue'
import Notification from '@/components/Notification.vue'

// Veux
import { storeName as employeeStoreName, types as employeeTypes, Employee } from '@/store/modules/employees'
import { storeName as orderStoreName, types as orderTypes, Seller } from '@/store/modules/order'

// Types
type Status = 'unsaved' | 'saved'

@Component({
  components: {
    Button,
    InputSelect,
    InputNumber,
    Notification
  },

  computed: {
    ...mapGetters(employeeStoreName, {
      employees: employeeTypes.getters.ALL_EMPLOYEES
    }),
    ...mapGetters(orderStoreName, {
      savedStatus: orderTypes.getters.GET_SAVED_STATUS
    })
  },

  methods: {
    ...mapActions(employeeStoreName, {
      fetchEmployees: employeeTypes.actions.GET_EMPLOYEES
    }),
    ...mapMutations(orderStoreName, {
      setSellers: orderTypes.mutations.SET_SELLERS,
      setSellerDetailsSaved: orderTypes.mutations.SET_SELLERDETAILS_SAVE
    })
  }
})
export default class Sellers extends Vue {
  private sellers: Seller[] = []
  private employees!: Employee[]
  private errorMessages: string[] = []
  private status: Status = 'unsaved'
  private savedStatus!: { seller: boolean; order: boolean }

  private fetchEmployees!: () => Promise<void>
  private setSellers!: (sellers: Seller[]) => void
  private setSellerDetailsSaved!: (saved: boolean) => void

  async mounted() {
    await this.fetchEmployees()
    this.$parent.$on('save-all', this.saveSellers)
  }

  addSeller() {
    const emptySeller: Seller = {
      id: null,
      percentage: null
    }

    this.sellers = this.sellers.concat([emptySeller])
  }

  onChangeSeller(id: number, index: number) {
    this.sellers[index].id = id
  }

  onBlurPercentage(percentage: number, index: number) {
    if (!percentage) return
    switch (true) {
      case percentage > 100:
        percentage = Number(100)
        break
      case percentage < 0.01:
        percentage = Number(0.01)
        break
      default:
        percentage = Number(percentage)
    }

    this.sellers[index].percentage = percentage
  }

  saveSellers() {
    this.errorMessages = []

    if (this.sellers.length === 0) {
      this.errorMessages = this.errorMessages.concat('No Sellers added')
    }

    if (this.sellers.filter(seller => seller.id === null).length > 0) {
      this.errorMessages = this.errorMessages.concat('Sellers name is mandentory for every seller')
    }

    if (this.errorMessages.length === 0) {
      this.setSellers(this.sellers)
      this.status = 'saved'
      this.setSellerDetailsSaved(true)
    } else {
      this.$emit('savingFailed')
    }
  }

  @Watch('sellers', { deep: true })
  onChangeSellers() {
    this.errorMessages = []
    this.status = 'unsaved'
    if (this.savedStatus.seller) {
      this.setSellerDetailsSaved(false)
    }
  }

  @Watch('savedStatus', { deep: true })
  onStatusChange() {
    this.status = this.savedStatus.seller ? 'saved' : 'unsaved'
  }
}
</script>
