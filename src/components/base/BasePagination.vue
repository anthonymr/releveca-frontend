
<template>
  <section class="pagination">
    <button class="btn sm"
            :class="isSelected(page) ? 'primary' : 'text'"
            v-for="page in pages"
            @click="$emit('changePage', page)"
    >
      {{ page }}
    </button>
  </section>
  <slot />

  <section class="pagination">
    <button class="btn sm"
            :class="isSelected(page) ? 'primary' : 'text'"
            v-for="page in pages"
            @click="$emit('changePage', page)"
    >
      {{ page }}
    </button>
  </section>
</template>

<script>
  export default {
    emits: ['changePage'],
    props: ['data'],

    methods: {
      isSelected(page){
        return page === this.data.current_page
      }
    },

    computed: {
      pages() {
        if(!this.data?.pages) return [];

        if(this.data.pages <= 7) return Array(this.data.pages).fill().map((_x,i)=>i + 1);

        if(this.data.current_page < 3 || (this.data.current_page > this.data.pages - 2))
          return [1, 2, 3, '...', this.data.pages - 2, this.data.pages - 1, this.data.pages];

        return [1, '...', this.data.current_page - 1, this.data.current_page, this.data.current_page + 1, '...', this.data.pages];
      }
    }
  }
</script>

<style scoped>
  section {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 10px 0;
  }
</style>