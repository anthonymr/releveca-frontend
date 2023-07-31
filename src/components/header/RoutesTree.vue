<template>
  <nav>
    <Menubar :model="routes">
      <template #end tag="div">
        <div class="icon cart" @click="$emit('toggle-cart')">
          <font-awesome-icon icon="cart-shopping" />
          <div v-if="count" class="count">{{ count }}</div>
        </div>
        <div class="user">
          <current-user class="username" />
          <current-corporation class="corporation" />
        </div>
        <div class="icon exit">
          <Avatar :label="UserLetter" class="mr-2" shape="circle" />
        </div>
      </template>
    </Menubar>
  </nav>
</template>

<script>
  import { mapState } from 'pinia';
  import CurrentUser from './../session/CurrentUser.vue';
  import CurrentCorporation from './../session/CurrentCorporation.vue';
  import { useSession } from '../../store/session';

  export default {
    emits: ['toggle-cart'],

    components: {
      CurrentUser,
      CurrentCorporation
    }, 

    methods: {
      menuItems(routes, root = ''){
        return routes.filter(route => route.meta.displayOnHeader).map(route => {
          let items = [];
          let to = root ? `${root}/${route.path}` : route.path;

          if(route?.children?.length) {
            items = this.menuItems(route.children, to);
            to = ''; 
          }

          return { label: route.name, to, items }
        });
      }
    },

    computed: {
      ...mapState(useSession, ['user']),
      routes() {
        return this.menuItems(this.$router.options.routes);
      },
      UserLetter(){
        if(!this.user?.name) return '';
        return this.user.name[0].toUpperCase();
      }
    }
  }
</script>

<style>

.p-submenu-list {
  z-index: 10 !important;
}

.p-menubar.p-component {
  border: none;
  border-radius: 0;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.p-menubar-end {
  display: flex;
  flex-direction: row;
  padding-right: 10px;
}

.user,
.icon {
  margin: 10px 5px;
  padding: 5px;
}

.icon {
  cursor: pointer;
  user-select: none;
}

.user {
  display: flex;
  flex-direction: column;
  user-select: none;
}

.corporation {
  color: var(--border-dark);
  font-weight: 300;
  font-size: 12px;
  text-align: right;
  line-height: 12px;
}

.username {
  font-size: 16px;
  line-height: 19px;
}

.cart {
  position: relative;
}

.count {
  position: absolute;
  padding: 1px 3px;
  font-size: 10px;
  line-height: 11px;
  font-weight: 300;
  right: 0;
  bottom: 7px;
  color: var(--border-light);
  background-color: var(--danger);
  border-radius: 5px;
}
</style>