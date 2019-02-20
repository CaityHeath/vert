import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Picker } from 'react-native';
import { Calendar } from 'expo'
import CalendarPicker from 'react-native-calendar-picker';
import { When, Unless } from './conditionals.js';



export default class Form extends React.Component {
  constructor(){
    super()
    this.state = {
      schedule: '',
      plant: '',
      permissions: false,
      startDate: null,
      condition: false
    };
    this.onDateChange = this.onDateChange.bind(this);
  }



  async componentDidMount(){
  const {status} = await Expo.Permissions.askAsync(Expo.Permissions.CALENDAR);
   this.setState({permissions: status});
  }
  
  onDateChange(date){
    this.setState({startDate: date, condition: true});
  }

  setCalendar = async () => {
    console.log(this.state);

    details = {
      title: this.state.plant, 
      startDate: new Date('2019-02-20'), 
      endDate: new Date('2019-02-20'),
      allDay: true
    };

    try{
      let calendars = await Calendar.getCalendarsAsync();
      console.log(Calendar.DEFAULT);
      let status = await Calendar.createEventAsync(Calendar.DEFAULT, details);
      console.log(status);

    } catch(error){
      console.log(error);
    }


  }


  render() {
    const startDate = this.state.startDate ? this.state.startDate : '';
    console.log(this.state.startDate);

    return (
      <View style={styles.form}>

        <Unless condition={this.state.condition}>
           <Text style={styles.header}>Add a Plant</Text>

           <TextInput style={styles.textInput} 
                  placeholder="Plant Name"
                  onChangeText={(plant) => this.setState({...this.state, plant: plant})}/>


          <Text style={styles.start}>Select a Start Date</Text>
          <CalendarPicker style={styles.calendar} onDateChange={this.onDateChange}/>

  
        </Unless>
    


        <When condition={this.state.condition}>
         < Picker style={styles.picker} 
                selectedValue={this.state.schedule} 
                onValueChange={(itemValue, itemIndex) => this.setState({...this.state, schedule: itemValue})}>

          <Picker.Item  label='Weekly' value='weekly'/>
          <Picker.Item  label='Bi-Monthly' value='bimonthly'/>
          <Picker.Item  label='Monthly' value='monthly'/>
          <Picker.Item  label='Six-Weeks' value='sixweeks'/>

         </Picker>
        
          <TouchableOpacity style={styles.button}  onPress={this.setCalendar}> 
            <Text style={styles.btnText}>Add</Text>
          </TouchableOpacity>
        </When>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    alignSelf: 'stretch',
  },
  header: {
    fontSize: 24,
    color: 'black',
    paddingBottom: 10,
    marginBottom: 20,
    marginLeft: 30,
    marginTop: 50,
    borderBottomColor: '#bfdc36',
    borderBottomWidth: 1,
  },
  start: {
    fontSize: 24,
    color: 'black',
    paddingBottom: 10,
    marginBottom: 50,
    marginLeft: 30,
    borderBottomColor: '#bfdc36',
    borderBottomWidth: 1,
  },
  textInput: {
    alignSelf: 'stretch',
    height: 40,
    marginLeft: 30,
    marginBottom: 30,
    color: 'black',
    borderBottomColor: '#bfdc36',
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#bfdc36',
  }, 
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // picker: {
  //   marginTop: 10,
  //   marginBottom: 50,
  //   height: 80,
  // }
});

