import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import "react-native-gesture-handler"; 
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from './LoginScreen';
import SignupForm from './SignupForm';
import SigninSuccess from './SigninSuccess';
import ProfileLayout from './ProfileLayout';
import MyPage from './MyPage';
import SurveyScreenHappy from './SurveyScreenHappy';
import SurveyScreenBored from './SurveyScreenBored';
import SurveyScreenTired from './SurveyScreenTired'; 
import SurveyScreenAngry from './SurveyScreenAngry';
import SurveyScreenSad from './SurveyScreenSad';
import KitchenUtensils from './KitchenUtensils';
import CookingDifficulty from './CookingDifficulty';
import RMRecognition from './RMRecognition';
import MoodRecognitionScreen from './MoodRecognitionScreen';
import MoodSelectionScreen from './MoodSelectionScreen';
import DesiredCookingTime from './DesiredCookingTime';
import RecipeRecommendation from './RecipeRecommendation';
import RecipeDetail from './RecipeDetail';
import FeedbackScreen from './FeedbackScreen'; 
import UserSetupScreen from './UserSetupScreen';
import Webcam from './Webcam';
import RefrigeratorReceipt from './RefrigeratorReceipt';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupForm} />
        <Stack.Screen name="SigninSuccess" component={SigninSuccess} />
        <Stack.Screen name="Profile" component={ProfileLayout} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="SurveyScreenHappy" component={SurveyScreenHappy} />
        <Stack.Screen name="SurveyScreenBored" component={SurveyScreenBored} />
        <Stack.Screen name="SurveyScreenTired" component={SurveyScreenTired} />
        <Stack.Screen name="SurveyScreenAngry" component={SurveyScreenAngry} />
        <Stack.Screen name="SurveyScreenSad" component={SurveyScreenSad} />
        <Stack.Screen name="KitchenUtensils" component={KitchenUtensils} />
        <Stack.Screen name="CookingDifficulty" component={CookingDifficulty} />
        <Stack.Screen name="RMRecognition" component={RMRecognition} />
        <Stack.Screen name="MoodRecognitionScreen" component={MoodRecognitionScreen} />
        <Stack.Screen name="MoodSelectionScreen" component={MoodSelectionScreen} />
        <Stack.Screen name="DesiredCookingTime" component={DesiredCookingTime} />
        <Stack.Screen name="RecipeRecommendation" component={RecipeRecommendation} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        <Stack.Screen name="UserSetup" component={UserSetupScreen} />
        <Stack.Screen name="Webcam" component={Webcam} />
        <Stack.Screen name="RefrigeratorReceipt" component={RefrigeratorReceipt} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}