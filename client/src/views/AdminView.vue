<script setup lang="ts">
import { useUsers, type User } from '../models/user';
import UserList from '../components/UserList.vue';
import { onMounted, ref, type Ref } from 'vue';
import AutoCompleteVue from '../components/AutoComplete.vue';
import { useComplete } from '../models/autcomplete'
const autoComplete = useComplete()

const users = useUsers();
onMounted(async () => {
    await users.fetchUsers();
});

//! couldnt get to work
// let userList: Ref<User[]>;
// if(autoComplete.list.length > 0) {
//     userList = ref(autoComplete.list)
// } else {
//     userList = ref(users.list)
// }
</script>

<template>

    <div class="columns">
        <div class="column">

            <AutoCompleteVue :update-query="autoComplete.updateQuery" :list="autoComplete.list" />
        </div>
    </div>
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
    margin: 1em auto;
}
</style>
