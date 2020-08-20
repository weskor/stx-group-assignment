<template>
  <div>
    <div class="mb-4" v-if="errorMessages.length">
      <Notification title="Can't finalize" :messages="errorMessages" />
    </div>
    <div class="mb-4" v-if="saved || error">
      <Notification
        :title="error ? error : 'Saved order successfully'"
        :notificationType="error ? 'error' : 'success'" />
    </div>
    <div class="flex">
      <section class="w-1/2 bg-white mr-2 p-4 rounded">
        <OrderDetails @savingFailed="savingFailed" />
      </section>
      <section class="w-1/2 bg-white ml-2 p-4 rounded">
        <Sellers  @savingFailed="savingFailed" />
      </section>
    </div>
    <div class="flex justify-end mt-4">
      <div class="mr-2">
        <Button :onClick="handleSaveFinalize">Save and Finalize</Button>
      </div>
      <Button :onClick="handleFinalize">Finalize</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapGetters, mapActions, mapMutations } from 'vuex'

// Components
import Button from '@/components/Button.vue'
import Notification from '@/components/Notification.vue'

// Containers
import OrderDetails from '@/containers/MainScreen/OrderDetails.vue'
import Sellers from '@/containers/MainScreen/Sellers.vue'

// Veux
import { storeName as orderStoreName, types as orderTypes, Seller } from '@/store/modules/order'

// Constants
const TOTAL_PERCENTAGE = 100

@Component({
  components: {
    Button,
    Notification,
    OrderDetails,
    Sellers
  },

  computed: {
    ...mapGetters(orderStoreName, {
      sellersTotal: orderTypes.getters.GET_SELLERS_TOTAL_PER,
      sellers: orderTypes.getters.GET_SELLERS,
      status: orderTypes.getters.GET_SAVED_STATUS,
      saved: orderTypes.getters.GET_ORDER_SAVED,
      error: orderTypes.getters.GET_ERROR
    })
  },

  methods: {
    ...mapActions(orderStoreName, {
      postOrder: orderTypes.actions.POST_ORDER
    }),
    ...mapMutations(orderStoreName, {
      setError: orderTypes.mutations.SET_ERRROR,
      setSaved: orderTypes.mutations.SET_SAVED,
      setOrderDetailsSaved: orderTypes.mutations.SET_ORDERDETAILS_SAVE,
      setSellerDetailsSaved: orderTypes.mutations.SET_SELLERDETAILS_SAVE
    })
  }
})
export default class Wrapper extends Vue {
  private errorMessages: string[] = []
  private sellers!: Seller[]
  private sellersTotal!: number
  private status!: { seller: boolean; order: boolean }
  private saved!: boolean
  private error!: string | null
  private startSaveAndFinalize!: boolean

  private postOrder!: () => Promise<void>
  private setError!: (error: string | null) => void
  private setSaved!: (saved: boolean) => void
  private setOrderDetailsSaved!: (saved: boolean) => void
  private setSellerDetailsSaved!: (saved: boolean) => void

  handleFinalize() {
    const { sellersTotal, status } = this
    const difference = TOTAL_PERCENTAGE - sellersTotal

    if (!status.seller || !status.order) {
      this.errorMessages = ['Make sure to save the order details and the seller details']
      return
    }

    if (difference > 0 || difference < 0) {
      this.errorMessages = [`Sellers total percentage should be total 100, currently is ${sellersTotal}`]
      return
    }

    if (this.errorMessages.length === 0) {
      this.postOrder()
    }
  }

  handleSaveFinalize() {
    this.setError(null)
    this.setOrderDetailsSaved(false)
    this.setSellerDetailsSaved(false)

    this.$emit('save-all')
    this.startSaveAndFinalize = true
  }

  savingFailed() {
    this.startSaveAndFinalize = false
  }

  @Watch('status', { deep: true })
  onStatusChange() {
    this.errorMessages = []
    if (this.startSaveAndFinalize && this.status.seller && this.status.order) {
      this.handleFinalize()
      this.startSaveAndFinalize = false
    }
  }

  @Watch('error')
  onErrorChange() {
    this.errorMessages = []

    if (this.error && this.startSaveAndFinalize) {
      this.startSaveAndFinalize = false
      this.setOrderDetailsSaved(false)
      this.setSellerDetailsSaved(false)
    }

    if (this.error) {
      this.setSaved(false)
    }
  }

  @Watch('saved')
  onSaveChange() {
    if (this.saved) {
      this.setError(null)
    }

    if (this.startSaveAndFinalize) {
      this.setOrderDetailsSaved(this.saved)
      this.setSellerDetailsSaved(this.saved)
    }
  }
}
</script>

<style scoped></style>
