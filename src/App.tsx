import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TasksType, TodoList} from "./TodoListComponent/TodoList";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {
    AppBar,
    Button, createTheme,
    Grid,
    IconButton,
    Paper, ThemeProvider,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {PurpleSwitch} from "./PurpleSwitch/PurpleSwitch";


export type FilterValueType = 'all' | 'active' | 'completed'

type todolistType = {
    id: string,
    title: string,
    filter: FilterValueType
}

type TaskStateType = {
    [todolistID: string]: Array<TasksType>
}

function App() {
    const [darkMode, setDarkMode] = useState(false)

    const theme = createTheme({
            palette: {
                type: darkMode ? 'dark' : "light"
            },
        }
    )

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolist, setTodolist] = useState<Array<todolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}

        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Cheese", isDone: false},
        ]
    })
// tasks
    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)
        })
    }
    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, isDone} : el)
        })
    }
    const addTask = (todolistID: string, title: string) => {
        let newTask: TasksType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
    const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, title: title} : el)})
    }
// todolists
    const removeTodolist = (todolistID: string) => {
        setTodolist(todolist.filter(el => el.id !== todolistID))
    }
    const changeTodoListTitle = (todolistID: string, title: string) => {
        setTodolist(todolist.map(tl => tl.id === todolistID ? {...tl, title: title} : tl))
    }
    const changeTodoListFilter = (todolistID: string, value: FilterValueType) => {
        setTodolist(todolist.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }
    const addTodolist = (title: string) => {
        const newTodolistID = v1()
        let newTodolist: todolistType = {
            id: newTodolistID,
            title: title,
            filter: "all"
        }
        setTodolist([newTodolist, ...todolist])
        setTasks({...tasks, [newTodolistID]: []})
    }


    const component = todolist.map(el => {

        let copyTask = tasks[el.id] // таски по [todolistID]

        if (el.filter === 'active') {
            copyTask = tasks[el.id].filter(el => el.isDone === false)
        }

        if (el.filter === 'completed') {
            copyTask = tasks[el.id].filter(el => el.isDone === true)
        }

        return (

            <Grid item>
                <Paper elevation={2}
                       style={{padding: '20px', marginLeft: '20px'}}
                >
                    <TodoList
                        filter={el.filter}
                        todolistTitle={el.title}
                        key={el.id}
                        todolistID={el.id}
                        changeTaskStatus={changeTaskStatus}
                        tasks={copyTask}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTodoListFilter={changeTodoListFilter}
                        removeTodolist={removeTodolist}
                        changeTodoListTitle={changeTodoListTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <AppBar style={{backgroundColor: 'hwb(180deg 19% 75%)'}} position="static">
                    <Toolbar style={{justifyContent: "space-between"}}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            Todolists
                        </Typography>
                        <Button color="inherit" variant={"outlined"}>Login</Button>
                    </Toolbar>
                </AppBar>
                <PurpleSwitch checked={darkMode} onChange={() => setDarkMode(!darkMode)}/>
                <Grid>
                    <div className='addTodolist'>
                        <Paper>
                            <AddItemForm addItem={addTodolist}/>
                        </Paper>

                    </div>
                </Grid>
                <Grid spacing={3} container>
                    {component}
                </Grid>
            </div>
        </ThemeProvider>
    );
}

export default App;
