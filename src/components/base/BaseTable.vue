<template>
  <table>
    <tr>
      <th v-for="head in headers">{{ head }}</th>
      <th v-if="hasActions">-</th>
    </tr>
    <tr v-for="line in body" :class="{actionable: isActionable}">
      <td v-for="field in Object.values(line)"
          @click.stop="callGeneralAction(line)"
      >{{ field }}</td>
      <td v-if="hasActions" class="actions">
        <button class="btn sm"
                v-for="action in actions"
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
    props: ['data', 'display', 'generalAction', 'actions'],

    methods: {
      callGeneralAction(line) {
        if(this.isActionable) this.generalAction(line);
      }
    },

    computed: {
      isActionable(){
        return !!this.generalAction;
      },
      hasActions(){
        return !!this.actions;
      },
      headers() {
        if(!this.data?.length) return [];
        if(!this.display?.length) return this.data;

        return Object.keys(this.data[0]).filter(key => {
          return this.display.includes(key);
        })
      },

      body(){
        if(!this.display?.length) return this.data;

        return this.data.map(line => {
          let final = {};

          Object.keys(line).forEach(key => {
            if(this.display.includes(key)){
              final[key] = line[key];
            }
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
</style>

