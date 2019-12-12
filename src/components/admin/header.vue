<template>
    <div>
        <div class="button-group-area">
            <router-link to="/admin" class="genric-btn success">Home</router-link>
				<router-link to="/admin/user" class="genric-btn success">Users</router-link>
                <router-link to="/admin/category" class="genric-btn success">Category</router-link>
                <router-link to="/admin/product/123" class="genric-btn success">Products</router-link>
                <router-link to="/admin/product/add" class="genric-btn success">Add Product</router-link>
		</div>
    </div>
</template>

<style scoped>
.button-group-area:first-child{
    padding-left:100px;
    margin-top:40px;
}
</style>