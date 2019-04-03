import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Picker, Alert, ImageBackground } from 'react-native';
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
      condition: false,
      recurrance: ''
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
    if(this.state.schedule === 'weekly'){
      let date = this.state.startDate.setDate(this.state.startDate.getDate() + 14);
      console.log(date);
      this.setState({recurrance: date});
      console.log('recurrance', this.state.recurrance);
    }
    console.log(this.state);

    details = {
      title: `Water ${this.state.plant}`, 
      startDate: this.state.startDate, 
      endDate: this.state.startDate,
      allDay: true
    };

    try{
      let calendars = await Calendar.getCalendarsAsync();
      let status = await Calendar.createEventAsync(Calendar.DEFAULT, details);
      console.log(status);
      if(status){
        Alert.alert(`Water schedule for ${this.state.plant} added to Calendar!`);
      //condition: false,
      //this.setState({condition: false});
      //console.log(this.state.condition);
      }

    } catch(error){
      console.log(error);
    }


  }


  render() {
    const startDate = this.state.startDate ? this.state.startDate : '';
    console.log(this.state.startDate);

    return (
     <> 
      <ImageBackground source={require('../assets/plant-op.png')} style={{width: 400}} >
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
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({schedule: itemValue})
                }
                }>

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
      </ ImageBackground>
      </>
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
    marginLeft: 15,
    marginTop: 50,
    borderBottomColor: '#bfdc36',
    borderBottomWidth: 1,
  },
  start: {
    fontSize: 24,
    color: 'black',
    paddingBottom: 10,
    marginBottom: 50,
    marginLeft: 15,
    borderBottomColor: '#bfdc36',
    borderBottomWidth: 1,
  },
  textInput: {
    alignSelf: 'stretch',
    height: 40,
    marginLeft: 15,
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
});

