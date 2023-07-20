<template>
  <table>
    <tr>
      <th v-for="head in headers">{{ head }}</th>
    </tr>
    <tr v-for="line in data">
      <td v-for="field in Object.values(line)">{{ field }}</td>
    </tr>
  </table>
</template>

<script>
  export default {
    props: ['data'],

    computed: {
      headers() {
        if(!this.data.length) return [];

        return Object.keys(this.data[0]);
      }
    }
  }
</script>

