import React, { useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions } from "@/constants/options";
import { SelectTravelsList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function CreateTrip() {
  const [place, setPlace] = useState();

  const[formData,setFormData] = useState([])

  const handleInputChange = (name,value)=>{
    setFormData({
      ...formData,
      [name]:value 
    })
  }

  useEffect(()=>{
    console.log(formData)
  },[formData])

  const onGenerateTrip = ()=>{
    if(formData?.noOfDays>5 && !formData.budget||!formData.traveller ||!formData.location){
      toast("Please fill all the details")
      return
    }
    console.log(formData)
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
          <h2 className="text-xl my-3 font-medium">Your travel destination?🌏</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location',v)
              },
            }}
          />
        </div>

        <div className="my-2">
          <h2 className="text-xl my-2 font-medium ">
            Enter the number of days
          </h2>
          <Input placeholder={"Ex.3"} type="number" onChange={(e)=>handleInputChange('noOfDays',e.target.value)}/>
        </div>

        <div className="flex flex-col gap-1.5">
          <h2 className="text-xl font-medium ">What is your budget</h2>
          <div className="grid grid-cols-3 gap-5 ">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={()=>handleInputChange('budget',item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget==item.title&&'shadow-2xl border-2 '}`}
                
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
          <div className="grid grid-cols-3 gap-5 
          ">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={()=>handleInputChange('traveller',item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer 
                ${formData?.traveller==item.people&&'shadow-2xl border-2'}`}
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
    </div>
  );
}

export default CreateTrip;
