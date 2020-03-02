<template>
  <div class="page-frame customers-view">
    <div>
      <div class="page-title">{{$t('customers.label.customers')}}</div>

      <customer-filter @setFilter="setFilter"></customer-filter>

      <el-table
        border
        height="500"
        :data="getActivePageFilteredCustomerData"
      >
        <el-table-column
          min-width="210"
          :label="$t('customers.label.company_name')"
        >
          <template slot-scope="{row}">
            <el-popover
              popper-class="list-popover"
              placement="top-start"
              width="auto"
              trigger="hover"
            >
              <div class="content-dots" slot="reference">{{row.companyName}}</div>
              <span>{{row.companyName}}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          min-width="180"
          prop="contactName"
          :label="$t('customers.label.contact_name')"
        >
        </el-table-column>
        <el-table-column
          min-width="180"
          :label="$t('customers.label.contact_title')"
        >
          <template slot-scope="{row}">
            <el-popover
              popper-class="list-popover"
              placement="top-start"
              width="auto"
              trigger="hover"
            >
              <div class="content-dots" slot="reference">{{row.contactTitle}}</div>
              <span>{{row.contactTitle}}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          min-width="110"
          prop="country"
          :label="$t('customers.label.country')"
        >
        </el-table-column>
        <el-table-column
          min-width="120"
          prop="city"
          :label="$t('customers.label.city')"
        >
        </el-table-column>
        <el-table-column
          min-width="110"
          prop="postalCode"
          :label="$t('customers.label.postal_code')"
        >
        </el-table-column>
        <el-table-column
          min-width="210"
          :label="$t('customers.label.address')"
        >
          <template slot-scope="{row}">
            <el-popover
              popper-class="list-popover"
              placement="top-start"
              width="auto"
              trigger="hover"
            >
              <div class="content-dots" slot="reference">{{row.address}}</div>
              <span>{{row.address}}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          min-width="130"
          prop="phone"
          :label="$t('customers.label.phone')"
        >
        </el-table-column>
        <el-table-column
          min-width="130"
          prop="fax"
          :label="$t('customers.label.fax')"
        >
        </el-table-column>
        <el-table-column>
          <template slot-scope="{row}">
            <el-button
              class="customer-detail-btn"
              type="primary"
              icon="el-icon-search"
              @click="handleDetailClick(row)"
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        :page-sizes="[10, 20, 50]"
        :page-size.sync="paginationSize"
        :current-page.sync="paginationPage"
        :total="filteredCustomersData.length"
        layout="prev, pager, next, sizes, total"
        @size-change="filterCustomerData"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import CustomerFilter from '@/components/CustomerFilter'

  export default {
    name: 'Customers',
    components: { CustomerFilter },
    data () {
      return {
        filter: {
          companyName: '',
          contactName: '',
          country: null,
          city: null,
        },
        filteredCustomersData: [],
        paginationSize: 10,
        paginationPage: 1,
      }
    },
    created () {
      this.getCustomersData()
    },
    methods: {
      async getCustomersData () {
        await this.getCustomers()
        this.filterCustomerData()
      },
      setFilter (filterValues) {
        this.filter = { ...this.filter, ...filterValues }
        this.filterCustomerData()
      },
      filterCustomerData () {
        const { companyName, contactName, country, city } = this.filter
        let data = this.customersData

        this.paginationPage = 1

        if (companyName.trim().length) {
          data = data
            .filter(item => item.companyName.toLowerCase().includes(companyName.toLowerCase()))
        }

        if (contactName.trim().length) {
          data = data
            .filter(item => item.contactName.toLowerCase().includes(contactName.toLowerCase()))
        }

        if (country) {
          data = data.filter(item => item.country === country)
        }

        if (city) {
          data = data.filter(item => item.city === city)
        }

        this.filteredCustomersData = data
      },
      handleDetailClick (customer) {
        this.setSelectedCustomer({
          companyName: customer.companyName,
          contactName: customer.contactName,
        })
        this.$router.push({
          name: 'Orders',
          params: { customerId: customer.id },
        })
      },
      ...mapActions([
        'getCustomers',
        'setSelectedCustomer',
      ]),
    },
    computed: {
      getActivePageFilteredCustomerData () {
        const { filteredCustomersData, paginationSize, paginationPage } = this
        return filteredCustomersData
          .slice((paginationPage - 1) * paginationSize, paginationSize * paginationPage)
      },
      ...mapGetters(['customersData']),
    },
  }
</script>

<style lang="scss" src="./Customer.scss"></style>
