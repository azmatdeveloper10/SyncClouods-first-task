import { Grid, Box, Typography, TextField, IconButton } from '@mui/material';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import { borderRadius } from '@mui/system';
import { indigo } from '@mui/material/colors';

const Form = () => {
  const [input, setInput] = useState('');
  const [inputError, setError] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const formSub = function (e) {
    e.preventDefault();
    if (input.length <= 5) {
      setTasks(prevTask => [...prevTask]);
    } else {
      setTasks(prevTask => [...prevTask, { id: Date.now(), title: input }]);
      setInput('');
    }
  };

  console.log(tasks);

  const handleInput = function (e) {
    e.target.value.length <= 5
      ? setError('input must be greater then 5 chracter')
      : setError('');
    setInput(e.target.value);
  };

  const completedTask = function (task) {
    const taskCopy = tasks.slice(0);
    const upDatedTasks = taskCopy.filter(tsk => tsk.id !== task.id);
    setTasks(upDatedTasks);
    setCompletedTasks(prevCom => [...prevCom, task]);

    console.log(task);
  };

  const deleteTask = function (id) {
    const taskCopy = tasks.slice(0);
    const upDatedTasks = taskCopy.filter(task => task.id !== id);
    setTasks(upDatedTasks);
  };

  const deleteCompletedTasks = function (comTask) {
    const completedTaskCopy = completedTasks.slice(0);
    const updatedCompletedTasks = completedTaskCopy.filter(
      tsk => tsk.id !== comTask.id
    );
    setCompletedTasks(updatedCompletedTasks);
    console.log(completedTaskCopy);
  };

  return (
    <Box
      m={5}
      sx={{
        textAlign: 'center',
        borderRadius: 2,
        padding: 2,
      }}
    >
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid
          item
          xs={12}
          style={{ background: 'white', padding: '20px', borderRadius: '10px' }}
        >
          <form onSubmit={formSub}>
            <Typography variant='h3' color='primary' fontSize={40} mb={2}>
              React todo list App
            </Typography>
            <Grid container justifyContent={'center'}>
              <Grid item xs={8}>
                <TextField
                  id='outlined-basic'
                  label='Add Task'
                  variant='outlined'
                  fullWidth={true}
                  size='small'
                  value={input}
                  onChange={handleInput}
                  error={inputError ? true : false}
                  helperText={inputError}
                />
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            background: 'white',
            marginTop: '2rem',
            padding: '10px',
            borderRadius: '10px',
          }}
        >
          <Typography variant='h4' fontSize={25} color='primary'>
            Tasks List
          </Typography>
          {tasks.map(task => (
            <List key={task.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ background: indigo[500], color: 'white' }}>
                    P
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={task.title} />
              </ListItem>
              <ListItemSecondaryAction>
                <IconButton
                  style={{ color: 'green' }}
                  onClick={() => completedTask(task)}
                >
                  <DoneOutlineIcon />
                </IconButton>
                <IconButton
                  style={{ color: 'red' }}
                  onClick={() => deleteTask(task.id)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </List>
          ))}
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            background: 'white',
            marginTop: '2rem',
            padding: '10px',
            borderRadius: '10px',
          }}
        >
          <Typography variant='h4' fontSize={25} color='primary'>
            Completed Tasks
          </Typography>
          {completedTasks.map(comTask => (
            <List key={comTask.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ background: indigo[500], color: 'white' }}>
                    P
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={comTask.title} />
              </ListItem>
              <ListItemSecondaryAction>
                <IconButton
                  style={{ color: 'red' }}
                  onClick={() => deleteCompletedTasks(comTask)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </List>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
