<template>
  <div class="home">
    <BomComponent style="display: none;" />
    <SaleComponent />
  </div>
</template>

<script>
import BomComponent from '../components/BomUpload.vue';
import SaleComponent from '../components/SaleComponent.vue';
export default {
  components: {
    BomComponent,
    SaleComponent
  },
  methods: {
    initialized: function() {
      if(localStorage.getItem("initialized") == null) {
        return false;
      }
      return true;
    }
  }
}
</script>
