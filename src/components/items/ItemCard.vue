<template>
  <article class="card">
    <div class="card-header">
      <div class="add-item">
        <input type="number">
        <button>+</button>
      </div>
      <div class="middle">
        <button class="item-info">i</button>
      </div>
      <div class="right">
        <span>{{ item.price }} USD</span>
        <span>{{ item.stock }} disponible</span>
      </div>
    </div>
    <div class="card-screen">
    </div>
    <div class="card-footer">
      <span class="code">{{ item.code }}</span>
      <span class="name">{{ item.name }}</span>
    </div>
  </article>
</template>

<script>
  export default {
    props: ['item']
  }
</script>

<style scoped>
  .add-item {
    width: 80px;
    height: 40px;
    background-color: var(--primary);
    border-radius: 5px 0 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .middle {
    width: calc(100% - 200px);
    height: 40px;
  }

  .right {
    width: 120px;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: right;
    padding: 5px 10px 0 0;
  }

  .add-item > input {
    width: 30px;
    border: none;
    text-align: right;
    margin-right: 10px;
    font-size: 14px;
    background-color: var(--primary);
    color: var(--border-light);
    border-bottom: 1px solid var(--border-light);
  }

  .add-item > button,
  .item-info {
    border: none;
    background-color: var(--border-light);
    width: 20px;
    height: 20px;
    border-radius: 10px;
    cursor: pointer;
    color: var(--border-dark);
    font-size: 20px;
    line-height: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-info {
    margin: 5px 20px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    font-size: 16px;
    font-weight: 600;
    color: var(--font-dark);
  }

  .right > span:first-child {
    line-height: 20px;
    font-weight: 600;
  }

  .right > span:last-child {
    line-height: 12px;
    font-size: 12px;
    font-weight: 300;
    color: var(--border);
  }

  .code {
    color: var(--primary);
    margin-right: 5px;
  }

  .name {
    color: var(--border-dark);
    font-weight: 300;
  }
</style>