import { defineStore } from 'pinia';

export const useCart = defineStore('cart-store', {
  state() {
    return {
      items: []
    }
  },

  actions: {
    clear(){
      this.items = [];
    },
    addItem(newItem){
      let item = this.items.find(item => item.id === newItem.id);
      
      if(item) {
        item.count += newItem.count;
      } else {
        this.items.push({...newItem});
      }
    },
    removeItem(itemToDelete){
      this.items = this.items.filter(item => item.id !== itemToDelete.id);
    }
  },

  getters: {
    isEmpty(){
      return !this.items.length;
    },
    count(){
      return this.items.reduce((a, b) => a + b.count, 0);
    }
  }
});