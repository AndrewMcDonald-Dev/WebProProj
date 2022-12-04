<script setup lang="ts">
import type { User } from '@/models/user';

const props = defineProps<{
    users: User[];
}>();
</script>

<template>
    <tr v-for="(user, index) in users" :key="index">
        <th>{{ user._id }}</th>
        <td>
            <div class="avatar-image">
                <figure class="image is-64x64">
                    <img :src="user.pic" alt="Profile" class="img" />
                </figure>
            </div>
        </td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.handle }}</td>
        <td>{{ user.isAdmin }}</td>
        <td>
            <div class="mut-buttons">
                <button>
                    <i class="fas fa-edit"></i>
                </button>
                <button>
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    </tr>
</template>

<style scoped lang="scss">
.mut-buttons {
    display: flex;
    flex-direction: column;
}
button {
    margin: 0.2em;
}
</style>
