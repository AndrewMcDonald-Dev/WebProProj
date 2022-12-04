<script setup lang="ts">
import { useUsers } from '../models/user';
import UserList from '../components/UserList.vue';
import { onMounted } from 'vue';

const users = useUsers();
onMounted(async () => {
    await users.fetchUsers();
});
</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th><abbr title="Position">ID</abbr></th>
                <th>Pic</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Handle</th>
                <th>is Admin</th>
            </tr>
        </thead>
        <tbody>
            <UserList :users="users.list" />
        </tbody>
    </table>
</template>

<style scoped lang="scss">
.table {
    margin: 3em auto;
}
</style>
