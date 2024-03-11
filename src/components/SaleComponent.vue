<template>

    <div class="com">
        <div class="card">
            <h4 style="text-align: center;">Enter Data<br>Here</h4>
            <input type="text" placeholder="Sale" id="sale" v-model="sale">
            <button @click="get_purchases()">Submit</button>
        </div>
        <table class="products">
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>QTY</th>
            </tr>
            <tr class="product" v-for="product in products" :key="product">
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
                <td><input type="number" value="0" v-model="product.qty"></td>
            </tr>
        </table>
        <hr>
        <table class="products" v-if="items.length > 0">
            <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Consumption</th>
            </tr>
            <tr class="product" v-for="item in items" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.consumption }}</td>
            </tr>
        </table>
        <table class="po_items" v-if="pos.length > 1">
            <tr>
                <div class="po_item">
                    <th>Item</th>
                    <th>PO Creation Date</th>
                    <th>Qty.</th>
                    <th>Lead Time</th>
                    <th>Expected Delivery Date</th>
                    <th>Forecasted Consumption</th>
                </div>
            </tr>
            <div v-for="item in pos" :key="item.id" class="po_item">
                <tr v-for="it in item" :key="it.id">
                    <td>{{ it.name }}</td>
                    <td>{{ it.po.date.split('T')[0] }}</td>
                    <td>{{ Math.round(it.po.qty) }}</td>
                    <td>{{ it.po.leadTime }}</td>
                    <td>{{ it.po.date_lead.split('T')[0] }}</td>
                    <td>{{ Math.round(it.consumption) }}</td>
                </tr>
            </div>

        </table>
    </div>

</template>

<style>
.com {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
}

.com .card {
    display: flex;
    min-height: 200px;
    min-width: 300px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #242424;
    border-radius: 4px;
    background: rgba(245, 245, 245, 0.5);
    backdrop-filter: blur(5px);
}

.com .card button {
    background-color: #42b983;
    padding: 8px 12px;
    border-radius: 4px;
    margin: 8px 0px;
    border: none;
}

.com .card input {
    padding: 8px 12px;
    border-radius: 4px;
    margin: 8px 0px;
    border: 1px solid #242424;
    outline: none;
}

.com .products .product td:last-child input {
    width: 50px;
    padding: 4px 2px;
    outline: none;
    border: none;
}

.com .products,
.com .po_items {
    border-collapse: collapse;
    width: 300px;
}

.com .po_items {
    width: 90%;
}

.com .products .product td,
.com .products tr th,
.com .po_items .po_item td,
.com .po_items tr th {
    border: 1px solid #242424;
}

.com .products .product td,
.com .products tr th,
.com .po_items tr td,
.com .po_items tr th {
    padding: 4px;
}

.com .po_items .po_item td {
    width: 180px;
    overflow: hidden;
}
.com .po_items th {
    max-width: 15%;
    min-width: 180px;
}
</style>

<script>

export default {
    data() {
        return {
            products: [],
            items: [],
            pRatio: [],
            pos: [],
            sale: 0
        }
    },
    methods: {
        fetch_products: async function () {
            console.log(this.$store.state.apiURL);
            await fetch(`${this.$store.state.apiURL}/products/`).then(
                res => res.json()
            ).then(
                data => {
                    data = data.data;
                    this.products = [];
                    for (let i = 0; i < data.length; i++) {
                        this.products.push({
                            id: data[i].id,
                            name: data[i].name,
                            price: data[i].price,
                            qty: 0
                        })
                    }
                }
            );
        },
        t: function () {
            let products = this.products.filter(product => Number(product.qty) > 0).map(product => {
                return {
                    id: product.id,
                    qty: product.qty
                }
            });
            if (!this.sale > 0) { document.getElementById("sale").style.border = "1px solid red"; return; }
            return { products: products, sales: this.sale };
        },

        get_consumption: async function () {
            this.items = [];
            let data = JSON.stringify(this.t());
            await fetch(`${this.$store.state.apiURL}/consumption/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            }).then(
                res => res.json()
            ).then(
                data => {
                    this.items = data.data.items;
                    this.pRatio = data.data.products;
                }
            ).then(
                () => {
                    this.pRatio.map(x => {
                        ({
                            ratio: x.ratio * 100
                        })
                    })
                    console.log(this.pRatio);
                }
            )
        },

        get_purchases: async function () {
            let data = JSON.stringify(this.t());
            await fetch(`${this.$store.state.apiURL}/input/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            }).then(res => res.json()).then(data => {
                this.pos = data.data.pos;
            })
        }
    },

    beforeMount() {
        this.fetch_products();
    }
}

</script>