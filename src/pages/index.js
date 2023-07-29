import Image from "next/image";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect } from "react";

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, submittedData },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Send the bio data to your server for processing and storage
      await axios.post('https://sheet.best/api/sheets/b4db7f38-3426-49d1-9913-566c31700ea2', data);
      
      // Optionally, you can send SMS notifications and emails here
      // based on the community activities and user preferences
    } catch (error) {
      console.error('Error submitting bio data:', error);
    }
  };
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ FullName: '', PhoneNumber: '', Email: ''});
    }
  }, [formState, submittedData, reset]);

  return (
    <main className="flex justify-center items-center py-8 flex-col md:px-24 px-3 border-[#51145a] md:h-screen pt-16 md:pt-0">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  bg-white text-black  rounded-lg px-3 md:px-10 pb-12 pt-8 md:w-[500px] border-[#51145a] border border-solid">
        <h1 className="text-center py-4 text-4xl text font-bold">Google I/O Extended Enugu</h1>
        <h2 className="text-sm  pb-2 text-center font-medium">
          Input your details to receive sms notifications,reminders and emails for when
          we have community activities.
        </h2>
        <div className="flex flex-col py-2 gap-1">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName"  className="border border-[#e5e5e5] rounded-[4px] py-2 px-4 outline-[#51145a]" placeholder="Enter your name" {...register('FullName', { required: true })}/>
          {errors.fullName&& <p className="text-red-700">full name is required.</p>}
        </div>
        <div className="flex flex-col py-2 gap-1">
          <label htmlFor="email">Email address</label>
          <input type="email" id="email"  className="border border-[#e5e5e5] rounded-[4px] py-2 px-4 outline-[#51145a]" placeholder="Enter email address" {...register('Email', { required: true })}/>
          {errors.email && <p  className="text-red-700">email is required.</p>}
        </div>
        <div className="flex flex-col py-2 gap-1">
          <label htmlFor="password">Phone Number</label>
          <input type="text" id="number" className="border border-[#e5e5e5] rounded-[4px] py-2 px-4 outline-[#51145a]" placeholder="Enter phone number" {...register('PhoneNumber',  { pattern: /\d+/ })} />
          {errors.number && <p  className="text-red-700">phone number is required.</p>}
        </div>
        <div className="flex justify-center py-4">
        <button  className="bg-[#51145a] text-white py-2 px-8 rounded-[4px]" type="submit">Submit</button>
        </div>
      </form>
    </main>
  );
}
