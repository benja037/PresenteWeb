import { Dimensions, StyleSheet } from "react-native";
import { colors } from "./colors";
export const styles = StyleSheet.create({
  container_header: {
    width: '100%',  
    height:50,
    backgroundColor:"#a5c8eb",
    justifyContent: 'center',
    borderBottomStartRadius:20,
    flexDirection:'row',
    flexWrap:'wrap',   
  },
  box_header_left: {        
    width: '70%',
    height: '100%',    
   
  },
  box_header_right: {        
    width: '25%',
    height: '100%',
    
  },
  box_buttons: {        
    width: '25%',
    height: '15%',
    
  },
  title: {
    fontSize: 22, 
    padding:8
     
  },
  principalTitle: {
    fontSize: 36, 
    padding:2,
    fontWeight: 'bold',  
     
  },
  subjectTitle: {
    fontSize: 20, 
    padding:2,
    fontWeight: 'bold',  
     
  },
  subtitle: {
    fontSize: 16, 
    padding:8
     
  },
  text_edit_button: {
    fontSize: 9, 
    padding:8
     
  },
  card: {
    borderWidth: 1,
    borderColor: colors.card,
    borderRadius: 10,
    marginVertical: 30,
    padding: 30,
  },
  container: {        
    flex: 1,
    backgroundColor: '#fff',
    alignItems:"center",          
  },
  sub_container: {        
    flex: 1,
    backgroundColor: 'red',
    alignItems:"center",
    marginTop:9          
  },
  container_up: { 
    width:'95%',
    height:'10%',
    padding:5,        
    backgroundColor: '#fff',   
    flexDirection:'row',
    flexWrap:'wrap',          
  },
  container_horario_title: {
    width: '100%',  
    height:'6%',
    backgroundColor:"#c1ecf5",
    justifyContent: 'center',
    borderBottomStartRadius:20,
    flexDirection:'row',
    flexWrap:'wrap',
   
  },
  box_left_short: {        
    width: '60%',
    height: '100%',
      
    padding:5,
  },
    
    
  container_list: {        
    flex: 1,
    alignItems:"center",
    width:'80%',
          // justifyContent: 'center',
  },
  box_left: {        
    width: '80%',
    height: '100%',
    padding:5,

        
        // justifyContent: 'center',
  },
  box_right: {        
    width: '20%',
    height: '100%',
    padding:5,
        
        // justifyContent: 'center',
  },
  containerbutton: {        
    flex:1,
    padding: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
        // justifyContent: 'center',
  },
  circularbutton: {
    position:"relative",
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    backgroundColor:'#c2f4be',
    borderRadius:50,
  },
  editbutton: {
    position:"relative",
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:90,
    height:40,
    backgroundColor:'#c2f4be',
    borderRadius:50,
    marginTop:5,
  },
  editbutton2: {
    position:"relative",
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:130,
    height:30,
    backgroundColor:'#c2f4be',
    borderRadius:50,
    marginTop:5,
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 5,
    backgroundColor: 'fff',
  },
  screen: {
    padding: 20,
  }
}) 

const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);
const offset = 40;
const offset2 = 80;
const radius = 20;
export const styles_card = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 25,
    marginBottom:25,
    //borderWidth:1,
    //borderColor:"black",
  },
  cardContainer: {
    width: '100%',
    backgroundColor: '#00b4fc',
    height: deviceHeight * 0.25,
    borderRadius: radius,

    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
  },
  imageStyle: {
    height: deviceHeight * 0.15,
    width: '100%',
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    opacity: 0.9,
    alignContent: 'center',
    alignSelf: 'center',
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '800',
  },
  categoryStyle: {
    fontWeight: '200',
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  iconLabelStyle: {
    flexDirection: 'row',
    height:'25%',
  },
  statusImageStyle: {
    width: 90, // ajusta según sea necesario
    height: 40, // ajusta según sea necesario
    resizeMode: 'contain',

  },
});
export const styles_card_horario = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 5,
    marginBottom:15,
    marginLeft:15,
    //borderWidth:1,
    //borderColor:"black",
  },
  cardContainer: {
    width: '80%',
    backgroundColor: '#ffeaad',
    height: 150,
    borderRadius: radius,
    marginLeft:5,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 9,
  },
  imageStyle: {
    height: 100,
    width: deviceWidth - offset,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    opacity: 0.9,
    alignContent: 'center',
    alignSelf: 'center',
  },
  titleStyle: {
    fontSize: 26,
    fontWeight: '400',
  },
  categoryStyle: {
    fontWeight: '300',
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  iconLabelStyle: {
    flexDirection: 'row',
    marginTop: 10,
  },
});