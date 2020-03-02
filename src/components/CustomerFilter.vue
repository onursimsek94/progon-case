<template>
  <div class="columns is-multiline customer-filter">
    <div class="column is-2-desktop is-6-tablet">
      <label class="pn-label">{{$t('customers.label.company_name')}}</label>
      <el-input
        clearable
        v-model="filter.companyName"
      >
      </el-input>
    </div>

    <div class="column is-2-desktop is-6-tablet">
      <label class="pn-label">{{$t('customers.label.contact_name')}}</label>
      <el-input
        clearable
        v-model="filter.contactName"
      >
      </el-input>
    </div>

    <div class="column is-2-desktop is-6-tablet">
      <label class="pn-label">{{$t('customers.label.country')}}</label>
      <el-select
        clearable
        filterable
        :disabled="!countryIsSelectable"
        v-model="filter.country"
      >
        <el-option
          v-for="item in getCountries"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>

    <div class="column is-2-desktop is-6-tablet">
      <label class="pn-label">{{$t('customers.label.city')}}</label>
      <el-select
        clearable
        filterable
        :disabled="!cityIsSelectable"
        v-model="filter.city"
      >
        <el-option
          v-for="item in getCities"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>

    <div class="column is-2-desktop is-6-tablet">
      <el-button
        class="pn-button"
        type="primary"
        @click="handleFilterClick"
      >
        {{$t('customers.button.filter')}}
      </el-button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'CustomerFilter',
    data () {
      return {
        filter: {
          companyName: '',
          contactName: '',
          country: null,
          city: null,
        },
      }
    },
    methods: {
      handleFilterClick () {
        this.$emit('setFilter', this.filter)
      },
    },
    computed: {
      countryIsSelectable () {
        return !this.filter.city
      },
      cityIsSelectable () {
        return !this.filter.country
      },
      ...mapGetters([
        'getCountries',
        'getCities',
      ]),
    },
  }
</script>

<style lang="scss" src="./CustomerFilter.scss"></style>
