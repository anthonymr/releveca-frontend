<template>
  <table>
    <tr>
      <th v-for="head in headers">{{ head }}</th>
    </tr>
    <tr v-for="line in body">
      <td v-for="field in Object.values(line)">{{ field }}</td>
    </tr>
  </table>
</template>

<script>
  export default {
    props: ['data', 'display'],

    computed: {
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

