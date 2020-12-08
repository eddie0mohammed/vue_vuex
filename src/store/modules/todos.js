
import axios from 'axios';


const state = {
    todos: [
        {
            id: 1,
            title: 'Todo One',
        },
        {
            id: 2,
            title: 'Todo Two',
        },
    ]
};

const getters = {
    allTodos: (state) => state.todos
};

const actions = {
    async fetchTodos({ commit }){
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

            commit('setTodos', response.data); 

        }catch(err){
            console.log(err);
        }
    },

    async addTodo({ commit }, title){
        try{
             const response = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false});

             commit('newTodo', response.data);

        }catch(err){
            console.log(err);
        }
    },

    async deleteTodo({ commit }, id) {
        try{
            await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
            
            commit('removeTodo', id);
        }catch(err){
            console.log(err);
        }
    },

    async filterTodos({commit}, e) {
        try{
            const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${e.target.value}`);

            commit('filterTodosItem', response.data);

        }catch(err){
            console.log(err);
        }
    },

    updateTodo({commit}, id) {
        commit('updateTodo', id);
    }
}; 

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(elem => elem.id !== id),
    filterTodosItem: (state, todos) => state.todos = todos,
    updateTodo: (state, id) => {
        const currentTodos = [...state.todos];
        const index = currentTodos.findIndex(todo => todo.id === id);
        currentTodos[index].completed = !currentTodos[index].completed;
        state.todos = currentTodos;   
        return state;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}