<template>
  <table>
    <tr>
      <th v-for="head, index in headers" :style="width(index)">{{ head }}</th>
      <th class="actions-th"></th>
    </tr>
    <tr v-for="line in body" :class="{actionable: isActionable}">
      <td v-for="field, index in Object.values(line)"
          @click.stop="callGeneralAction(line)"
          :class="config.classes[index]"
      >{{ field }}</td>
      <td v-if="hasActions" class="actions">
        <button class="btn sm"
                v-for="action in config.actions"
                @click="action.action(line)"
        >
          {{ action.name }}
        </button>
      </td>
    </tr>
  </table>
</template>

<script>
  export default {
    props: ['config', 'data'],

    methods: {
      callGeneralAction(line) {
        if(this.isActionable) this.config.generalAction(line);
      },
      width(index){
        if(this.config.widths[index] === '*') return `width: calc(100% - ${this.totalWidth + 110}px)`;
        else return `width: ${this.config.widths[index]}px`;
      },
    },

    computed: {
      totalWidth(){
        return this.config.widths.reduce((a,b) => {
          return b !== '*' ? a + b : a;
        },0);
      },
      isActionable(){
        return !!this.config.generalAction;
      },
      hasActions(){
        return !!this.config.actions;
      },
      headers() {
        if(!this.data?.length) return this.config.display.map(title => title.name);
        if(!this.config.display?.length) return Object.keys(this.data[0]);

        return this.config.display.map(title => title.name);
      },

      body(){
        if(!this.config.display?.length) return this.data;

        return this.data.map(line => {
          let final = {};

          this.config.display.forEach(title => {
            final[title.key] = line[title.key];
          })

          return final;
        })
      }
    }
  }
</script>

<style scoped>
 .actionable {
  cursor: pointer;
 }

 .actionable:hover {
  background-color: var(--border-light);
 }

 .actions {
  display: flex;
  gap: 5px;
 }

 .actions-th {
  width: 110px;
 }
</style>

