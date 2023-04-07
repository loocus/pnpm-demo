<template>
  <el-form></el-form>
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script setup lang="ts">
import * as userApi from '@/apis/users';

const list = ref([]);

onBeforeMount(async () => {
	const { data: res } = await userApi.findAll();

	if (res.success) {
		list.value = res.data;
	}
});
</script>