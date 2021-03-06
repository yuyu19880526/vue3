<template>
  <pro-layout
    v-model:collapsed="baseState.collapsed"
    v-model:selectedKeys="baseState.selectedKeys"
    v-model:openKeys="baseState.openKeys"
    v-bind="state"
    :loading="loading"
    :breadcrumb="{ routes: breadcrumb }"
    iconfont-url="//at.alicdn.com/t/font_2804900_nzigh7z84gc.js"
  >
    <template #menuHeaderRender>
      <a>
        <crown-outlined style="font-size:26px;color:#fff" />
        <h1>DEMO</h1>
      </a>
    </template>
    <!-- custom right-content -->
    <template #rightContentRender>
      <div style="margin-right: 12px">
        <a-avatar shape="square" size="small">
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
      </div>
    </template>
    <!-- content begin -->
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </pro-layout>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect} from 'vue';
import { useRouter } from 'vue-router';
import { Button, Input, Switch, Select, Avatar, Space, Badge, Menu } from 'ant-design-vue';
import { getMenuData, clearMenuItem } from '@ant-design-vue/pro-layout';
import type { RouteContextProps } from '@ant-design-vue/pro-layout';

const i18n = (t: string) => t;

export default defineComponent({
  name: 'BasicLayout',
  components: {

    [Button.name]: Button,
    [Input.name]: Input,
    [Input.Search.name]: Input.Search,
    [Switch.name]: Switch,
    [Select.name]: Select,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    [Select.Option.displayName!]: Select.Option,
    [Space.name]: Space,
    [Badge.name]: Badge,
    [Avatar.name]: Avatar,
    [Menu.Item.name]: Menu.Item,
  },
  setup() {
    const loading = ref(false);
    const router = useRouter();
    const { menuData } = getMenuData(clearMenuItem(router.getRoutes()));

    const baseState = reactive<Omit<RouteContextProps, 'menuData'>>({
      selectedKeys: [],
      openKeys: [],
      // default
      collapsed: false,
    });

    const state = reactive({
      menuData,
      splitMenus: true,
      // title: 'ProLayout',
      // logo: 'https://alicdn.antdv.com/v2/assets/logo.1ef800a8.svg',
      navTheme: 'dark',
      layout: 'side',
      fixSiderbar: true,
      fixedHeader: true,
    });
    const breadcrumb = computed(() =>
      router.currentRoute.value.matched.concat().map(item => {
        return {
          path: item.path,
          breadcrumbName: item.meta.title || '',
        };
      }),
    );

    const handleCollapsed = () => {
      baseState.collapsed = !baseState.collapsed;
    };
    watchEffect(() => {
      if (router.currentRoute) {
        const matched = router.currentRoute.value.matched.concat();
        baseState.selectedKeys = matched.filter(r => r.name !== 'index').map(r => r.path);
        baseState.openKeys = matched
          .filter(r => r.path !== router.currentRoute.value.path)
          .map(r => r.path);
      }
    });

    function handlePageLoadingClick() {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    }

    return {
      i18n,
      baseState,
      state,
      loading,
      breadcrumb,

      handlePageLoadingClick,
      handleCollapsed
    };
  },
});
</script>
