<template>
  <div>
    您已登出
  </div>
</template>

<script>
export default {
  middleware: async (ctx) => {
    const { status, data: { code } } = await ctx.$axios.get('/exit')
    if (status === 200 && code === 0) {
      return ctx.redirect('/login')
    }
  }
}
</script>
