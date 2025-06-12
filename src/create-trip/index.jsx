import React, { useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions } from "@/constants/options";
import { SelectTravelsList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal"; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { ListCachedContentsResponse } from "@google/genai";

function CreateTrip() {
  const [place, setPlace] = useState();

  const[formData,setFormData] = useState([])
  const[openDialog,setOpenDialog] = useState(false);

  const handleInputChange = (name,value)=>{
    setFormData({
      ...formData,
      [name]:value 
    })
  }

  useEffect(()=>{
    console.log(formData)
  },[formData])

  const login = useGoogleLogin({ //Two standard methods available with useGoogleLogin method
    onSuccess:(codeResp)=>console.log(codeResp),
    onError:(error)=>console.log(error)
  })

  const onGenerateTrip = async()=>{
    const user = localStorage.getItem('user'); //We are checking if a user exists or not

    if(!user){
      setOpenDialog(true); //If a person dosent have account then SignIn dialog box appears
      return;
    }

    if(formData?.noOfDays>5 && !formData.budget||!formData.traveller ||!formData.location){
      toast("Please fill all the details")
      return
    }
    
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}',formData?.location?.label)
    .replace('{totalDays}',formData?.noOfDays)
    .replace('{traveller}',formData?.traveller)
    .replace('{budget}',formData?.budget)
    .replace('{totalDays}',formData?.noOfDays)

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT)
    console.log(result?.response?.text());
  }

  return (
    <div className=" px-60 mt-10 flex flex-col ">
      <h2 className="font-bold text-3xl">Tell us your travel prefrences🏝️</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itineary based on your prefrences.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        <div>
          <h2 className="text-xl my-3 font-medium">
            Your travel destination?🌏
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div className="my-2">
          <h2 className="text-xl my-2 font-medium ">
            Enter the number of days
          </h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <h2 className="text-xl font-medium ">What is your budget</h2>
          <div className="grid grid-cols-3 gap-5 ">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.budget == item.title &&
                  "border-2 border-blue-500 shadow-lg p-4 rounded-lg "
                }`}
              >
                <h2>{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-700">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5 my-3">
          <h2 className="text-xl font-medium ">
            Who do you plan on travelling on your next adventure?
          </h2>
          <div
            className="grid grid-cols-3 gap-5 
          "
          >
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveller", item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer 
                ${
                  formData?.traveller == item.people &&
                  "border-2 border-blue-500 shadow-lg p-4 rounded-lg"
                }`}
              >
                <h2>{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-700">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div my-10 className="flex justify-end">
        <Button onClick={onGenerateTrip}>Generate Trip</Button>
      </div>

      <Dialog open={openDialog}>
        
        <DialogContent className="bg-white p-6 rounded-xl shadow-lg max-w-sm">
          <DialogHeader>
            
            <DialogDescription>
              <img src="/TravelobeLogo.png" />
              <h2 className="font-bold text-lg mt-3">Sign In with Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button onClick={login}
              varient="outline" className='mt-5 w-full flex gap-2 items-center'>
                <FcGoogle className="h-10 w-8"/>Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
