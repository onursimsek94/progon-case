<template>
  <div class="page-frame orders-view">
    <div>
      <div class="page-title">{{$t('orders.label.orders')}}</div>

      <div class="customer-info">
        <div>
          <label class="pn-label">{{$t('customers.label.company_name')}}: </label>
          <span>{{getSelectedCustomer.companyName || '-'}}</span>
        </div>

        <div>
          <label class="pn-label">{{$t('customers.label.contact_name')}}: </label>
          <span>{{getSelectedCustomer.contactName || '-'}}</span>
        </div>
      </div>

      <el-table
        border
        :data="getOrderData"
      >
        <el-table-column
          min-width="150"
          :label="$t('orders.label.ship_name')"
        >
          <template slot-scope="{row}">
            <el-popover
              popper-class="list-popover"
              placement="top-start"
              width="auto"
              trigger="hover"
            >
              <div class="content-dots" slot="reference">{{row.shipName}}</div>
              <span>{{row.shipName}}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          prop="shipCountry"
          :label="$t('orders.label.ship_country')"
        >
        </el-table-column>
        <el-table-column
          min-width="150"
          prop="shipCity"
          :label="$t('orders.label.ship_city')"
        >
        </el-table-column>
        <el-table-column
          min-width="150"
          prop="shipPostalCode"
          :label="$t('orders.label.ship_postal_code')"
        >
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="$t('orders.label.ship_address')"
        >
          <template slot-scope="{row}">
            <el-popover
              popper-class="list-popover"
              placement="top-start"
              width="auto"
              trigger="hover"
            >
              <div class="content-dots" slot="reference">{{row.shipAddress}}</div>
              <span>{{row.shipAddress}}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          prop="freight"
          :label="$t('orders.label.freight')"
        >
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="$t('orders.label.order_date')"
        >
          <template slot-scope="{row}">
            {{row.orderDate | readableDate}}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="$t('orders.label.required_date')"
        >
          <template slot-scope="{row}">
            {{row.requiredDate | readableDate}}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="$t('orders.label.shipped_date')"
        >
          <template slot-scope="{row}">
            {{row.shippedDate | readableDate}}
          </template>
        </el-table-column>
      </el-table>

      <div class="view-actions">
        <el-button
          class="pn-button"
          type="info"
          @click="handleBackButtonClick"
        >
          {{$t('orders.button.back')}}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { format } from 'date-fns'

  export default {
    name: 'Orders',
    props: {
      customerId: { required: true },
    },
    filters: {
      readableDate (date) {
        if (date) {
          return format(date, 'PP')
        }
        return ''
      },
    },
    created () {
      this.getOrders()
    },
    methods: {
      handleBackButtonClick () {
        this.$router.push('/')
      },
      ...mapActions(['getOrders']),
    },
    computed: {
      getOrderData () {
        return this.getOrdersByCustomerId(this.customerId)
      },
      ...mapGetters([
        'getOrdersByCustomerId',
        'getSelectedCustomer',
      ]),
    },
  }
</script>

<style lang="scss" src="./Orders.scss"></style>
