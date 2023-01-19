import {
  Grid,
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  MenuItem,
  InputLabel,
} from '@mui/material';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Select,
  ListItemText,
} from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import { borderRadius } from '@mui/system';
import { indigo } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

import FormControl from '@mui/material/FormControl';

const Form = () => {
  const [input, setInput] = useState({
    Task: '',
    Desc: '',
    status: '',
    periority: '',
  });
  const [inputError, setError] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const formSub = function (e) {
    e.preventDefault();
    if (input.status === 'incomplete') {
      setTasks(prevTask => {
        return [...prevTask, input];
      });
    } else if (input.status === 'complete') {
      setCompletedTasks(prevCom => {
        return [...prevCom, input];
      });
    }
  };

  const handleInput = e => {
    // e.target.value.length <= 5
    //   ? setError('input must be greater then 5 chracter')
    //   : setError('');
    // setInput(prevInput => {
    //   return {
    //     ...prevInput,
    //     [e.target.name]: e.target.value,
    //   };
    // });

    setInput(prevInput => {
      return {
        ...prevInput,
        id: Date.now(),
        [e.target.name]: e.target.name === 'checked' ? true : e.target.value,
      };
    });
  };

  console.log(input);

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
            <Grid container justifyContent={'center'} gap={3}>
              <Grid item xs={8}>
                <TextField
                  id='outlined-basic'
                  label='Add Task'
                  variant='outlined'
                  fullWidth={true}
                  size='small'
                  name='Task'
                  value={input.Task}
                  onChange={handleInput}
                  error={inputError ? true : false}
                  helperText={inputError}
                />
              </Grid>

              <Grid item xs={8}>
                <TextField
                  id='outlined-basic'
                  label='Add Description'
                  variant='outlined'
                  fullWidth={true}
                  size='small'
                  name='Desc'
                  value={input.Desc}
                  onChange={handleInput}
                  error={inputError ? true : false}
                  helperText={inputError}
                />
              </Grid>

              <Grid item xs={8}>
                <Grid container>
                  <Grid item xs={6}>
                    <FormControl style={{ width: '150px' }} size='small'>
                      <InputLabel id='demo-simple-select-label'>
                        Status
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='Status'
                        name='status'
                        value={input.status}
                        onChange={handleInput}
                      >
                        <MenuItem value={'complete'}>Complete</MenuItem>
                        <MenuItem value={'incomplete'}>Incomplete</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl style={{ width: '150px' }} size='small'>
                      <InputLabel id='demo-simple-select-label'>
                        Periority
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='periority'
                        name='periority'
                        value={input.periority}
                        onChange={handleInput}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <button>Submit</button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid
          item
          xs={6}
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
                <ListItemText primary={task.Task} secondary={task.Desc} />
              </ListItem>
              <ListItemSecondaryAction>
                <p>Periority: {task.periority}</p>
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
                <ListItemText primary={comTask.Task} secondary={comTask.Desc} />
              </ListItem>
              <ListItemSecondaryAction>
                <p>Periority: {comTask.periority}</p>
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
