<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter"
      :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="queryParams.title" placeholder="请输入文章标题" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="文章摘要" prop="summary">
              <el-input v-model="queryParams.summary" placeholder="请输入文章摘要" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="分类" prop="category">
              <el-select v-model="queryParams.category" placeholder="请选择分类" clearable>
                <el-option v-for="item in categoryOptions" :key="item.categoryId" :label="item.categoryName"
                  :value="item.categoryName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否置顶" prop="isTop">
              <el-select v-model="queryParams.isTop" placeholder="请选择是否置顶" clearable>
                <el-option v-for="dict in t_articles_istop" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
                <el-option v-for="dict in t_articles_status" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间" prop="publishTime">
              <el-date-picker clearable v-model="queryParams.publishTime" type="date" value-format="YYYY-MM-DD"
                placeholder="请选择发布时间" />
            </el-form-item>
            <el-form-item label="创建时间" prop="createdAt">
              <el-date-picker clearable v-model="queryParams.createdAt" type="date" value-format="YYYY-MM-DD"
                placeholder="请选择创建时间" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd"
              v-hasPermi="['blog:articles:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"
              v-hasPermi="['blog:articles:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()"
              v-hasPermi="['blog:articles:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport"
              v-hasPermi="['blog:articles:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="articlesList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <!-- <el-table-column label="主键ID" align="center" prop="id" v-if="true" /> -->
        <el-table-column label="文章标题" align="center" prop="title" />
        <el-table-column label="文章摘要" align="center" prop="summary" />
        <!-- <el-table-column label="文章内容" align="center" prop="content" /> -->
        <el-table-column label="标签" align="center">
          <template #default="scope">
            <span v-for="(tag, index) in scope.row.tags" :key="tag.id">
              <el-tag :type="tag.type" style="margin-right: 5px;">
                {{ tag.name }}
              </el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="封面图片" align="center" prop="coverImgUrl" width="100">
          <template #default="scope">
            <image-preview :src="scope.row.coverImgUrl" :width="50" :height="50" />
          </template>
        </el-table-column>
        <el-table-column label="分类" align="center" prop="category" />
        <el-table-column label="浏览量" align="center" prop="views" />
        <el-table-column label="是否置顶" align="center" prop="isTop">
          <template #default="scope">
            <dict-tag :options="t_articles_istop" :value="scope.row.isTop" />
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="t_articles_status" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="发布时间" align="center" prop="publishTime" width="120">
          <template #default="scope">
            <span>{{ parseTime(scope.row.publishTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createdAt" width="120">
          <template #default="scope">
            <span>{{ parseTime(scope.row.createdAt, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center" prop="updatedAt" width="120">
          <template #default="scope">
            <span>{{ parseTime(scope.row.updatedAt, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                v-hasPermi="['blog:articles:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                v-hasPermi="['blog:articles:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改文章管理对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="1000px" append-to-body>
      <el-form ref="articlesFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="文章摘要" prop="summary">
          <el-input v-model="form.summary" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="封面图片" prop="coverImg">
          <image-upload :limit="1" v-model="form.coverImg" />
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="form.tags" filterable multiple placeholder="请选择标签" :collapse-tags="false"
            tag-placeholder="添加标签">
            <el-option v-for="item in tagsOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option v-for="item in categoryOptions" :key="item.categoryId" :label="item.categoryName"
              :value="item.categoryName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容">
          <editor v-model="form.content" :min-height="192" />
        </el-form-item>
        <el-form-item label="是否置顶" prop="isTop">
          <el-radio-group v-model="form.isTop">
            <el-radio v-for="dict in t_articles_istop" :key="dict.value" :value="parseInt(dict.value)">{{ dict.label
              }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio v-for="dict in t_articles_status" :key="dict.value" :value="dict.value">{{ dict.label
              }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发布时间" prop="publishTime">
          <el-date-picker clearable v-model="form.publishTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择发布时间">
          </el-date-picker>
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

<script setup name="Articles" lang="ts">
import { listArticles, getArticles, delArticles, addArticles, updateArticles } from '@/api/blog/articles';
import { ArticlesVO, ArticlesQuery, ArticlesForm } from '@/api/blog/articles/types';
import { getTagSelect } from '@/api/blog/tags'
import { getCategorySelect } from '@/api/blog/category';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { t_articles_status, t_articles_istop } = toRefs<any>(proxy?.useDict('t_articles_status', 't_articles_istop'));

const articlesList = ref<ArticlesVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const articlesFormRef = ref<ElFormInstance>();

const categoryOptions = ref<any[]>([]);
const tagsOptions = ref<any[]>([]);

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ArticlesForm = {
  id: undefined,
  title: undefined,
  summary: undefined,
  content: undefined,
  coverImg: undefined,
  category: undefined,
  isTop: undefined,
  status: undefined,
  publishTime: undefined,
}
const data = reactive<PageData<ArticlesForm, ArticlesQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    title: undefined,
    summary: undefined,
    category: undefined,
    isTop: undefined,
    status: undefined,
    publishTime: undefined,
    createdAt: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "主键ID不能为空", trigger: "blur" }
    ],
    title: [
      { required: true, message: "文章标题不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

const getCategory = async () => {
  const res = await getCategorySelect();
  console.log(res);
  categoryOptions.value = res.data;
}
const getTags = async () => {
  const res = await getTagSelect();
  tagsOptions.value = res.data;
}

/** 查询文章管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listArticles(queryParams.value);
  articlesList.value = res.rows;
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
  form.value = { ...initFormData };
  articlesFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ArticlesVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加文章管理";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ArticlesVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getArticles(_id);
  Object.assign(form.value, res.data);
  form.value.tags = res.data.tags.map(tag => tag.id); // 提取标签 ID
  dialog.visible = true;
  dialog.title = "修改文章管理";
}

/** 提交按钮 */
const submitForm = () => {
  articlesFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        console.log(form.value);
        await updateArticles(form.value).finally(() => buttonLoading.value = false);
      } else {
        await addArticles(form.value).finally(() => buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ArticlesVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除文章管理编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delArticles(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('blog/articles/export', {
    ...queryParams.value
  }, `articles_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
  getTags();
  getCategory();
});
</script>
