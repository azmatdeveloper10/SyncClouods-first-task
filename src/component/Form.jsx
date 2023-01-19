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

    for (const [key, val] of Object.entries(input)) {
      console.log(input.key);
    }

    if (input.status === 'incomplete') {
      setTasks(prevTask => {
        return [...prevTask, input];
      });
    } else if (input.status === 'complete') {
      setCompletedTasks(prevCom => {
        return [...prevCom, input];
      });
    }

    setInput({
      Task: '',
      Desc: '',
      status: '',
      periority: '',
      id: '',
    });
  };

  const handleInput = e => {
    setInput(prevInput => {
      return {
        ...prevInput,
        id: Date.now(),
        [e.target.name]: e.target.name === 'checked' ? true : e.target.value,
      };
    });
  };

  const completedTask = function (task) {
    const newTask = {
      ...task,
      status: 'complete',
    };
    const taskCopy = tasks.slice(0);
    const upDatedTasks = taskCopy.filter(tsk => tsk.id !== task.id);
    setTasks(upDatedTasks);
    setCompletedTasks(prevCom => [...prevCom, newTask]);
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
  };

  const [currentStatus, setCurrentStatus] = useState('');
  const [currentPeriority, setCurrentPeriority] = useState('');
  const handleCurrentStatus = (e, task) => {
    setCurrentStatus(e.value);
    const newTask = {
      ...task,
      status: e.value,
    };

    if (newTask.status === 'incomplete') {
      setTasks(prevTask => {
        return [...prevTask, newTask];
      });
    } else if (newTask.status === 'complete') {
      setCompletedTasks(prevCom => {
        return [...prevCom, newTask];
      });
    }

    const upDateTasks = tasks.filter(tsk => tsk.id !== newTask.id);
    if (newTask.status === 'incomplete') {
      setTasks(tasks);
    } else if (newTask.status === 'complete') {
      setTasks(upDateTasks);
    }

    setCurrentStatus('');
  };

  const handleCurrentPeriority = (e, task) => {
    setCurrentPeriority(e.value);
    const newTask = {
      ...task,
      periority: e.value,
    };

    if (newTask.status === 'incomplete') {
      setTasks(prevTask => {
        return [...prevTask, newTask];
      });
    } else if (newTask.status === 'complete') {
      setCompletedTasks(prevCom => {
        return [...prevCom, newTask];
      });
    }

    const upDateTasks = tasks.filter(tsk => tsk.id !== newTask.id);
    setTasks(upDateTasks);
    setTasks(prevTask => [...prevTask, newTask]);

    setCurrentPeriority('');
  };

  const [currentCompleteStatus, setCurrentCompleteStatus] = useState('');
  const [currentCompletePeriority, setCurrentCompletePeriority] = useState('');
  const handleCurrentCompletedStatus = (e, task) => {
    setCurrentCompleteStatus(e.value);
    const newTask = {
      ...task,
      status: e.value,
    };

    if (newTask.status === 'incomplete') {
      setTasks(prevTask => {
        return [...prevTask, newTask];
      });
    } else if (newTask.status === 'complete') {
      setCompletedTasks(prevCom => {
        return [...prevCom, newTask];
      });
    }

    const upDateCompleteTasks = completedTasks.filter(
      tsk => tsk.id !== newTask.id
    );
    if (newTask.status === 'incomplete') {
      setCompletedTasks(upDateCompleteTasks);
    } else if (newTask.status === 'complete') {
      setCompletedTasks(completedTasks);
    }

    setCurrentCompleteStatus('');
  };

  const handleCurrentCompletePeriority = (e, task) => {
    setCurrentPeriority(e.value);
    const newTask = {
      ...task,
      periority: e.value,
    };

    if (newTask.status === 'incomplete') {
      setTasks(prevTask => {
        return [...prevTask, newTask];
      });
    } else if (newTask.status === 'complete') {
      setCompletedTasks(prevCom => {
        return [...prevCom, newTask];
      });
    }

    const upDateCompleteTasks = completedTasks.filter(
      tsk => tsk.id !== newTask.id
    );
    setCompletedTasks(upDateCompleteTasks);
    setCompletedTasks(prevTask => [...prevTask, newTask]);

    setCurrentPeriority('');
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
      <Grid container justifyContent={'space-between'}>
        <Grid
          item
          xs={12}
          style={{ background: 'white', padding: '20px', borderRadius: '10px' }}
        >
          {/* //////////////////     form     ////////////////// */}

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
                        <MenuItem value={'High'}>High</MenuItem>
                        <MenuItem value={'Low'}>Low</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Button variant='contained' color='success' onClick={formSub}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>

        <Grid
          item
          xs={12}
          lg={5.95}
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
            <List key={task.id} style={{ padding: '2rem 0.5rem' }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ background: indigo[500], color: 'white' }}>
                    P
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={task.Task} secondary={task.Desc} />
              </ListItem>
              <ListItemSecondaryAction
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <div>
                  {' '}
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
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FormControl style={{ width: '150px' }} size='small'>
                      <InputLabel id='demo-simple-select-label'>
                        Status
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='Status'
                        name='status'
                        value={currentStatus}
                        onChange={e => handleCurrentStatus(e.target, task)}
                      >
                        <MenuItem value={'complete'}>Complete</MenuItem>
                        <MenuItem value={'incomplete'}>Incomplete</MenuItem>
                      </Select>
                    </FormControl>
                    <p>{task.status}</p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '0.5rem',
                    }}
                  >
                    <FormControl style={{ width: '150px' }} size='small'>
                      <InputLabel id='demo-simple-select-label'>
                        Periority
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='periority'
                        name='periority'
                        value={currentPeriority}
                        onChange={e => handleCurrentPeriority(e.target, task)}
                      >
                        <MenuItem value={'High'}>High</MenuItem>
                        <MenuItem value={'Low'}>Low</MenuItem>
                      </Select>
                    </FormControl>
                    <p>{task.periority}</p>
                  </div>
                </div>
              </ListItemSecondaryAction>
            </List>
          ))}
        </Grid>

        {/*////////////////// Completed Tasks /////////////*/}
        <Grid
          item
          xs={12}
          lg={5.9}
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
            <List key={comTask.id} style={{ padding: '2rem 0.5rem' }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ background: indigo[500], color: 'white' }}>
                    P
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={comTask.Task} secondary={comTask.Desc} />
              </ListItem>
              <ListItemSecondaryAction
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <IconButton
                  style={{ color: 'red' }}
                  onClick={() => deleteCompletedTasks(comTask)}
                >
                  <DeleteForeverIcon />
                </IconButton>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FormControl style={{ width: '150px' }} size='small'>
                      <InputLabel id='demo-simple-select-label'>
                        Status
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='Status'
                        name='status'
                        value={currentCompleteStatus}
                        onChange={e =>
                          handleCurrentCompletedStatus(e.target, comTask)
                        }
                      >
                        <MenuItem value={'complete'}>Complete</MenuItem>
                        <MenuItem value={'incomplete'}>Incomplete</MenuItem>
                      </Select>
                    </FormControl>
                    <p>{comTask.status}</p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '0.5rem',
                    }}
                  >
                    <FormControl style={{ width: '150px' }} size='small'>
                      <InputLabel id='demo-simple-select-label'>
                        Periority
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='periority'
                        name='periority'
                        value={currentPeriority}
                        onChange={e =>
                          handleCurrentCompletePeriority(e.target, comTask)
                        }
                      >
                        <MenuItem value={'High'}>High</MenuItem>
                        <MenuItem value={'Low'}>Low</MenuItem>
                      </Select>
                    </FormControl>
                    <p>{comTask.periority}</p>
                  </div>
                </div>
              </ListItemSecondaryAction>
            </List>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
