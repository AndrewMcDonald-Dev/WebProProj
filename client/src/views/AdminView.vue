<script setup lang="ts">
import { useSession, users } from '../models/session';
import UserList from '../components/UserList.vue';
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
            <UserList :users="users" />
        </tbody>
    </table>
</template>
