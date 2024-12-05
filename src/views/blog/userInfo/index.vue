<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="queryParams.username" placeholder="请输入用户名" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="queryParams.nickname" placeholder="请输入昵称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="queryParams.status" placeholder="请选择状态" clearable >
                <el-option v-for="dict in t_show_status" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['blog:userInfo:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['blog:userInfo:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['blog:userInfo:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['blog:userInfo:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="userInfoList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="ID" align="center" prop="id" v-if="true" />
        <el-table-column label="用户名" align="center" prop="username" />
        <el-table-column label="昵称" align="center" prop="nickname" />
        <el-table-column label="头像" align="center" prop="avatarUrl" width="100">
          <template #default="scope">
            <image-preview :src="scope.row.avatarUrl" :width="50" :height="50"/>
          </template>
        </el-table-column>
        <el-table-column label="座右铭" align="center" prop="motto" />
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="t_show_status" :value="scope.row.status"/>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createdAt" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.createdAt, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center" prop="updatedAt" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.updatedAt, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['blog:userInfo:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['blog:userInfo:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改信息管理对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="userInfoFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <image-upload v-model="form.avatar"/>
        </el-form-item>
        <el-form-item label="座右铭" prop="motto">
            <el-input v-model="form.motto" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in t_show_status"
              :key="dict.value"
              :value="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="UserInfo" lang="ts">
import { listUserInfo, getUserInfo, delUserInfo, addUserInfo, updateUserInfo } from '@/api/blog/userInfo';
import { UserInfoVO, UserInfoQuery, UserInfoForm } from '@/api/blog/userInfo/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { t_show_status } = toRefs<any>(proxy?.useDict('t_show_status'));

const userInfoList = ref<UserInfoVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const userInfoFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: UserInfoForm = {
  id: undefined,
  username: undefined,
  nickname: undefined,
  avatar: undefined,
  motto: undefined,
  status: undefined,
}
const data = reactive<PageData<UserInfoForm, UserInfoQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    username: undefined,
    nickname: undefined,
    status: undefined,
    params: {
    }
  },
  rules: {
    username: [
      { required: true, message: "用户名不能为空", trigger: "blur" }
    ],
    nickname: [
      { required: true, message: "昵称不能为空", trigger: "blur" }
    ],
    avatar: [
      { required: true, message: "头像不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "状态不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询信息管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listUserInfo(queryParams.value);
  userInfoList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  userInfoFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: UserInfoVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加信息管理";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: UserInfoVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getUserInfo(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改信息管理";
}

/** 提交按钮 */
const submitForm = () => {
  userInfoFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateUserInfo(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addUserInfo(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: UserInfoVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除信息管理编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delUserInfo(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('blog/userInfo/export', {
    ...queryParams.value
  }, `userInfo_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
