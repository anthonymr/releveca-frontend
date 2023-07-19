<template>
  <div>
    {{ session.user.user_name }}
  </div>
</template>

<script>
  import { useSession } from '../../store/session'

  export default {
    data(){
      return {
        session: useSession(),
      }
    }
  }
</script>