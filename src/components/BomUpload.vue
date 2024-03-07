<template>

    <div class="com">
        <div class="card">
            <h4 style="text-align: center;">Upload BOM<br>File Here</h4>
            <label for="file" class="btn">Upload</label>
            <input type="file" hidden id="file">
        </div>
    </div>

</template>

<style>
.com {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.com .card {
    display: flex;
    height: 200px;
    width: 300px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #242424;
    border-radius: 4px;
    background: rgba(245, 245, 245, 0.5);
    backdrop-filter: blur(5px);
}
.com .card .btn {
    background-color: #42b983;
    padding: 8px 12px;
    border-radius: 4px;
    margin: 8px 0px;
    cursor: pointer;
}
</style>