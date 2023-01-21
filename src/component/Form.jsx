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
import { useEffect, useState } from 'react';
import { borderRadius } from '@mui/system';
import { indigo } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

import FormControl from '@mui/material/FormControl';
import swal from 'sweetalert';

const Form = () => {
  const [input, setInput] = useState({
    Task: '',
    Desc: '',
    status: '',
    periority: '',
  });
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const [sortTasks, setSortTasks] = useState([]);
  const [sortCompletedTasks, setSortCompletedTasks] = useState([]);

  const [inputError, setInputError] = useState({
    errorTask: '',

    errorstatus: '',
    errorperiority: '',
  });

  ///////////////// Sorting tasks Array /////////////

  const sortTasksFunc = () => {
    const newArr = tasks.sort((a, b) => {
      if (a.periority === 'High') {
        return -1;
      } else {
        return 1;
      }
    });

    return newArr;
  };

  useEffect(() => {
    setSortTasks(sortTasksFunc());
  }, [tasks]);

  ///////////////// Sorting completed tasks Array /////////////

  const sortCompletedTasksFunc = () => {
    const newArr = completedTasks.sort((a, b) => {
      if (a.periority === 'High') {
        return -1;
      } else {
        return 1;
      }
    });

    return newArr;
  };

  useEffect(() => {
    setSortCompletedTasks(sortCompletedTasksFunc());
  }, [completedTasks]);

  // //////////////// complete alter function /////////////////////////////

  const completeAlter = (heading, title) => {
    return swal(`${heading}`, `${title}`, 'success');
  };

  // //////////////////// delete task alter ///////////////////////////
  const completeDeleteAlter = (fileTitle, task) => {
    // if (task.status === 'complete') {
    return swal({
      title: 'Are you sure?',
      text: `Once deleted, you will not be able to recover this ${fileTitle} file!`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        const deleteCompletedTasks = function (task) {
          const completedTaskCopy = completedTasks.slice(0);

          const updatedCompletedTasks = completedTaskCopy.filter(
            tsk => tsk.id !== task.id
          );
          setCompletedTasks(updatedCompletedTasks);
        };
        deleteCompletedTasks(task);
        swal(`Poof! Your ${fileTitle} file has been deleted!`, {
          icon: 'success',
        });
      } else {
        swal(`Your ${fileTitle} file is safe!`);
      }
    });
  };

  const incompleteDeleteAlert = (fileTitle, task, id) => {
    swal({
      title: 'Are you sure?',
      text: `Once deleted, you will not be able to recover this ${fileTitle} file!`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        const deleteTasks = function (task, id) {
          const taskCopy = tasks.slice(0);
          const upDatedTasks = taskCopy.filter(task => task.id !== id);
          setTasks(upDatedTasks);
        };
        deleteTasks(task, id);
        swal(`Poof! Your ${fileTitle} file has been deleted!`, {
          icon: 'success',
        });
      } else {
        swal(`Your ${fileTitle} file is safe!`);
      }
    });
  };

  // /////////////// form submition function ////////////////////

  const formSub = function (e) {
    e.preventDefault();
    const inputCopy = { ...input };
    const deleteDescription = delete inputCopy.Desc;

    if (Object.values(inputCopy).every(val => val !== '')) {
      if (input.status === 'incomplete') {
        setTasks(prevTask => {
          return [...prevTask, input];
        });
        completeAlter(
          'Task Successfull Enter',
          'You Have enter incomplete task'
        );
      } else if (input.status === 'complete') {
        setCompletedTasks(prevCom => {
          return [...prevCom, input];
        });
        completeAlter('Task Successfull Enter', 'You Have enter complete task');
      }

      setInput({
        Task: '',
        Desc: '',
        status: '',
        periority: '',
        id: '',
      });

      setInputError({
        errorTask: '',
        errorstatus: '',
        errorperiority: '',
      });
    } else {
      setInputError({
        errorTask: '',
        errorstatus: '',
        errorperiority: '',
      });
      const inputCopy = { ...input };
      const deleteDescription = delete inputCopy.Desc;
      const emptyField = Object.keys(inputCopy).filter(
        val => inputCopy[val] === ''
      );
      console.log('else');
      emptyField.forEach(key => {
        setInputError(prevError => {
          return {
            ...prevError,
            [`error${key}`]: 'Please fill Field',
          };
        });
      });
    }
  };

  // /////////////// tasking input from form function ////////////////////

  const handleInput = e => {
    setInput(prevInput => {
      return {
        ...prevInput,
        id: Date.now(),
        [e.target.name]: e.target.name === 'checked' ? true : e.target.value,
      };
    });
  };

  // /////////////// turned incompleted task to completed task  ////////////////////

  const completedTask = function (task) {
    const newTask = {
      ...task,
      status: 'complete',
    };
    const taskCopy = tasks.slice(0);
    const upDatedTasks = taskCopy.filter(tsk => tsk.id !== task.id);
    setTasks(upDatedTasks);
    completeAlter(
      'Task Successfull Enter',
      'You Have turned inomplete task to complete '
    );
    setCompletedTasks(prevCom => [...prevCom, newTask]);
  };

  // /////////////// delete task from tasks array function ////////////////////

  // const deleteTask = function (id) {
  //   const taskCopy = tasks.slice(0);
  //   const upDatedTasks = taskCopy.filter(task => task.id !== id);
  //   setTasks(upDatedTasks);
  //   deleteAlter('incomplete task');
  // };

  // /////////////// delete complete task from completedtasks array function ////

  // const deleteCompletedTasks = function (comTask) {
  //   const completedTaskCopy = completedTasks.slice(0);
  //   const updatedCompletedTasks = completedTaskCopy.filter(
  //     tsk => tsk.id !== comTask.id
  //   );
  //   setCompletedTasks(updatedCompletedTasks);
  //   deleteAlter('complete task');
  // };

  // ////////// changing incompleted task to complete task function /////

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
      completeAlter(
        'Task Successfull Enter',
        'You Have turned complete task to incomplete'
      );
    } else if (newTask.status === 'complete') {
      setCompletedTasks(prevCom => {
        return [...prevCom, newTask];
      });
      completeAlter(
        'Task Successfull Enter',
        'You Have turned incomplete task to complete'
      );
    }

    const upDateTasks = tasks.filter(tsk => tsk.id !== newTask.id);
    if (newTask.status === 'incomplete') {
      setTasks(tasks);
    } else if (newTask.status === 'complete') {
      setTasks(upDateTasks);
    }

    setCurrentStatus('');
  };

  // ////////// changing completed task priority function ////////////

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

  // ////////// changing completed task to incomplete task function /////

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
      completeAlter(
        'Task Successfull Enter',
        'You Have turned complete task to incomplete'
      );
    } else if (newTask.status === 'complete') {
      setCompletedTasks(prevCom => {
        return [...prevCom, newTask];
      });
      completeAlter(
        'Task Successfull Enter',
        'You Have turned incomplete task to complete'
      );
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

  // ////////// changing incompleted task priority priority function /////

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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
                  required
                  error={inputError.errorTask === '' ? false : true}
                  helperText={
                    inputError.errorTask === '' ? '' : 'Please Enter Task'
                  }
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
                />
              </Grid>

              <Grid item xs={8}>
                <Grid container>
                  <Grid item xs={6}>
                    <FormControl
                      style={{ width: '150px' }}
                      size='small'
                      error={inputError.errorstatus === '' ? false : true}
                    >
                      <InputLabel id='demo-simple-select-label'>
                        Status*
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='Status'
                        name='status'
                        value={input.status}
                        onChange={handleInput}
                        // error={inputError.errorstatus === '' ? false : true}
                        // helperText={'Please Enter Status'}
                      >
                        <MenuItem value={'complete'}>Complete</MenuItem>
                        <MenuItem value={'incomplete'}>Incomplete</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      style={{ width: '150px' }}
                      size='small'
                      error={inputError.errorperiority === '' ? false : true}
                    >
                      <InputLabel
                        id={
                          inputError.errorperiority === ''
                            ? 'demo-simple-select-label'
                            : 'demo-simple-select-error-label'
                        }
                      >
                        Priority*
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='periority'
                        name='periority'
                        value={input.periority}
                        onChange={handleInput}
                        // error={inputError.errorperiority === '' ? false : true}
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
                <ListItemText
                  primary={task.Task}
                  secondary={task.Desc}
                  style={{ maxWidth: '470px' }}
                />
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
                    onClick={() =>
                      incompleteDeleteAlert('Completed Task', task, task.id)
                    }
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
                        value={task.status}
                        onChange={e => handleCurrentStatus(e.target, task)}
                      >
                        <MenuItem value={'complete'}>Complete</MenuItem>
                        <MenuItem value={'incomplete'}>Incomplete</MenuItem>
                      </Select>
                    </FormControl>
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
                        Priority
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='periority'
                        name='periority'
                        value={task.periority}
                        onChange={e => handleCurrentPeriority(e.target, task)}
                      >
                        <MenuItem value={'High'}>High</MenuItem>
                        <MenuItem value={'Low'}>Low</MenuItem>
                      </Select>
                    </FormControl>
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
            <List
              key={comTask.id}
              style={{
                padding: '2rem 0.5rem',
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ background: indigo[500], color: 'white' }}>
                    P
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={comTask.Task}
                  secondary={comTask.Desc}
                  style={{ maxWidth: '470px' }}
                />
              </ListItem>
              <ListItemSecondaryAction
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <IconButton
                  style={{ color: 'red' }}
                  onClick={() => completeDeleteAlter('Completed Task', comTask)}
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
                        value={comTask.status}
                        onChange={e =>
                          handleCurrentCompletedStatus(e.target, comTask)
                        }
                      >
                        <MenuItem value={'complete'}>Complete</MenuItem>
                        <MenuItem value={'incomplete'}>Incomplete</MenuItem>
                      </Select>
                    </FormControl>
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
                        Priority
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='periority'
                        name='periority'
                        value={comTask.periority}
                        onChange={e =>
                          handleCurrentCompletePeriority(e.target, comTask)
                        }
                      >
                        <MenuItem value={'High'}>High</MenuItem>
                        <MenuItem value={'Low'}>Low</MenuItem>
                      </Select>
                    </FormControl>
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
