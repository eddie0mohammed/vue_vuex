<template>
    <div>
        <h3>Todos</h3>
        <div class="todos">
            <div 
                class="todo"
                v-for="todo in allTodos"
                v-bind:key="todo.id"
                v-on:dblclick="handleDoubleClick(todo.id)"
                v-bind:class="{'completed':todo.completed}"
                >
                {{todo.title}}

                <div class='trash' v-on:click='handleRemove(todo.id)'>X</div>
            </div>
        </div>
    </div>    
</template>


<script>

import {mapGetters, mapActions} from 'vuex';

export default {
    name: 'Todos',

    computed: mapGetters(['allTodos']),

    methods: {
        ...mapActions(['fetchTodos', 'deleteTodo', 'updateTodo']),

        handleRemove(id){
            this.deleteTodo(id);
        },

        handleDoubleClick(id){
            this.updateTodo(id);
        }
    },

    created(){
        this.fetchTodos();
    }

}
</script>

<style scoped>

    .todos {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
    }

    .todo {
        border: 1px solid #ccc;
        background: #41b883;
        padding: 1rem;
        border-radius: 5px;
        text-align: center;
        position: relative;
        cursor: pointer;
    }

    .trash{
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: white;
        cursor: pointer;
    }

    .completed{
        background: red;
    }
</style>

