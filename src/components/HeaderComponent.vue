<template>

    <div class="header">
        <div class="brand">
            <h2>The Brand</h2>
        </div>
        <div class="links">
            <a href="#" class="links">Home</a>
            <a href="#" class="links">About</a>
            <input type="text" v-model="$store.state.apiURL" @change="$store.commit('setApiURL', $store.state.apiURL)">
        </div>
    </div>

</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background-color: #242424;
}

.header .brand {
    color: #fff;
}

.header a {
    color: #42b983;
    text-decoration: none;
    font-size: 12px;
    margin: 0px 8px;
}
</style>

<script>
export default {
    name: 'HeaderComponent'
}
</script>