<template>
  <div class="login">
    <div class="login-panel">
      <h1 class="title">YZM管理系统</h1>
      <el-tabs type="border-card" v-model="currentTab" stretch>
        <el-tab-pane name="account">
          <template #label>
            <span><i class="el-icon-user-solid"></i> 账号登录</span>
          </template>
          <login-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
          </template>
          <login-phone />
        </el-tab-pane>
      </el-tabs>

      <div class="account-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>

      <el-button type="primary" class="login-btn" @click="handleLoginClick">
        立即登录
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './cpns/login-account.vue'
import LoginPhone from './cpns/login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(true)

    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('account')

    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('phoneRef调用loginAction')
      }
    }
    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
.account-control {
  margin: 10px 0 30px;
  display: flex;
  justify-content: space-between;
}
</style>
