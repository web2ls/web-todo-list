<template>
  <div class="todo">
    <div class="todo-check" @click.stop="emitOnSelectTodo()">
      <unicon v-if="!isSelected" name="square-full" fill="#e8a87c" width="30" height="30"></unicon>
      <unicon v-else name="check-square" fill="#e27d60" width="30" height="30"></unicon>
    </div>
    <div
      class="todo-content"
      @click.stop="editTodo()"
      :class="{completed: todo.isComplete}"
    >{{todo.name}}</div>
    <div
      class="todo-complete-zone"
      @click.stop="emitOnCompletedTodo()"
      :class="{completed: todo.isComplete}">
      <div v-if="!todo.isComplete">Complete</div>
      <div v-else>Completed</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["todo"],
  data: function() {
    return {
      isSelected: false
    };
  },
  methods: {
    editTodo: function() {
      console.log("Edit todo item");
    },

    emitOnCompletedTodo: function() {
      this.$emit("onCompleteTodo", {
        id: this.todo.id,
        isComplete: !this.todo.isComplete
      });
    },

    emitOnSelectTodo() {
      this.isSelected = !this.isSelected;
      this.$emit("onSelectTodo", {
        id: this.todo.id,
        isSelected: this.isSelected
      });
    }
  }
};
</script>

<style scoped lang="scss">
.todo {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  min-height: 50px;
  margin: 3% auto;
  background: #fff;
  box-shadow: -10px 10px 10px 0px lightgrey;
  text-align: left;
  border: 1px solid transparent;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: -1px 1px 1px 0px lightgrey;
    border: 1px solid limegreen;
  }

  & .todo-check {
    flex-basis: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .todo-content {
    flex-basis: 70%;
    padding: 1% 3%;

    &.completed {
      color: gray;
      text-decoration: line-through;
    }
  }

  & .todo-complete-zone {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-basis: 20%;
    background: rgba(50, 205, 50, 0.3);
    color: #fff;
    font-weight: 300;
    transition: all 0.3s;

    &:hover {
      font-weight: 400;
      background: rgba(50, 205, 50, 0.7);
    }

    &.completed {
      background: rgba(50, 205, 50, 0.7);
    }
  }
}
</style>
