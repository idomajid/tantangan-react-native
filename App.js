import React,{useEffect, useState} from 'react';
import { Alert,Text, View, StyleSheet,FlatList, Image } from 'react-native';
import Constants from 'expo-constants';



export default function App() {
  const [loading, setLoading] = useState(false)
  const [jelantah, setJelantah] = useState()
  

useEffect(()=>{
  const jelantahApi = async () => {
  try {
    setLoading(true)
    const response = await fetch(
      'https://dev-dummy-api.jelantah.org/api/foods/get'
    );
    const json = await response.json();
  setJelantah(json.data)
  setLoading(false)
 
  } catch (error) {
    console.error(error);
  }
};
  jelantahApi()
},[])

const jelantahData = jelantah?.data

if(!jelantahData) {
  return <View><Text>Loading!!!</Text></View>
}
  
function onEnd(){
 Alert.alert('You Have Reached To List End...');
}

  return (
    <View style={styles.container}>
    
      <FlatList
        data={jelantahData}
        keyExtractor={item => item.id}
        onEndReached={onEnd}
        renderItem={ ({item}) => {
          
          return(
            <View style={styles.card}>      
         <Image source={{uri: item?.url_image_absolute}}
              style={styles.image} />
         <Text style={styles.title}> {item?.food_name}</Text>
          </View>
          )   
        }}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  card: {
     justifyContent: 'center',
     alignItems: 'center',
     marginVertical: 20

  },
  image: {
width: 250, 
height: 200,
borderRadius: 10
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    lineHeight: 18,
    color: "#404040",
  }

  

});
