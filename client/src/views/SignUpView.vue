<script setup lang="ts">
import { ref } from 'vue';
import { useSession } from '../models/session';
const { Register } = useSession();

const handle = ref('');
const password = ref('');
const email = ref('');
const firstName = ref('');
const lastName = ref('');
const pic = ref('');
</script>

<template>
    <div class="section">
        <div class="wrap">
            <form
                class="register-form form"
                @submit.prevent="
                    Register(
                        firstName,
                        lastName,
                        handle,
                        email,
                        password,
                        pic,
                        5
                    )
                "
            >
                <div class="form-header">
                    <h3>Register</h3>
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-input"
                        placeholder="First Name"
                        v-model="firstName"
                        required
                    />
                    <input
                        type="text"
                        class="form-input ml"
                        placeholder="Last Name"
                        v-model="lastName"
                        required
                    />
                </div>
                <div class="form-group">
                    <input
                        type="email"
                        class="form-input"
                        placeholder="Email"
                        v-model="email"
                        required
                    />
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-input"
                        placeholder="Handle"
                        v-model="handle"
                        required
                    />
                    <input
                        type="text"
                        class="form-input ml"
                        placeholder="Pic"
                        v-model="pic"
                        required
                    />
                </div>
                <div class="form-group">
                    <input
                        type="password"
                        class="form-input"
                        placeholder="New Password"
                        v-model="password"
                        required
                    />
                    <input
                        type="password"
                        class="form-input ml"
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                <div class="form-group">
                    <button class="form-button" type="submit">Register</button>
                </div>
                <div class="form-footer">
                    Have an account?
                    <a href="/login.html">Sign In</a>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
}

.form {
    margin: 0 auto;
    border: 1px solid #ddd;
    padding: 2rem;
    background: #eeeeee;
    box-shadow: 7px 7px 30px rgb(165, 164, 164);
    border-radius: 10px;
}

.form-input {
    background: #fafafa;
    border: 1px solid #e2e2e2;
    padding: 1em;
    width: 100%;
}

.form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
}

.ml {
    margin-left: 2em;
}

.form-button {
    background: #49bfd6;
    border: 1px solid #ddd;
    color: #ffffff;
    padding: 10px;
    width: 100%;
    text-transform: uppercase;
    border-radius: 3px;
}

.form-header h3 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    font-size: 3rem;
}

.form-button:hover {
    background: #2ca8d1;
}

.form-footer {
    text-align: center;
}

.form-footer a {
    color: #3595b4;
}

.form-forgot {
    color: #3595b4 !important;
    padding: 0.3em 1em;
}

.form-label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.register-form {
    width: 32em;
}
</style>
