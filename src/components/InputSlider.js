import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Input from '@material-ui/core/Input';


const useStyles = makeStyles({
  root: {
    margin: "10rem auto",
    padding: "5rem",
    display: "block",
    width: 450,
    alignItems: "center",
    border: "1px solid #ccc",
    boxShadow: "2px 4px 2px #ccc",
  },
  input: {
    width: 62,
  },
  info: {
    paddingTop: "5%",
  }
});

export default function InputSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(500);
  const [time, setTime] = React.useState(6);
  const [data, setData] = React.useState({ hits:[] });

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = event => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 500) {
      setValue(500);
    } else if (value > 5000) {
      setValue(5000);
    }
  };

  const handleTimeChange = (event, newTime) => {
    setTime(newTime);
  };

  const handleTimeInputChange = event => {
    setTime(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleTimeBlur = () => {
    if (time < 0) {
      setTime(0);
    } else if (time > 100) {
      setTime(100);
    }
  };

var setOfJson;

  useEffect(() => {
    const fetchdata = async () => {
      var result = await fetch(
        `https://ftl-frontend-test.herokuapp.com/interest?amount=${value}&numMonths=${time}`,
      );
      const setOfJson = await result.json();
      setData(setOfJson);
    }
    fetchdata();
  }, [value, time]);

  return (
    <Grid className={classes.root} onMouseEnter={(e) => e.target.style.boxShadow = '4px 4px 8px #ccc'} onMouseLeave={(e) => e.target.style.boxShadow = '0 4px 4px #ccc'}>
      <Typography variant="h3">Loan Calculation</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
        <Typography variant="h6" id="input-slider" gutterBottom>
          Loan Amount
        </Typography>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            min={500}
            max={5000}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 100,
              min: 500,
              max: 5000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
        <Typography variant="h6" id="time-slider" gutterBottom>
          Loan Duration
        </Typography>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? time : 0}
            onChange={handleTimeChange}
            min={6}
            max={24}
            aria-labelledby="time-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={time}
            margin="dense"
            onChange={handleTimeInputChange}
            onBlur={handleTimeBlur}
            inputProps={{
              step: 1,
              min: 6,
              max: 24,
              type: 'number',
              'aria-labelledby': 'time-slider',
            }}
          />
        </Grid>
      </Grid>
      <Grid className={classes.info}>
      <Typography variant="h6">
      <b>
        Interest Rate:{data.interestRate}%
      </b>
      </Typography >
      <Typography variant="h6">
      {data.monthlyPayment && (<b>MonthlyPayment:{data.monthlyPayment.currency} {data.monthlyPayment.amount}</b>)}
      </Typography >
      </Grid>
    </Grid>
  );
}
