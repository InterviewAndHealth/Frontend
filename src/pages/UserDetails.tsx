import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ImageInput from "@/components/custom/image-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isValidPhoneNumber } from "react-phone-number-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";
import { IoDocumentOutline } from "react-icons/io5";
import { useState } from "react";
import { useCreateStudent } from "@/services/user/mutations";
import Notify from "@/lib/notify";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  contactNumber: z
    .string()
    .min(1, { message: "Phone number is required." })
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Please select a valid country.",
  }),
  preferredCity: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  skills: z.array(z.string()).min(2, "Select at least two skills"),
  preparingFor: z.string().min(1, {
    message: "Select at least one",
  }),
  workMode: z.string().min(1, {
    message: "Select at least one",
  }),
});

const UserDetails = () => {
  const [file, setFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      contactNumber: "",
      city: "",
      country: "",
      preferredCity: "",
      preparingFor: "",
      workMode: "",
    },
  });

  const createStudent = useCreateStudent();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!file) {
      Notify("error", "Please upload your resume!!");
      return;
    }
    console.log(values);
    console.log(file);
    createStudent.mutate({ student: values, file });
  }
  return (
    <>
      <div className=" w-full h-full">
        <div
          className="  h-full bg-cover flex items-center justify-center sm:bg-contain bg-[url('/src/assets/bg-line1.svg'),url('/src/assets/bg-line2.svg')] bg-center bg-no-repeat"
          style={{
            backgroundPosition: "left, right",
          }}
        >
          <div className="bg-white w-11/12 lg:w-3/4 border-2 h-full px-10 py-5 lg:px-40 lg:py-5 border-main-300 rounded-xl my-10">
            <h2 className="text-main-300 px-2 font-bold text-4xl md:text-5xl text-center my-4">
              Confirm Your details
            </h2>
            <div className="flex  space-x-3 justify-center mb-6">
              {/* <ImageInput
                logo={<FaLinkedinIn className="text-2xl text-blue-500 mr-2" />}
                id="linkedin"
                text="Upload a linkedin pdf"
              /> */}
              <ImageInput
                logo={
                  <IoDocumentOutline className="text-2xl text-blue-500 mr-2" />
                }
                id="resume"
                text="Upload Your resume"
                setFile={setFile}
              />
            </div>
            {/* <Button
              type="submit"
              className=" bg-main-300 h-14 rounded-xl w-52 text-wrap lg:py-0 lg:px-14 mt-4 text-white font-normal text-sm mx-auto block"
            >
              Fill details from your resume
            </Button> */}
            {/* <span className="text-main-300 text-center my-5 block">
              Please check if your details have been correctly filled
            </span> */}
            {/* <div className="flex items-center justify-center my-4 font-bold">
              <div className="flex-grow border-2 border-main-50"></div>
              <span className="mx-4 text-main-50">or</span>
              <div className="flex-grow border-2 border-main-50"></div>
            </div> */}

            {/* <h4 className="text-main-300 font-bold text-xl lg:text-2xl text-center ">
              Fill details Manually
            </h4> */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-[45%] mx-auto">
                      <FormLabel className="text-main-300 font-bold ml-4">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-[45%] mx-auto">
                      <FormLabel className="text-main-300 font-bold ml-4">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => {
                    return (
                      <FormItem className="md:col-span-1 w-full lg:w-[45%] mx-auto">
                        <FormLabel className="text-main-300 font-bold ml-4">
                          Phone number
                        </FormLabel>
                        <FormControl>
                          <PhoneInput
                            placeholder="Enter a phone numner"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                {/* <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-[45%] mx-auto">
                      <FormLabel className="text-main-300 font-bold ml-4">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex : john@gmail.com"
                          {...field}
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => {
                    const genderOptions = formSchema.shape.gender.options;

                    return (
                      <FormItem className="w-full lg:w-[45%] mx-auto">
                        <FormLabel className="text-main-300 font-bold ml-4">
                          Your Gender
                        </FormLabel>
                        <div className="text-main-300 text-xs ml-4">
                          So that we can better match opportunities for you.
                        </div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="mt-1 border-2 border-main-300 h-14 rounded-xl ">
                              <SelectValue placeholder="Choose your gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {genderOptions.map((gender) => (
                              <SelectItem key={gender} value={gender}>
                                {gender}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-[45%] mx-auto">
                      <FormLabel className="text-main-300 font-bold ml-4">
                        Your City
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-[45%] mx-auto">
                      <FormLabel className="text-main-300 font-bold ml-4">
                        Your Country
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="languages"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-[45%] mx-auto">
                      <FormLabel className="text-main-300 font-bold ml-4">
                        Languages You know
                      </FormLabel>
                      <div className="text-main-300 text-xs ml-4 mb-3">
                        Click the plus if you’re fluent.
                      </div>
                      <FormControl>
                        <ToggleGroup
                          type="multiple"
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-wrap justify-start"
                        >
                          {["English", "French", "Hindi", "German"].map(
                            (value) => (
                              <ToggleGroupItem
                                key={value}
                                value={value}
                                aria-label="Toggle bold"
                                className="border-main-300 border-2 rounded-lg text-main-300 mr-1"
                              >
                                {value}
                                <IoMdAddCircleOutline className="h-4 w-4 ml-2" />
                              </ToggleGroupItem>
                            )
                          )}

                          <Button className="border-main-300 border-2 bg-white  rounded-lg text-main-300 hover:bg-main-300 hover:text-white">
                            Add another
                            <IoMdAddCircleOutline className="h-4 w-4 ml-2" />
                          </Button>
                        </ToggleGroup>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                {/* <FormField
                  control={form.control}
                  name="aboutCareer"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-[45%] mx-auto">
                      <FormLabel className="text-main-300 font-bold ml-4">
                        What are you?
                      </FormLabel>
                      <FormControl>
                        <ToggleGroup
                          type="multiple"
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-wrap justify-start"
                        >
                          {[
                            "College Student",
                            "Working Professional",
                            "Fresher",
                            "Returning from a career break",
                            "Changing fields",
                          ].map((value) => (
                            <ToggleGroupItem
                              key={value}
                              value={value}
                              aria-label="Toggle bold"
                              className="border-main-300 border-2 rounded-lg text-main-300 mr-1"
                            >
                              {value}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-main-300 font-bold ml-4">
                        Skills you’d like to use
                      </FormLabel>
                      <div className="text-main-300 text-xs ml-4 mb-3">
                        Click the plus if you want related jobs
                      </div>
                      <FormControl>
                        <ToggleGroup
                          type="multiple"
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-wrap justify-start"
                        >
                          {[
                            "MERN",
                            "Java",
                            "Python",
                            "Typescript",
                            "UI/UX Design",
                            "Management",
                            "Sales",
                            "Human Resources",
                          ].map((value) => (
                            <ToggleGroupItem
                              key={value}
                              value={value}
                              aria-label="Toggle bold"
                              className="border-main-300 border-2  rounded-lg text-main-300 mr-1"
                            >
                              {value}
                              <IoMdAddCircleOutline className="h-4 w-4 ml-2" />
                            </ToggleGroupItem>
                          ))}

                          <Button className="border-main-300 border-2 bg-white text-main-300 rounded-lg hover:bg-main-300 hover:text-white">
                            Add another
                          </Button>
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <h3 className=" text-main-300 font-bold mt-5 mb-2 ml-3">
                  What are you preparing for?
                </h3>
                <FormField
                  control={form.control}
                  name="preparingFor"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ToggleGroup
                          type="single"
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-wrap justify-start"
                        >
                          {[
                            "MBA",
                            "Civil Services",
                            "Internships",
                            "Full-time",
                            "Freelance",
                            "Contract",
                          ].map((value) => (
                            <ToggleGroupItem
                              key={value}
                              value={value}
                              aria-label="Toggle bold"
                              className="border-main-300 border-2 rounded-lg text-main-300 mr-1"
                            >
                              {value}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <h3 className=" text-main-300 font-bold mt-5 mb-2 ml-3">
                  Work Mode
                </h3>
                <FormField
                  control={form.control}
                  name="workMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ToggleGroup
                          type="single"
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-wrap justify-start"
                        >
                          {["Remote", "In-Office", "Hybrid"].map((value) => (
                            <ToggleGroupItem
                              key={value}
                              value={value}
                              aria-label="Toggle bold"
                              className="border-main-300 border-2  rounded-lg text-main-300 mr-1"
                            >
                              {value}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredCity"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-[45%] mx-auto">
                      <FormLabel className="text-main-300 font-bold ml-4">
                        Preferred City
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className=" bg-main-300 h-14 rounded-xl w-full lg:w-[45%] text-white font-normal text-base mx-auto block"
                  disabled={createStudent.isPending}
                >
                  {createStudent.isPending && (
                    <Loader2 className="w-4 h-4 animate-spin mr-3" />
                  )}
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
